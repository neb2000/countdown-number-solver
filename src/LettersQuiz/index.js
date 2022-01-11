import React, { useEffect, useState } from 'react';
import { handleFocus } from '../utils';
import { Dictionary } from './Dictionary';

function LettersQuizSolver() {
  const [dictionary, setDictionary] = useState(null);
  const [letters, setLetters] = useState('');
  const [results, setResults] = useState([]);

  const cleanedLetters = () => {
    return letters.toLowerCase().replaceAll(/[^a-z]/g, '').split('');
  }

  const lettersValid = () => {
    return cleanedLetters().length >= 8;
  }

  const findWords = (event) => {
    event.preventDefault();

    const wordsFound = dictionary.findWordsFor(cleanedLetters());

    setResults(wordsFound);
    setLetters('');
  }

  useEffect(() => {
    const loadDict = async () => {
      const dictUrl = document.querySelector('meta[name="dictionary-url"]').getAttribute('content')

      const response = await fetch(dictUrl);
      const json = await response.json();
      setDictionary(new Dictionary(json));
    }

    loadDict();
  }, [])

  const canFindWords = dictionary && lettersValid();

  return (
    <form id='letters-quiz-solver' onSubmit={findWords}>

      <div className='d-flex'>
        <label htmlFor='input-target-number' className='visually-hidden'>Letters</label>
        <input
          id='input-letters-number'
          type='string'
          spellCheck='false'
          autoCorrect='off'
          autoComplete='false'
          autoCapitalize='none'
          className='form-control'
          placeholder='Letters...'
          value={letters}
          onFocus={handleFocus}
          onChange={(event) => {
            const inputValue = event.target.value;
            if (inputValue.length < 10)
              setLetters(inputValue);
          }}
        >
        </input>

        <button className={`btn ${canFindWords ? 'text-primary' : 'text-muted'} px-3`} type='submit' disabled={!canFindWords}>Solve</button>
      </div>


      {results.length > 0 && (
        <ul id='words-solutions' className='list-group'>
          {results.map((word, index) => (<li className='list-group-item d-flex justify-content-between align-items-center' key={`word-${index}`}><div className='me-auto'>{word.w}</div><span className='text-muted'>{word.l}</span></li>))}
        </ul>
      )}
    </form>
  );
}

export default LettersQuizSolver;