import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { quizSlice } from '../store/slices';
import { default as S } from './Quiz.styled';
interface QuizProps {

}

const { getResults, quizEnded, returnToMainMenu } = quizSlice.actions;

const Quiz: React.FC<QuizProps> = () => {
    const quizState = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();
    const { questions } = quizState;
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length));
    const [canFinishQuiz, setCanFinishQuiz] = useState(false);

    useEffect(() => {
        const checkIfcanFinishQuiz = () => {
            for (let index = 0; index < selectedAnswers.length; index++) {
                const element = selectedAnswers[index];
                if (element === undefined) return false;
            }
            return true;
        }
        setCanFinishQuiz(checkIfcanFinishQuiz());
        console.log(canFinishQuiz);
    }, [selectedAnswers]);

    const handleFinishQuiz = () => {
        dispatch(getResults(selectedAnswers));
        dispatch(quizEnded());
    }

    const handleReturnToMain = () => {
        dispatch(returnToMainMenu());
    }

    return (
        <S.Wrapper>
            <S.QuestionList>
                {

                    questions.map((item, questionIndex) => {
                        const { answers, question } = item;
                        return (
                            <li key={questionIndex}>
                                <h3>{question}</h3>
                                <S.AnswersList>
                                    {answers.map((answer, answerIndex) => {
                                        const radioId = `${question}-${answerIndex}`;
                                        return (
                                            <li>
                                                <input
                                                    key={answerIndex}
                                                    type="radio"
                                                    name={question}
                                                    value={answer}
                                                    id={radioId}
                                                    onChange={(e) => {
                                                        // console.log('selected index:', answerIndex);
                                                        setSelectedAnswers(prev => [...prev.slice(0, questionIndex), answerIndex, ...prev.slice(questionIndex + 1)])
                                                    }}
                                                />
                                                <label htmlFor={radioId}>{answer}</label>
                                            </li>
                                        )
                                    })}
                                </S.AnswersList>
                            </li>
                        )
                    })

                }
            </S.QuestionList>
            <S.ButtonsContainer>
                <button onClick={handleFinishQuiz} disabled={!canFinishQuiz}>Finish Quiz</button>
                <button onClick={handleReturnToMain}>Return To Main</button>
            </S.ButtonsContainer>
        </S.Wrapper>
    )
}

export default Quiz