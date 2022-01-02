import './bootstrap.scss';
import NumbersQuizSolver from './NumbersQuiz';
import LettersQuizSolver from './LettersQuiz';

function App() {
  return (
    <main className='container'>
      <LettersQuizSolver />
      <hr />
      <NumbersQuizSolver />
    </main>
  );
}

export default App;