import { SingleNumber } from '../SingleNumber';

describe("Single Number", () => {
  let number = 10;

  let subject;

  beforeEach(() => subject = new SingleNumber(number, 1));

  test('bitmasksUsed is 1', () => {
    expect(subject.bitmasksUsed).toBe(1);
  });

  test('expressionLength is 1', () => {
    expect(subject.expressionLength).toBe(1);
  });

  test('result is the number', () => {
    expect(subject.result).toBe(number);
  });

  test('toString returns the result', () => {
    expect(subject.toString()).toBe(number);
  });
});