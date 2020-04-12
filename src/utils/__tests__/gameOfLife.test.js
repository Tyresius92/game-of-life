import getNextIteration from '../gameOfLife';
import InvalidArgumentError from '../InvalidArgumentError';

describe('gameOfLife', () => {
  describe('getNextIteration', () => {
    describe('input validation', () => {
      it('throws an error if not given an array', () => {
        expect(() => getNextIteration('a string is bad input')).toThrow(
          new InvalidArgumentError(
            'Invalid argument passed to getNextIteration\n' +
              '\tExpected 2D array but got string'
          )
        );
      });

      it('throws an error if outer array is empty', () => {
        expect(() => getNextIteration([])).toThrow(
          new InvalidArgumentError(
            'Invalid argument passed to getNextIteration\n' +
              '\tArray must have length of at least 1'
          )
        );
      });

      it('throws an error if not given an array of arrays', () => {
        expect(() =>
          getNextIteration(['an', 'array', 'of', 'strings', 'is', 'bad'])
        ).toThrow(
          new InvalidArgumentError(
            'Invalid argument passed to getNextIteration\n' +
              '\tExpected array of arrays but got array of string'
          )
        );
      });

      it('throws an error if inner arrays are empty', () => {
        expect(() => getNextIteration([[], [], []])).toThrow(
          new InvalidArgumentError(
            'Invalid argument passed to getNextIteration\n' +
              '\tExpected inner arrays to have length of at least 1'
          )
        );
      });

      it('throws an error if inner arrays do not have the same length', () => {
        expect(() => getNextIteration([[true, false], [true]])).toThrow(
          new InvalidArgumentError(
            'Invalid argument passed to getNextIteration\n' +
              '\tExpected inner arrays to have the same length but received ' +
              'array at index 0 with length 2 and index 1 with length 1'
          )
        );
      });

      it('throws an array if not given a 2D array of bools', () => {
        expect(() => getNextIteration([['this'], ['is'], ['invalid']])).toThrow(
          new InvalidArgumentError(
            'Invalid argument passed to getNextIteration\n' +
              '\tExpected 2D array of bools but got 2D array of string'
          )
        );
      });
    });

    describe('iteration calculation', () => {
      describe('1x1 boards', () => {
        it('gives back a dead cell, given a dead cell', () => {
          expect(getNextIteration([[false]])).toEqual([[false]]);
        });

        it('gives back a dead cell, given a live cell', () => {
          expect(getNextIteration([[true]])).toEqual([[false]]);
        });
      });

      describe('1x2 boards', () => {
        it('gives back a dead board, given a dead board', () => {
          expect(getNextIteration([[false, false]])).toEqual([[false, false]]);
          expect(getNextIteration([[false], [false]])).toEqual([
            [false],
            [false],
          ]);
        });

        it('gives back a dead board, given a board with one live cell', () => {
          expect(getNextIteration([[true, false]])).toEqual([[false, false]]);
          expect(getNextIteration([[true], [false]])).toEqual([
            [false],
            [false],
          ]);
        });

        it('gives back a dead board, given a board with two live cells', () => {
          expect(getNextIteration([[true, true]])).toEqual([[false, false]]);
          expect(getNextIteration([[true], [true]])).toEqual([
            [false],
            [false],
          ]);
        });
      });

      describe('1x3 boards', () => {
        it('gives back a dead board, given a board with all dead cells', () => {
          expect(getNextIteration([[false, false, false]])).toEqual([
            [false, false, false],
          ]);
        });

        it('gives back a dead board, given a board with one live cell', () => {
          expect(getNextIteration([[true, false, false]])).toEqual([
            [false, false, false],
          ]);
          expect(getNextIteration([[true], [false], [false]])).toEqual([
            [false],
            [false],
            [false],
          ]);
          expect(getNextIteration([[false, true, false]])).toEqual([
            [false, false, false],
          ]);
          expect(getNextIteration([[false], [true], [false]])).toEqual([
            [false],
            [false],
            [false],
          ]);
        });

        it('generates the correct next step with two live cells', () => {
          expect(getNextIteration([[true, true, false]])).toEqual([
            [false, false, false],
          ]);
          expect(getNextIteration([[true, false, true]])).toEqual([
            [false, false, false],
          ]);
          expect(getNextIteration([[true], [true], [false]])).toEqual([
            [false],
            [false],
            [false],
          ]);
          expect(getNextIteration([[true], [false], [true]])).toEqual([
            [false],
            [false],
            [false],
          ]);
        });

        it('generates the correct next step with three live cells', () => {
          expect(getNextIteration([[true, true, true]])).toEqual([
            [false, true, false],
          ]);
          expect(getNextIteration([[true], [true], [true]])).toEqual([
            [false],
            [true],
            [false],
          ]);
        });
      });

      describe('2x2 boards', () => {
        it('kills off a single live cell', () => {
          expect(
            getNextIteration([
              [true, false],
              [false, false],
            ])
          ).toEqual([
            [false, false],
            [false, false],
          ]);
        });

        it('kills everything on a board with 2 live cells', () => {
          expect(
            getNextIteration([
              [true, true],
              [false, false],
            ])
          ).toEqual([
            [false, false],
            [false, false],
          ]);
        });

        it('fills a board with only 1 dead cell', () => {
          expect(
            getNextIteration([
              [true, true],
              [true, false],
            ])
          ).toEqual([
            [true, true],
            [true, true],
          ]);
        });
      });

      describe('still lifes', () => {
        it('can create a block', () => {
          const blockPattern = [
            [false, false, false, false],
            [false, true, true, false],
            [false, true, true, false],
            [false, false, false, false],
          ];

          expect(getNextIteration(blockPattern)).toEqual(blockPattern);
        });

        it('can create a beehive', () => {
          const beehivePattern = [
            [false, false, false, false, false, false],
            [false, false, true, true, false, false],
            [false, true, false, false, true, false],
            [false, false, true, true, false, false],
            [false, false, false, false, false, false],
          ];

          expect(getNextIteration(beehivePattern)).toEqual(beehivePattern);
        });

        it('can create a loaf', () => {
          const loafPattern = [
            [false, false, false, false, false, false],
            [false, false, true, true, false, false],
            [false, true, false, false, true, false],
            [false, false, true, false, true, false],
            [false, false, false, true, false, false],
            [false, false, false, false, false, false],
          ];

          expect(getNextIteration(loafPattern)).toEqual(loafPattern);
        });

        it('can create a boat', () => {
          const boatPattern = [
            [false, false, false, false, false],
            [false, true, true, false, false],
            [false, true, false, true, false],
            [false, false, true, false, false],
            [false, false, false, false, false],
          ];

          expect(getNextIteration(boatPattern)).toEqual(boatPattern);
        });

        it('can create a tub', () => {
          const tubPattern = [
            [false, false, false, false, false],
            [false, false, true, false, false],
            [false, true, false, true, false],
            [false, false, true, false, false],
            [false, false, false, false, false],
          ];

          expect(getNextIteration(tubPattern)).toEqual(tubPattern);
        });
      });

      describe('oscillators', () => {
        it('can create a blinker', () => {
          const blinkerPatternA = [
            [false, false, false, false, false],
            [false, false, true, false, false],
            [false, false, true, false, false],
            [false, false, true, false, false],
            [false, false, false, false, false],
          ];

          const blinkerPatternB = [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, true, true, true, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
          ];

          expect(getNextIteration(blinkerPatternA)).toEqual(blinkerPatternB);
          expect(getNextIteration(blinkerPatternB)).toEqual(blinkerPatternA);
        });

        it('can create a toad', () => {
          const toadPatternA = [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, true, true, true, false],
            [false, true, true, true, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
          ];

          const toadPatternB = [
            [false, false, false, false, false, false],
            [false, false, false, true, false, false],
            [false, true, false, false, true, false],
            [false, true, false, false, true, false],
            [false, false, true, false, false, false],
            [false, false, false, false, false, false],
          ];

          expect(getNextIteration(toadPatternA)).toEqual(toadPatternB);
          expect(getNextIteration(toadPatternB)).toEqual(toadPatternA);
        });

        it('can create a beacon', () => {
          const beaconPatternA = [
            [false, false, false, false, false, false],
            [false, true, true, false, false, false],
            [false, true, false, false, false, false],
            [false, false, false, false, true, false],
            [false, false, false, true, true, false],
            [false, false, false, false, false, false],
          ];

          const beaconPatternB = [
            [false, false, false, false, false, false],
            [false, true, true, false, false, false],
            [false, true, true, false, false, false],
            [false, false, false, true, true, false],
            [false, false, false, true, true, false],
            [false, false, false, false, false, false],
          ];

          expect(getNextIteration(beaconPatternA)).toEqual(beaconPatternB);
          expect(getNextIteration(beaconPatternB)).toEqual(beaconPatternA);
        });
      });
    });
  });
});
