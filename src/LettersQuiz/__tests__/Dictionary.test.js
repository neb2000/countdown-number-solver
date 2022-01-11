import { Dictionary } from "../Dictionary";

describe('Dictionary class', () => {
  const mockDictionary = [
    { w: 'test', i: ['e0', 's0', 't0', 't1'], l: 4 }
  ]

  const subject = new Dictionary(mockDictionary);

  describe('_indexLetters', () => {
    test('Append a number of the times the same letter occurred in the list before', () => {
      expect(subject._indexLetters(['t', 'e', 's', 't'])).toEqual(new Set(['e0', 's0', 't0', 't1']));
    });
  });

  describe('_isSuperset', () => {
    test('Returns true when the 1st set is a superset of the 2nd set', () => {
      expect(subject._isSuperset(new Set([1, 2, 3]), new Set([1, 2]))).toBeTruthy();
    });

    test('Returns false when the 1st set is not a superset of the 2nd set', () => {
      expect(subject._isSuperset(new Set([1, 2, 3]), new Set([1, 2, 4]))).toBeFalsy();
    });
  });

  describe('findWordsFor', () => {
    test('Returns a word in dictionary when all letters are available', () => {
      expect(subject.findWordsFor(['t', 't', 'e', 's'])).toContainEqual({ w: 'test', i: ['e0', 's0', 't0', 't1'], l: 4 });
    });

    test('Does not return a word if there are letters short', () => {
      expect(subject.findWordsFor(['g', 't', 'e', 's'])).not.toContainEqual({ w: 'test', i: ['e0', 's0', 't0', 't1'], l: 4 });
    });
  });
});