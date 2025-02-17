import { convertToSeconds } from '../../../../src/infrastructure/utils/utils';

describe('convertToSeconds', () => {
  describe('convertToSeconds', () => {
    it('should handle various input cases correctly', () => {
      expect(convertToSeconds('1')).toBe(60);
      expect(convertToSeconds('1.5')).toBe(90);
      expect(convertToSeconds('1.1111121212121')).toBe(67);
      expect(convertToSeconds('1.1')).toBe(66);
      expect(convertToSeconds('0')).toBe(0);
      expect(convertToSeconds('-1')).toBe(-60);
      expect(convertToSeconds('non-numeric')).toBeNaN();
      expect(convertToSeconds('1000000')).toBe(60000000);
      expect(convertToSeconds('0.01')).toBe(1);
    });
  });
});
