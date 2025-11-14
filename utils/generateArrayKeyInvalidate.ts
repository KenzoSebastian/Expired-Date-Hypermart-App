export const generateArrayKeyInvalidate = (array: (string | number | boolean)[]) => {
  const arrayUnikFalse = array.reduce((accumulator: (string | number | boolean)[], currentValue) => {
    if (currentValue === false) {
      const alreadyHasFalse = accumulator.some((item) => item === false);

      if (!alreadyHasFalse) {
        accumulator.push(currentValue);
      }
    } else if (currentValue === 1) {
      const alreadyHas1 = accumulator.some((item) => item === 1);

      if (!alreadyHas1) {
        accumulator.push(currentValue);
      }
    } else {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);

  return arrayUnikFalse;
};
