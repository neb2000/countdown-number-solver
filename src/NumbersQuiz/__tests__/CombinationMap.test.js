import { CombinationMap } from "../CombinationMap";
import { SingleNumber } from "../SingleNumber";

describe('CombinationMap class', () => {
  const initialNumbers = [1, 2, 3, 4, 5, 6];
  let subject;

  beforeEach(() => subject = new CombinationMap(initialNumbers));

  describe('constructor', () => {
    test('The initial numbers are converted into SingleNumbers and stored', () => {
      const initialCombinations = subject.combinationMap[1];

      initialCombinations.forEach((entry, index) => {
        const number = initialNumbers[index];
        expect(entry).toMatchObject(new SingleNumber(number, 1 << index));
      })
    });
  });

  describe('getCompactableCombinationsFor', () => {
    beforeEach(() => {
      for(let i = 1; i <= 6; i++) {
        subject.combinationMap[i] = `combination${i}`;
      }
    });

    test('it returns the equations / numbers that will not take total length above 6', () => {
      for (let length = 1; length < 6; length++) {
        const expectedList = [...Array(6 - length)].map((_, index) => `combination${index + 1}`);

        expect(subject.getCompactableCombinationsFor(length)).toEqual(expectedList);
      }
    });
  });

  describe('addToExistingCombinations', () => {
    const equation1 = { result: 7,  expressionLength: 2, bitmasksUsed: (4 | 8) };
    const equation2 = { result: 12, expressionLength: 2, bitmasksUsed: (4 | 8) };

    const newCombinations = [equation1, equation2];

    test('If the same set of numbers were used to generate the same result, do not add the equation to the available list for future use (e.g. 1 + (2 + 3) and (1 + 2) + 3', () => {
      subject.resultsMap[4 | 8] = new Set([7]);
      subject.addToExistingCombinations(newCombinations);
      expect(subject.combinationMap[2]).not.toContain(equation1);
      expect(subject.combinationMap[2]).toContain(equation2);
    });

  });
});