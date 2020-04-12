import PATTERNS from '../presetBoardConstants';

describe('presetBoardConstants', () => {
  it('is an array', () => {
    expect(Array.isArray(PATTERNS)).toBe(true);
  });

  it('contains the correct number of elements', () => {
    expect(PATTERNS).toHaveLength(12);
  });

  it('contains objects where every key is the same', () => {
    const firstObjectKeys = Object.keys(PATTERNS[0]);

    PATTERNS.forEach(element => {
      expect(Object.keys(element)).toEqual(firstObjectKeys);
    });
  });

  it('has a 2D array of bools as the cells key of every array element', () => {
    PATTERNS.forEach(pattern => {
      expect(Array.isArray(pattern.cells)).toBe(true);

      pattern.cells.forEach(patternRow => {
        expect(Array.isArray(patternRow)).toBe(true);

        patternRow.forEach(cell => {
          expect(typeof cell).toBe('boolean');
        });
      });
    });
  });

  it('contains elements with all unique ids', () => {
    const ids = PATTERNS.map(pattern => pattern.id);

    const idSet = new Set(ids);

    expect(ids.length).toBe(idSet.size);
  });
});
