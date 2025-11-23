export const waitFuns = (callback, delay, times) => {
    return new Promise((resolve) => {
      let count = 0;
      const reTime = setInterval(async () => {
        if (count === times) {
          clearInterval(reTime);
          resolve(false);
          return;
        }
        const result = await callback();
        count++;
        if (result) {
          clearInterval(reTime);
          resolve(true);
        }
      }, delay);
    });
  };
  