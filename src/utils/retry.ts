/* eslint-disable */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function waitRandom(min: number, max: number): Promise<void> {
  return wait(min + Math.round(Math.random() * Math.max(0, max - min)));
}
export class RetryableError extends Error {}
export class CancelledError extends Error {
  constructor() {
    super("Cancelled");
  }
}

export function retry<T>(
  fn: () => Promise<T>,
  {
    n,
    minWait,
    maxWait,
    delay,
  }: { n: number; minWait: number; maxWait: number; delay?: number }
): { promise: Promise<T>; cancel: () => void } {
  let completed = false;
  let firstRun = true;
  let rejectCancelled: (error: Error) => void;
  const promise = new Promise<T>(async (resolve, reject) => {
    rejectCancelled = reject;
    while (true) {
      if (delay && firstRun) {
        await wait(delay);
        firstRun = false;
      }
      let result: T;
      try {
        result = await fn();
        if (!completed) {
          resolve(result);
          completed = true;
        }
        break;
      } catch (error) {
        if (completed) {
          break;
        }
        if (n <= 0 || !(error instanceof RetryableError)) {
          console.error(error);
          reject(error);
          completed = true;
          break;
        }
        n--;
      }
      await waitRandom(minWait, maxWait);
    }
  });
  return {
    promise,
    cancel: () => {
      if (completed) return;
      completed = true;
      rejectCancelled(new CancelledError());
    },
  };
}
