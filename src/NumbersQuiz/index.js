import React, { useRef, useState } from 'react';

import { Solver } from './Solver';
import { handleFocus } from '../utils';

function QuizResult({solutionFound, solution, offset}) {
  let result;

  if (solutionFound) {
    const equation = `${solution} = ${solution.result}`;

    result = equation.split(' ').map((expression, index) => (<span className={`expression ${offset ? 'text-warning' : 'text-success'}`} key={index}>{expression}</span>));

    if (offset)
      result = (<React.Fragment>{result}<small>({offset} off)</small></React.Fragment>);

  } else {
    result = (<span className='text-danger'>Cannot find a solution</span>);
  }

  return (
    <React.Fragment>{result}</React.Fragment>
  )
}

function NumbersQuizSolver() {
  const allAvailableNumbers = [25, 50, 75, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [numbers, setNumbers] = useState([]);
  const [targetNumber, setTargetNumber] = useState('');
  const [solution, setSolution] = useState(null);
  const [solving, setSolving] = useState(false);

  const targetInputRef = useRef(null);

  const numbersValid = () => {
    return parseInt(targetNumber) > 0 && maxSelectionReached();
  }

  const findSolution = (event) => {
    event.preventDefault();

    setSolving(true);
    const solver = new Solver(numbers, targetNumber);
    setTimeout(() => {
      setSolution(solver.solve());
      setNumbers([]);
      setTargetNumber('');
      setSolving(false);
    }, 0)

  }

  const maxSelectionReached = () => {
    return numbers.length >= 6;
  }

  const maxAvailableReached = (number) => {
    if (number > 10) {
      return numbers.indexOf(number) > -1;
    } else {
      return numbers.filter((selectedNumber) => selectedNumber === number).length >= 2;
    }
  }

  const addNumber = (number) => {
    setSolution(null);

    const currentNumbers = [...numbers];
    currentNumbers.push(number);
    setNumbers(currentNumbers);

    if (currentNumbers.length >= 6)
      targetInputRef.current.focus();
  }

  const canSolve = (numbersValid() && !solving);

  const selectedNumbersList = (
    <div id='numbers-selected'>
      {
        [...Array(6)].map((_, index) => (
          <div key={`number-selected-${index}`} className='number-selected'>{numbers[index] || (<span>&nbsp;</span>)}</div>
        ))
      }
    </div>
  )

  return (
    <form id='numbers-quiz-solver' onSubmit={findSolution}>
      {
        (solving || solution) ? (<code id='numbers-solution' className={`d-block ${solving ? 'solving' : 'solved'}`}>{solving ? 'Solving...' : (<QuizResult {...solution}></QuizResult>)}</code>) : selectedNumbersList
      }
      <div id='numbers-selection-buttons' className='mb-3' role='group'>
        {
          allAvailableNumbers.map((number) => {
            return (
              <button
                key={`select-number-${number}`}
                type='button'
                className={`px-1 btn btn-light ${number > 10 ? 'btn-b' : 'btn-s'}`}
                data-value={number}
                disabled={maxAvailableReached(number) || maxSelectionReached()}
                onClick={() => addNumber(number)}
              >
                {number}
              </button>
            )
          })
        }

        <button
          type='button'
          className='btn btn-light btn-clear'
          disabled={numbers.length === 0}
          onClick={() => {
            setNumbers([]);
          }}
        >
          C
        </button>

        <button
          type='button'
          className='btn btn-light btn-backspace'
          disabled={numbers.length === 0}
          onClick={() => {
            const currentNumbers = [...numbers];
            currentNumbers.pop();
            setNumbers(currentNumbers);
          }}
        >
          &#9003;
        </button>
      </div>


      <div className='d-flex'>
        <label htmlFor='input-target-number' className='visually-hidden'>Target</label>

        <input
          id='input-target-number'
          type='number'
          pattern='[0-9]*'
          inputMode='numeric'
          className='form-control'
          placeholder='Target'
          value={targetNumber}
          onFocus={handleFocus}
          ref={targetInputRef}
          onChange={(event) => {
            const inputValue = event.target.value;
            if (inputValue.length < 4)
              setTargetNumber(inputValue === '' ? '' : parseInt(inputValue))
          }}
        >
        </input>
        <button className={`btn ${canSolve ? 'text-primary' : 'text-muted'} px-3`} type='submit' disabled={!canSolve}>Solve</button>


      </div>
    </form>
  );
}

export default NumbersQuizSolver;
