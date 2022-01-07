import { CombinationMap } from './CombinationMap';
import { Equation } from './Equation';

export class Solver {
  constructor(numbers, target) {
    this.combinationMap = new CombinationMap([...numbers]);
    this.target = target;
  }

  getPossibleCombinationsFor = (expression1, expression2) => {
    const combinations = [];
    const [lft, rgt] = expression1.result > expression2.result ? [expression1, expression2] : [expression2, expression1];

    const [lftResult, rgtResult] = [lft.result, rgt.result]

    combinations.push(new Equation(lft, rgt, '+'));

    if (lftResult !== 1)
      combinations.push(new Equation(lft, rgt, '*'));

    if (lftResult !== rgtResult) {
      if (rgtResult + rgtResult !== lftResult)
        combinations.push(new Equation(lft, rgt, '-'));

      if (lftResult % rgtResult === 0 && rgtResult !== 1 && rgtResult * rgtResult !== lftResult)
        combinations.push(new Equation(lft, rgt, '/'));
    }

    return combinations;
  }

  solve() {
    const { combinationMap, getPossibleCombinationsFor, target } = this;

    const potentialSolutions = [];

    for (let combinationLength = 1; combinationLength < 6; combinationLength++) {
      const combinations = combinationMap.getExistingCombinationFor(combinationLength);
      let newCombinations = [];

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
            const combinationsForIteration = getPossibleCombinationsFor(lft, rgt);

            for (let [resultIndex, combinationsForIterationCount] = [0, combinationsForIteration.length]; resultIndex < combinationsForIterationCount; resultIndex++) {
              const expression = combinationsForIteration[resultIndex];
              if (expression.result === target) {
                return {
                  resultFound: true,
                  equation: `${expression} = ${target}`
                };
              } else if (Math.abs(expression.result - target) <= 10) {
                potentialSolutions.push(expression);
              }
            }

            newCombinations = newCombinations.concat(combinationsForIteration);
          }
        };
      }

      combinationMap.addToExistingCombinations(newCombinations);
    }

    if (potentialSolutions.length > 0) {
      const bestResult = potentialSolutions.sort((a, b) => Math.abs(a.result - target) - Math.abs(b.result - target))[0];
      return {
        resultFound: true,
        equation: `${bestResult} = ${bestResult.result}`,
        offset: Math.abs(bestResult.result - target)
      }
    }

    return { resultFound: false };
  }
}