import { Expression } from "../Expression";

describe('Expression mixins', () => {
  let subject = Object.assign({ bitmasksUsed: 1 }, Expression);

  describe('canCombineWith', () => {
    test('Subject can combine with expessions that are not using bitmask 1', () => {
      const otherExpression = { bitmasksUsed: 2 };
      expect(subject.canCombineWith(otherExpression)).toBeTruthy();
    });

    test('Subject can combine with expessions that are using bitmask 1', () => {
      const otherExpression = { bitmasksUsed: ( 1 | 2 ) };
      expect(subject.canCombineWith(otherExpression)).toBeFalsy();
    });
  });

  describe('availableCombinationWith', () => {
    let number = 10;
    let subject;

    beforeEach(() => subject = Object.assign({ result: number }, Expression));

    test('plus is always one of the available combination', () => {
      const otherExpression = { result: 1 }
      expect(subject.availableCombinationWith(otherExpression)).toContainEqual([subject, otherExpression, '+']);
    });

    describe('When the number is not 1', () => {
      describe('And the result of the other expression is not 1', () => {
        test('multiplie is one of the available combination', () => {
          const otherExpression = { result: 2 }
          expect(subject.availableCombinationWith(otherExpression)).toContainEqual([subject, otherExpression, '*']);
        });
      });

      describe('And the result of the other expression is 1', () => {
        test('multiplie is not one of the available combination', () => {
          const otherExpression = { result: 1 }
          expect(subject.availableCombinationWith(otherExpression)).not.toContainEqual([subject, otherExpression, '*']);
        });
      });
    });

    describe('When the number is 1', () => {
      beforeAll(() => number = 1);

      describe('And the result of the other expression is not 1', () => {
        test('multiplie is not one of the available combination', () => {
          const otherExpression = { result: 2 }
          expect(subject.availableCombinationWith(otherExpression)).not.toContainEqual([subject, otherExpression, '*']);
        });
      });
    });

    describe('When the result of the other expression is smaller than the number', () => {
      beforeAll(() => number = 10);

      describe('And the result of the expression is not half of the number', () => {
        test('minus is one of the available combination', () => {
          const otherExpression = { result: 2 }
          expect(subject.availableCombinationWith(otherExpression)).toContainEqual([subject, otherExpression, '-']);
        });
      });

      describe('And the result of the expression is half of the number', () => {
        test('minus is not one of the available combination', () => {
          const otherExpression = { result: 5 }
          expect(subject.availableCombinationWith(otherExpression)).not.toContainEqual([subject, otherExpression, '-']);
        });
      });

      describe('And the number can be divided by the result of other expression', () => {
        describe('And the result of the other expression is not the square root of the number', () => {
          test('division is one of the available combination', () => {
            const otherExpression = { result: 2 }
            expect(subject.availableCombinationWith(otherExpression)).toContainEqual([subject, otherExpression, '/']);
          });
        });

        describe('And the result of the other expression is the square root of the number', () => {
          beforeAll(() => number = 4);
          test('division is not one of the available combination', () => {
            const otherExpression = { result: 2 }
            expect(subject.availableCombinationWith(otherExpression)).not.toContainEqual([subject, otherExpression, '/']);
          });
        });

        describe('And the result of the other expression is 1', () => {
          test('division is not one of the available combination', () => {
            const otherExpression = { result: 1 }
            expect(subject.availableCombinationWith(otherExpression)).not.toContainEqual([subject, otherExpression, '/']);
          });
        });
      });
    });

    describe('When the result of the other expression is greater than the numbe', () => {
      describe('And the result of the expression can be divided by the number, and the number is not a square root of the result or 1', () => {
        beforeAll(() => number = 2);
        test('division is one of the available combination, with the other expression as lft', () => {
          const otherExpression = { result: 6 }
          expect(subject.availableCombinationWith(otherExpression)).toContainEqual([otherExpression, subject, '/']);
        })
      });
    });
  });
});