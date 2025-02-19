import {convertToSeconds} from '../../../../src/infrastructure/utils/utils';

describe('General utils', () => {
    describe('convertToSeconds', () => {
        it('should handle various input cases correctly', () => {
            expect(convertToSeconds('1')).toBe(60);
            expect(convertToSeconds('1.5')).toBe(90);
            expect(convertToSeconds('1.1111121212121')).toBe(67);
            expect(convertToSeconds('1.1')).toBe(66);
            expect(convertToSeconds('0')).toBe(60);
            expect(convertToSeconds('-1')).toBe(60);
            expect(convertToSeconds('non-numeric')).toBe(60)
            expect(convertToSeconds('1000000')).toBe(60000000);
            expect(convertToSeconds('0.01')).toBe(1);
            expect(convertToSeconds(undefined as any)).toBe(60);
            expect(convertToSeconds(null as any)).toBe(60);
        });
    });
});
