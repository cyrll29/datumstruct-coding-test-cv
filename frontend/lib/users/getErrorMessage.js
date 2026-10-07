import HttpError from "@/lib/http/HttpError";

export default function getErrorMessage(error, fallbackMessage) {
  if (error instanceof HttpError) {
    return error.message;
  }

  if (error instanceof TypeError) {
    return "Could not reach the server. Check your connection and try again.";
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}
