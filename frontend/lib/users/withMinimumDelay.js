const DEFAULT_MINIMUM_DELAY_MS = 700;

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export default function withMinimumDelay(
  userApi,
  minimumDelayMilliseconds = DEFAULT_MINIMUM_DELAY_MS,
) {
  const wrapOperation = (operation) => async (...args) => {
    const [result, delayResult] = await Promise.allSettled([
      operation(...args),
      delay(minimumDelayMilliseconds),
    ]);

    if (delayResult.status === "rejected") {
      throw delayResult.reason;
    }

    if (result.status === "rejected") {
      throw result.reason;
    }

    return result.value;
  };

  return {
    readUsers: wrapOperation(userApi.readUsers),
    readUser: wrapOperation(userApi.readUser),
    createUser: wrapOperation(userApi.createUser),
    updateUser: wrapOperation(userApi.updateUser),
    deleteUser: wrapOperation(userApi.deleteUser),
  };
}
