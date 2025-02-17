export const convertToSeconds = (field: string): number => {
  const number = parseFloat(field);
  const roundedNumber = Math.round(number * 100) / 100;
  const seconds = roundedNumber * 60;
  return Math.round(seconds);
};
