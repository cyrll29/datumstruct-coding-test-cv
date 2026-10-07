import HttpError from "@/lib/http/HttpError";

const RETRYABLE_STATUSES = new Set([502, 503, 504]);
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 400;

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function isRetryableMethod(method) {
  const normalizedMethod = (method || "GET").toUpperCase();
  return normalizedMethod !== "POST";
}

function shouldRetryResponse(response, method) {
  if (!isRetryableMethod(method)) {
    return false;
  }
  return RETRYABLE_STATUSES.has(response.status);
}

async function parseJsonBody(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export default async function request(url, options = {}) {
  const method = options.method || "GET";
  let lastError = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const isLastAttempt = attempt === MAX_RETRIES;

    try {
      const response = await fetch(url, {
        cache: "no-store",
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (response.status === 204) {
        return null;
      }

      const data = await parseJsonBody(response);

      if (!response.ok) {
        const message =
          data?.error || `Request failed (${response.status})`;

        if (shouldRetryResponse(response, method) && !isLastAttempt) {
          await sleep(RETRY_DELAY_MS * (attempt + 1));
          continue;
        }

        throw new HttpError(response.status, message);
      }

      return data;
    } catch (error) {
      lastError = error;

      if (error instanceof HttpError) {
        throw error;
      }

      if (!isRetryableMethod(method) || isLastAttempt) {
        throw error;
      }

      await sleep(RETRY_DELAY_MS * (attempt + 1));
    }
  }

  throw lastError ?? new Error("Request failed");
}
