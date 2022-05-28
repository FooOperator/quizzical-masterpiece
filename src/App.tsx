import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import { RootState } from './store';
import { quizSlice } from './store/slices';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { quizRequestSituation } = useSelector((state: RootState) => state.form);
  const { quizRunning, showResults } = useSelector((state: RootState) => state.quiz);

  const IfQuizRunning = () => {
    switch (quizRequestSituation) {
      case 'pending':
        return <h1>Pending request for quiz...</h1>
      case 'rejected':
        return <h1>Quiz request rejected</h1>
      case 'fulfilled':
        return <Quiz />
      default:
        return <LandingPage />
    }
  }


  const handleReturnToMain = () => {
    dispatch(returnToMainMenu());
  }

  const handlePlayAgain = () => {
    dispatch(playAgain());
  }


  const IfQuizNotRunning = () => {
    if (showResults) {
      return (
        <div>
          <h1>Quiz ended</h1>
          <button onClick={handlePlayAgain}>Play Again</button>
          <button onClick={handleReturnToMain}>Return to Main</button>
        </div>
      )
    }
    return <LandingPage />
  }

  return (
    <div className="App">
      {
        quizRunning ?
          IfQuizRunning()
          :
          IfQuizNotRunning()
      }
    </div>
  )
}

const { returnToMainMenu, playAgain } = quizSlice.actions;

export default App;
