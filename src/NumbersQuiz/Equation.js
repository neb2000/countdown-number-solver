export class Equation {
  constructor(lft, rgt, opt) {
    this.lft = lft;
    this.rgt = rgt;
    this.opt = opt;
  }

  get bitmasksUsed() {
    const { lft, rgt } = this;
    return lft.bitmasksUsed | rgt.bitmasksUsed;
  }

  get expressionLength() {
    const { lft, rgt } = this;
    return lft.expressionLength + rgt.expressionLength;
  }

  get result() {
    const { lft, rgt, opt } = this;
    switch (opt) {
      case '+':
        return lft.result + rgt.result;
      case '-':
        return lft.result - rgt.result;
      case '*':
        return lft.result * rgt.result;
      case '/':
        return lft.result / rgt.result;
      default:
        return 0;
    }
  }

  canCombineWith(expression) {
    return (this.bitmasksUsed & expression.bitmasksUsed) === 0;
  }

  toString() {
    const { lft, rgt, opt } = this;

    let lftFormula = lft.toString();
    let rgtFormula = rgt.toString();

    if ((opt === '*' || opt === '/') && (lft.opt === '+' || lft.opt === '-'))
      lftFormula = `(${lftFormula})`;

    if (((opt === '-' || opt === '*') && (rgt.opt === '+' || rgt.opt === '-')) || (opt === '/' && rgt.opt))
      rgtFormula = `(${rgtFormula})`;

    return `${lftFormula} ${opt} ${rgtFormula}`;
  }
}