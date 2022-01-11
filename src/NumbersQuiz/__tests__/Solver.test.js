import { Solver } from "../Solver";

describe('Solver', () => {
  let target;
  let subject;
  let result;

  beforeEach(() => {
    subject = new Solver([1, 2, 3, 4, 5, 6], target)
    result = subject.solve();
  });

  describe('When a solution can be found', () => {
    beforeAll(() => target = 750);

    test('It returns the solution', () => {
      expect(result.solutionFound).toBeTruthy();
      expect(result.solution.result).toBe(750);
    });
  });

  describe('When a solution cannot be found', () => {
    describe('And a solution to a result within 10 of the target can be found', () => {
      beforeAll(() => target = 751);

      test('It returns the equation and the offset', () => {

        expect(result.solutionFound).toBeTruthy();
        expect(result.solution.result).toBe(750);
        expect(result.offset).toBe(1);
      });
    });

    describe('And a solution to a result within 10 of the target cannot be found', () => {
      beforeAll(() => target = 875);

      test('It indicates that a solution is not found', () => {

        expect(result.solutionFound).toBeFalsy();
      });
    });

  });
});