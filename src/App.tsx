import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import { RootState } from './store';
import { quizSlice } from './store/slices';
import { GlobalStyle } from './styles/GlobalStyle';

const createTheme = (theme: DefaultTheme) => {
  return Object.keys(theme).reduce((acc, key) => {
    let current = theme[key];
    if (!current.startsWith("#")) {
      current = `#${current}`;
    }
    acc[key] = current;
    return acc;
  }, {} as DefaultTheme);
};

const placeholderTheme: DefaultTheme = createTheme({
  background: "#d8ddef",
  body: "#a0a4b8",
  hover: "#7293a0",
  primary: "#45b69c",
  secondary: "#8c4843"
});

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

  const handleReturnToMain = () => {
    dispatch(returnToMainMenu());
  }

  const handlePlayAgain = () => {
    dispatch(playAgain());
  }

  return (
    <ThemeProvider theme={placeholderTheme}>
      <GlobalStyle />
      <div className="App">
        {
          quizRunning ?
            IfQuizRunning()
            :
            IfQuizNotRunning()
        }
      </div>
    </ThemeProvider>
  )
}


const { returnToMainMenu, playAgain } = quizSlice.actions;

export default App;
