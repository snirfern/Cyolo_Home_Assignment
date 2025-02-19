export const convertToSeconds = (numAsStr: string): number => {
    const number = parseFloat(numAsStr);
    if (isNaN(number) || number <= 0) {
        return 60;
    }
    const fixedNumber = Number(number.toFixed(2));
    return Math.round(fixedNumber * 60);
};
