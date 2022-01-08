import './App.scss';
import NumbersQuizSolver from './NumbersQuiz';
import LettersQuizSolver from './LettersQuiz';
import React from 'react';

function App() {
  return (
    <React.Fragment>
        <LettersQuizSolver />
        <NumbersQuizSolver />
    </React.Fragment>
  );
}

export default App;