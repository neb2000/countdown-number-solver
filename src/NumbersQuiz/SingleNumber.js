export class SingleNumber {
  constructor(number, bitmask) {
    this.number = number;
    this.bitmask = bitmask;
  }

  get bitmasksUsed() {
    return this.bitmask;
  }

  get expressionLength() {
    return 1;
  }

  get result() {
    return this.number;
  }

  canCombineWith(expression) {
    return (this.bitmasksUsed & expression.bitmasksUsed) === 0;
  }

  toString() {
    return this.number;
  }
}