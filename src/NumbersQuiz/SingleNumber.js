import { Expression } from "./Expression";

export class SingleNumber {
  constructor(number, bitmask) {
    Object.assign(this, Expression);

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

  toString() {
    return this.number;
  }
}