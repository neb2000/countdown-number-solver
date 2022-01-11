import { Equation } from "../Equation";
import { SingleNumber } from "../SingleNumber";

describe('Equation class', () => {
  describe('When lft and rgt are both numbers', () => {
    const number1 = new SingleNumber(6, 1);
    const number2 = new SingleNumber(2, 2);

    let opt = '+';
    let subject;

    beforeEach(() => subject = new Equation(number1, number2, opt));

    test('bitmasksUsed is the combination of 2 numbers', () => {
      expect(subject.bitmasksUsed).toBe(1 | 2);
    });

    test('expressionLength is 2', () => {
      expect(subject.expressionLength).toBe(2);
    });

    test('toString is the equation', () => {
      expect(subject.toString()).toEqual('6 + 2');
    });

    describe('result', () => {
      describe('When opt is +', () => {
        test('result is the sum of 2 numbers', () => {
          expect(subject.result).toBe(8);
        })
      });

      describe('When opt is -', () => {
        beforeAll(() => opt = '-');

        test('result is the difference of 2 numbers', () => {
          expect(subject.result).toBe(4);
        })
      });

      describe('When opt is *', () => {
        beforeAll(() => opt = '*');

        test('result is the product of 2 numbers', () => {
          expect(subject.result).toBe(12);
        })
      });

      describe('When opt is /', () => {
        beforeAll(() => opt = '/');

        test('result is the quotient of 2 numbers', () => {
          expect(subject.result).toBe(3);
        })
      });
    })

    describe('canCombineWith', () => {
      test('The equation can combine with a number it has not already used', () => {
        expect(subject.canCombineWith(new SingleNumber(3, 4))).toBeTruthy;
      });

      test('The equation cannot combine with a number it has already used', () => {
        expect(subject.canCombineWith(number1)).toBeFalsy;
      });

      test('The equation can combine with another equation that uses different numbers', () => {
        const otherEquation = new Equation(new SingleNumber(3, 4), new SingleNumber(5, 8), '+');
        expect(subject.canCombineWith(otherEquation)).toBeTruthy;
      });

      test('The equation can combine with another equation that uses same numbers', () => {
        const otherEquation = new Equation(number1, new SingleNumber(5, 8), '+');
        expect(subject.canCombineWith(otherEquation)).toBeFalsy;
      });
    });
  });

  describe('When one of the branch of the equation is another equation', () => {
    const number1 = new SingleNumber(1, 1);
    const number2 = new SingleNumber(5, 4);
    const number3 = new SingleNumber(3, 8);

    let subject;
    let otherEquation;

    let opt = '+';
    let otherOpt = '+'

    beforeEach(() => {
      otherEquation = new Equation(number2, number3, otherOpt);
      subject = new Equation(number1, otherEquation, opt);
    });

    test('bitmasksUsed is the combination of all numbers used', () => {
      expect(subject.bitmasksUsed).toBe(1 | 4 | 8);
    });

    test('expressionLength is total amount of numbers used', () => {
      expect(subject.expressionLength).toBe(1 + 2);
    });

    test('result is the result of the first equation (8) + 1', () => {
      expect(subject.result).toBe(9);
    });

    describe('toString', () => {
      describe('When the opt is +', () => {
        test('is 1 + 5 + 3', () => {
          expect(subject.toString()).toEqual('1 + 5 + 3');
        });
      });

      describe('When the opt is -', () => {
        beforeAll(() => opt = '-');

        describe('When the opt for the other equation is +', () => {
          beforeAll(() => otherOpt = '+');

          test('is 1 - (5 + 3)', () => {
            expect(subject.toString()).toEqual('1 - (5 + 3)');
          });
        });

        describe('When the opt for the other equation is -', () => {
          beforeAll(() => otherOpt = '-');

          test('is 1 - (5 - 3)', () => {
            expect(subject.toString()).toEqual('1 - (5 - 3)');
          });
        });

        describe('When the opt for the other equation is *', () => {
          beforeAll(() => otherOpt = '*');

          test('is 1 - 5 * 3', () => {
            expect(subject.toString()).toEqual('1 - 5 * 3');
          });
        });

        describe('When the opt for the other equation is /', () => {
          beforeAll(() => otherOpt = '/');

          test('is 1 - 5 / 3', () => {
            expect(subject.toString()).toEqual('1 - 5 / 3');
          });
        });
      });

      describe('When the opt is *', () => {
        beforeAll(() => opt = '*');

        describe('When the opt for the other equation is +', () => {
          beforeAll(() => otherOpt = '+');

          test('is 1 * (5 + 3)', () => {
            expect(subject.toString()).toEqual('1 * (5 + 3)');
          });
        });

        describe('When the opt for the other equation is -', () => {
          beforeAll(() => otherOpt = '-');

          test('is 1 * (5 - 3)', () => {
            expect(subject.toString()).toEqual('1 * (5 - 3)');
          });
        });

        describe('When the opt for the other equation is *', () => {
          beforeAll(() => otherOpt = '*');

          test('is 1 * 5 * 3', () => {
            expect(subject.toString()).toEqual('1 * 5 * 3');
          });
        });

        describe('When the opt for the other equation is /', () => {
          beforeAll(() => otherOpt = '/');

          test('is 1 * 5 / 3', () => {
            expect(subject.toString()).toEqual('1 * 5 / 3');
          });
        });
      });

      describe('When the opt is /', () => {
        beforeAll(() => opt = '/');

        describe('When the opt for the other equation is +', () => {
          beforeAll(() => otherOpt = '+');

          test('is 1 / (5 + 3)', () => {
            expect(subject.toString()).toEqual('1 / (5 + 3)');
          });
        });

        describe('When the opt for the other equation is -', () => {
          beforeAll(() => otherOpt = '-');

          test('is 1 / (5 - 3)', () => {
            expect(subject.toString()).toEqual('1 / (5 - 3)');
          });
        });

        describe('When the opt for the other equation is *', () => {
          beforeAll(() => otherOpt = '*');

          test('is 1 / (5 * 3)', () => {
            expect(subject.toString()).toEqual('1 / (5 * 3)');
          });
        });

        describe('When the opt for the other equation is /', () => {
          beforeAll(() => otherOpt = '/');

          test('is 1 / (5 / 3)', () => {
            expect(subject.toString()).toEqual('1 / (5 / 3)');
          });
        });
      });
    });
  });
});