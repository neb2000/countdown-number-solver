import { SingleNumber } from "./SingleNumber";

export class CombinationMap {
  constructor(initialNumbers) {
    this.combinationMap = { 1: initialNumbers.sort().map((number, index) => new SingleNumber(number, (1 << index))), 2: [], 3: [], 4: [], 5: [], 6: [] };
    this.resultsMap = {};
  }

  getExistingCombinationFor = (combinationLength) => {
    return this.combinationMap[combinationLength];
  }

  getCompactableCombinationsFor = (combinationLength) => {
    const { combinationMap } = this;

    let compactableCombinations = [];
    for (let length = 1; length <= (6 - combinationLength); length++) {
      compactableCombinations = compactableCombinations.concat(combinationMap[length]);
    }

    return compactableCombinations;
  }

  addToExistingCombinations = (newCombinations) => {
    const { resultsMap, combinationMap } = this;

    for (let [index, newCombinationsCount] = [0, newCombinations.length]; index < newCombinationsCount; index++) {
      const expression = newCombinations[index];
      const expressionResult = expression.result;

      if (!resultsMap[expression.bitmasksUsed])
        resultsMap[expression.bitmasksUsed] = new Set();

      if (!(resultsMap[expression.bitmasksUsed].has(expressionResult))) {
        resultsMap[expression.bitmasksUsed].add(expressionResult);
        combinationMap[expression.expressionLength].push(expression);
      }
    }
  }
}