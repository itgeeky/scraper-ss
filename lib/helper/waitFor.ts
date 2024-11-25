export function waitFor<T>(fn: () => T | Promise<T>, timeout = 10000): Promise<T> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const result = fn();
      if (result) {
        clearInterval(interval);
        resolve(result);
      } else if (Date.now() - start > timeout) {
        clearInterval(interval);
        reject(new Error('Timeout'));
      }
    }, 100);
  });
}