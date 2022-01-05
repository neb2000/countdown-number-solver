import './App.scss';
import NumbersQuizSolver from './NumbersQuiz';
import LettersQuizSolver from './LettersQuiz';

function App() {
  return (
    <main className='container'>
      <div className='row g-3'>
        <div className='col-md-8 offset-md-2'><LettersQuizSolver /></div>
        <div className='col-md-8 offset-md-2'><NumbersQuizSolver /></div>
      </div>
    </main>
  );
}

export default App;