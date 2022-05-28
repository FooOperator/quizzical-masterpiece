import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { quizSlice } from '../store/slices';

interface QuizProps {

}

const { getResults, quizEnded } = quizSlice.actions;

const Quiz: React.FC<QuizProps> = () => {
    const quizState = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();
    const { questions } = quizState;
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length));

    useEffect(() => {
        console.log(selectedAnswers);
    }, [selectedAnswers]);

    const handleFinishQuiz = () => {
        console.log('finish quiz');
        dispatch(getResults(selectedAnswers));
        dispatch(quizEnded());
    }

    return (
        <div>
            <h1>Quiz</h1>
            <p>Questions: {questions.length}</p>
            {
                questions.map((item, questionIndex) => {
                    const { answers, question } = item;

                    return (
                        <li key={questionIndex}>
                            <h3>{question}</h3>
                            <ul>
                                {answers.map((answer, answerIndex) => {
                                    const radioId = `${question}-${answerIndex}`;
                                    return (
                                        <>
                                            <input
                                                key={answerIndex}
                                                type="radio"
                                                name={question}
                                                value={answer}
                                                id={radioId}
                                                onChange={(e) => {
                                                    console.log('selected index:', answerIndex);
                                                    setSelectedAnswers(prev => [...prev.slice(0, questionIndex), answerIndex, ...prev.slice(questionIndex + 1)])
                                                }}
                                            />
                                            <label htmlFor={radioId}>{answer}</label>
                                        </>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })
            }
            <button onClick={handleFinishQuiz} disabled={!selectedAnswers.every((answer) => answer)}>Finish Quiz</button>
        </div>
    )
}

export default Quiz