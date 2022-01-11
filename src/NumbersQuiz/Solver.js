import { CombinationMap } from './CombinationMap';
import { Equation } from './Equation';

export class Solver {
  constructor(numbers, target) {
    this.combinationMap = new CombinationMap([...numbers]);
    this.target = target;
  }

  solve() {
    const { combinationMap, target } = this;

    const potentialSolutions = [];

    for (let combinationLength = 1; combinationLength < 6; combinationLength++) {
      const combinations = combinationMap.getExistingCombinationFor(combinationLength);
      const newCombinations = [];

      const compactableCombinations = combinationMap.getCompactableCombinationsFor(combinationLength);

      for (let [lftIndex, combinationsCount] = [0, combinations.length]; lftIndex < combinationsCount; lftIndex++) {
        const lft = combinations[lftIndex];

        const lftIndexInCompactableCombinations = compactableCombinations.indexOf(lft);
        if (lftIndexInCompactableCombinations > -1) {
          compactableCombinations.splice(lftIndexInCompactableCombinations, 1);
        }

        for (let [rgtIndex, compactableCombinationsCount] = [0, compactableCombinations.length]; rgtIndex < compactableCombinationsCount; rgtIndex++) {
          const rgt = compactableCombinations[rgtIndex];

          if (lft.canCombineWith(rgt)) {
            const availableCombinations = lft.availableCombinationWith(rgt);

            for (let [combinationIndex, availableCombinationsCount] = [0, availableCombinations.length]; combinationIndex < availableCombinationsCount; combinationIndex++) {
              const expression = new Equation(...availableCombinations[combinationIndex]);
              const resultOffset = Math.abs(expression.result - target);

              if (resultOffset === 0)
                return { solutionFound: true, solution: expression };
              else if (resultOffset <= 10)
                potentialSolutions.push({ expression, resultOffset });

              newCombinations.push(expression);
            }
          }
        };
      }

      combinationMap.addToExistingCombinations(newCombinations);
    }

    if (potentialSolutions.length > 0) {
      const bestResult = potentialSolutions.sort((a, b) => a.resultOffset - b.resultOffset)[0];

      return { solutionFound: true, solution: bestResult.expression, offset: bestResult.resultOffset }
    }

    return { solutionFound: false };
  }
}