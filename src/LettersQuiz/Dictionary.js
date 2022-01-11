export class Dictionary {
  constructor(dictionary) {
    this.dictionary = dictionary;
    this.dictionaryLength = dictionary.length;
  }

  findWordsFor(letters) {
    const { _indexLetters, _isSuperset, dictionary, dictionaryLength } = this;

    const wordsFound = [];
    const indexedLetters = _indexLetters(letters)

    for (let index = 0; index < dictionaryLength; index++) {
      if (wordsFound.length < 5) {
        const word = dictionary[index];
        if (_isSuperset(indexedLetters, new Set(word.i)))
          wordsFound.push(word);
      } else {
        break;
      }
    }

    return wordsFound;
  }

  _indexLetters(letters) {
    const groupedLetters = Object.values(letters.reduce((list, letter) => {
      list[letter] ? list[letter].push(letter) : list[letter] = [letter];
      return list;
    }, {}));

    return new Set(groupedLetters.map((group) => group.map((letter, index) => `${letter}${index}`)).flat());
  }

  _isSuperset(set, subset) {
    if (set.size < subset.size) {
      return false;
    }

    for (const elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }
}