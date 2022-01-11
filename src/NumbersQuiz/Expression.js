export const Expression = {
  canCombineWith(expression) {
    return (this.bitmasksUsed & expression.bitmasksUsed) === 0;
  },

  availableCombinationWith(expression) {
    const combinations = [];
    const [lft, rgt] = this.result > expression.result ? [this, expression] : [expression, this];
    const [lftResult, rgtResult] = [lft.result, rgt.result]

    combinations.push([ lft, rgt, '+' ]);

    if (lftResult !== 1 && rgtResult !== 1)
      combinations.push([ lft, rgt, '*' ]);

    if (lftResult !== rgtResult) {
      if (rgtResult + rgtResult !== lftResult)
        combinations.push([ lft, rgt, '-' ]);

      if (lftResult % rgtResult === 0 && rgtResult !== 1 && rgtResult * rgtResult !== lftResult)
        combinations.push([ lft, rgt, '/' ]);
    }

    return combinations;
  }
}