import { getOccurrences } from '../utils';

const convertToArray = (lft, rgt) => {
  return [...(lft.numbersUsed ? lft.numbersUsed : [lft]), ...(rgt.numbersUsed ? rgt.numbersUsed : [rgt])];
}

class Pair {
  constructor(lft, rgt, opt) {
    this.lft = lft;
    this.rgt = rgt;
    this.opt = opt;
  }

  get numbersUsed() {
    const { lft, rgt } = this;
    return convertToArray(lft, rgt);
  }

  get formula() {
    const { lft, rgt, opt } = this;
    const formula = `${lft.formula || lft} ${opt} ${rgt.formula || rgt}`;

    if (opt === '*') {
      return formula;
    } else {
      return `(${formula})`;
    }
  }

  get result() {
    const { lft, rgt, opt } = this;
    switch (opt) {
      case '+':
        return parseInt(lft) + parseInt(rgt);
      case '-':
        return parseInt(lft) - parseInt(rgt);
      case '*':
        return parseInt(lft) * parseInt(rgt);
      case '/':
        return parseInt(lft) / parseInt(rgt);
      default:
        return 0;
    }
  }

  toString() {
    return this.result;
  }
}


export class Solver {
  constructor(numbers, target) {
    this.numbers = [...numbers];

    this.availableNumbersOccurences = getOccurrences(this.numbers);

    this.combinationMap = { 1: numbers, 2: [], 3: [], 4: [], 5: [], 6: [] }
    this.resultsMap = {};

    this.target = target;
    this.solved = false;
  }

  canCombine = (lft, rgt) => {
    const { availableNumbersOccurences } = this;
    const targetOccurences = getOccurrences(convertToArray(lft, rgt));

    return !(Object.keys(targetOccurences).find((number) => targetOccurences[number] > availableNumbersOccurences[number]));
  }

  getCompactableCombinationsFor = (entry) => {
    const { combinationMap, canCombine } = this;

    const lengthOfNumbersUsed = entry.numbersUsed ? entry.numbersUsed.length : 1;

    let compactableCombinations = [];
    for (let length = 1; length <= (6 - lengthOfNumbersUsed); length++) {
      compactableCombinations = compactableCombinations.concat(combinationMap[length].filter((otherEntry) => canCombine(entry, otherEntry)));
    }

    return compactableCombinations;
  }

  getPossibleCombinationsFor = (entry1, entry2) => {
    const combinations = [];
    const [lft, rgt] = parseInt(entry1) > parseInt(entry2) ? [entry1, entry2] : [entry2, entry1];

    const [lftResult, rgtResult] = [parseInt(lft), parseInt(rgt)]

    combinations.push(new Pair(lft, rgt, '+'));

    if (lftResult !== 1 && rgtResult !== 1) {
      combinations.push(new Pair(lft, rgt, '*'));
    }

    if (lftResult !== rgtResult) {
      if (lftResult - rgtResult !== rgtResult)
        combinations.push(new Pair(lft, rgt, '-'));

      if (lftResult % rgtResult === 0 && rgtResult !== 1 && lftResult / rgtResult !== rgtResult)
        combinations.push(new Pair(lft, rgt, '/'));
    }

    return combinations;
  }

  solve() {
    const { numbers, resultsMap, combinationMap, getCompactableCombinationsFor, getPossibleCombinationsFor, target } = this;

    const existingNumbers = new Set(numbers);
    const combinations = [...numbers].sort();

    while (true) {
      let newCombinations = [];

      for (let i = 0; i < combinations.length; i++) {
        const lft = combinations[i];

        const compactableCombinations = getCompactableCombinationsFor(lft);

        for (let j = 0; j < compactableCombinations.length; j++) {
          const rgt = compactableCombinations[j];

          const combinationsForIteration = getPossibleCombinationsFor(lft, rgt);
          const result = combinationsForIteration.find((pair) => parseInt(pair) === target);

          if (result) {
            return `${result.formula} = ${target}`;
          } else {
            newCombinations = newCombinations.concat(combinationsForIteration);
          }
        };
      }

      if (newCombinations.length > 0) {
        for (let i = 0; i < newCombinations.length; i++) {
          const entry = newCombinations[i];
          const entryResult = parseInt(entry);
          const numbersUsed = (entry.numbersUsed || [entry]).sort();

          const resultMapKey = numbersUsed.join(',');

          if (!resultsMap[resultMapKey]) {
            resultsMap[resultMapKey] = new Set();
          }

          if (!(existingNumbers.has(entryResult) || resultsMap[resultMapKey].has(entryResult))) {
            combinations.unshift(entry);
            resultsMap[resultMapKey].add(entryResult);
            combinationMap[numbersUsed.length].push(entry);
          }
        }
      } else {
        return;
      }
    }
  }
}