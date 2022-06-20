import React from 'react';
import { useSelector } from 'react-redux';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import LandingPage from './components/LandingPage/LandingPage';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
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
  // background: "#d8ddef",
  background: "pink",
  body: "#a0a4b8",
  hover: "#7293a0",
  primary: "#45b69c",
  secondary: "#8c4843"
});

const App: React.FC = () => {
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
      return <Results />
    }
    return <LandingPage />
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
