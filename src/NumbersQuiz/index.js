import React, { useState } from 'react';

import { Solver } from './solver';
import { handleFocus, getOccurrences } from '../utils';

function NumbersQuizSolver() {
  const [numbers, setNumbers] = useState(Array(6).fill(''));
  const [targetNumber, setTargetNumber] = useState('');
  const [solution, setSolution] = useState(null);
  const [solving, setSolving] = useState(false);

  const allAvailableNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 25, 50, 75, 100];

  const numbersValid = (availableNumbers, target) => {
    const validNumberOccurences = getOccurrences(allAvailableNumbers);

    const availableNumbersOccurences = getOccurrences(availableNumbers);

    let valid = parseInt(target) > 0;

    Object.keys(availableNumbersOccurences).forEach((number) => {
      if (!validNumberOccurences[number] || availableNumbersOccurences[number] > validNumberOccurences[number]) {
        valid = false;
      }
    });
    return valid;
  }

  const findSolution = (event) => {
    event.preventDefault();

    setSolving(true);
    const solver = new Solver(numbers, targetNumber);
    setTimeout(() => {
      setSolution(solver.solve());
      setNumbers(Array(6).fill(''));
      setTargetNumber('');
      setSolving(false);
    }, 0)

  }

  return (
    <form className='mt-3' onSubmit={findSolution}>
      <div className='row g-3'>
        {
          numbers.map((currentNumber, index) => (
            <div className='col-md-4' key={`col-${index}`}>
              <div className='form-group'>
                <label htmlFor={`input-${index}`} className='visually-hidden'>Number {index + 1}</label>
                <input
                  id={`input-${index}`}
                  type='number'
                  pattern='[0-9]*'
                  inputMode='numeric'
                  className='form-control'
                  list='available-numbers'
                  placeholder={`Number ${index + 1}`}
                  value={currentNumber}
                  onFocus={handleFocus}
                  onChange={(event) => {
                    let currentNumbers = [...numbers];
                    currentNumbers[index] = event.target.value ? parseInt(event.target.value) : '';
                    setNumbers(currentNumbers);
                  }}
                >
                </input>
              </div>
            </div>
          ))
        }

        <div className='col-md-4'>
          <label htmlFor='input-target-number' className='visually-hidden'>Target</label>
          <div className='input-group'>
            <input
              id='input-target-number'
              type='number'
              pattern='[0-9]*'
              inputMode='numeric'
              className='form-control'
              placeholder='Target'
              value={targetNumber}
              onFocus={handleFocus}
              onChange={(event) => setTargetNumber(event.target.value ? parseInt(event.target.value) : '')}
            >
            </input>

            <button className='btn btn-primary' type='submit' disabled={!numbersValid(numbers, targetNumber) || solving}>{solving ? 'Solving...' : 'Solve'}</button>
          </div>
        </div>
      </div>

      {solution && (<pre className='p-3 mt-3 bg-light'>{solution}</pre>)}
      <datalist id='available-numbers'>
        {[...new Set(allAvailableNumbers)].map((number) => (<option key={`available-number-${number}`} value={number}></option>))}
      </datalist>
    </form>
  );
}

export default NumbersQuizSolver;
