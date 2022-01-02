import React, { useEffect, useState } from 'react';
import { handleFocus } from '../utils';

function LettersQuizSolver() {
  const [dictionary, setDictionary] = useState(null);
  const [letters, setLetters] = useState('');
  const [results, setResults] = useState([]);

  const isSuperset = (set, subset) => {
    for (let elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }

  const cleanedLetters = () => {
    return letters.toLowerCase().replaceAll(/[^a-z]/g, '').split('');
  }

  const lettersValid = () => {
    return cleanedLetters().length >= 8;
  }

  const findWords = (event) => {
    event.preventDefault();

    const groupedLetters = Object.values(cleanedLetters().reduce( (list, letter) => {
      list[letter] ? list[letter].push(letter) : list[letter] = [letter];
      return list;
    }, {}));

    const indexedLetters = new Set(groupedLetters.map((group) => group.map((letter, index) => `${letter}${index}`)).flat());
    const wordsFound = [];

    for (let i = 0; i < dictionary.length; i++) {
      if (wordsFound.length < 5) {
        const word = dictionary[i];
        if (isSuperset(indexedLetters, new Set(word.i))) {
          wordsFound.push(word);
        }
      } else {
        break;
      }
    }

    setResults(wordsFound);
    setLetters('');
  }

  useEffect(() => {
    const loadDict = async () => {
      const dictUrl = document.querySelector('meta[name="dictionary-url"]').getAttribute('content')

      const response = await fetch(dictUrl);
      const json = await response.json();
      setDictionary(json);
    }

    loadDict();
  }, [])

  return (
    <form className='mt-3' onSubmit={findWords}>
      <div className='row g-3'>
        <div className='col-md-4'>
          <label htmlFor='input-target-number' className='visually-hidden'>Letters</label>
          <div className='input-group'>
            <input
              id='input-letters-number'
              type='string'
              spellCheck='false'
              autoCorrect='off'
              autoComplete='false'
              autoCapitalize='none'
              className='form-control'
              placeholder='Letters'
              value={letters}
              onFocus={handleFocus}
              onChange={(event) => setLetters(event.target.value)}
            >
            </input>
            <button className='btn btn-primary' type='submit' disabled={!(dictionary && lettersValid())}>Find words</button>
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className='row g-3'>
          <div className='col-md-4'>
            <ul className='list-group mt-3'>
              {results.map((word, index) => (<li className='list-group-item d-flex justify-content-between align-items-center' key={`word-${index}`}><div className='me-auto'>{word.w}</div><span className='badge bg-light text-dark rounded-pill"'>{word.l}</span></li>))}
            </ul>
          </div>
        </div>
      )}
    </form>
  );
}

export default LettersQuizSolver;