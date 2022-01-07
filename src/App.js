import './App.scss';
import NumbersQuizSolver from './NumbersQuiz';
import LettersQuizSolver from './LettersQuiz';

function App() {
  return (
    <main className='container-fluid container-lg h-100'>
      <div id='main-row' className='row g-3'>
        <div id='letters-quiz-solver' className='col-sm-5 col-lg-8 offset-lg-2'><LettersQuizSolver /></div>
        <div id='numbers-quiz-solver' className='col-sm-7 col-lg-8 offset-lg-2'><NumbersQuizSolver /></div>
      </div>
    </main>
  );
}

export default App;