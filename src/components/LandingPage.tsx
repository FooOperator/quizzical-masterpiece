import { AnyAction, AsyncThunkAction, getType } from '@reduxjs/toolkit'
import React, { Dispatch, FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppDispatch, configuredStore, RootState } from '../store'
import { getQuiz } from '../store/helpers'
import { formSlice } from '../store/slices'
import { QuizParams } from '../types/store'

const categories = [
    { "id": -1, "name": "Any Category" },
    { "id": 9, "name": "General Knowledge" },
    { "id": 10, "name": "Entertainment: Books" },
    { "id": 11, "name": "Entertainment: Film" },
    { "id": 12, "name": "Entertainment: Music" },
    { "id": 13, "name": "Entertainment: Musicals & Theatres" },
    { "id": 14, "name": "Entertainment: Television" },
    { "id": 15, "name": "Entertainment: Video Games" },
    { "id": 16, "name": "Entertainment: Board Games" },
    { "id": 17, "name": "Science & Nature" },
    { "id": 18, "name": "Science: Computers" },
    { "id": 19, "name": "Science: Mathematics" },
    { "id": 20, "name": "Mythology" },
    { "id": 21, "name": "Sports" },
    { "id": 22, "name": "Geography" },
    { "id": 23, "name": "History" },
    { "id": 24, "name": "Politics" },
    { "id": 25, "name": "Art" },
    { "id": 26, "name": "Celebrities" },
    { "id": 27, "name": "Animals" },
    { "id": 28, "name": "Vehicles" },
    { "id": 29, "name": "Entertainment: Comics" },
    { "id": 30, "name": "Science: Gadgets" },
    { "id": 31, "name": "Entertainment: Japanese Anime & Manga" },
    { "id": 32, "name": "Entertainment: Cartoon & Animations" }
]

const amounts = [
    { "value": "5", "label": "5 Questions" },
    { "value": "10", "label": "10 Questions" },
    { "value": "15", "label": "15 Questions" },
    { "value": "20", "label": "20 Questions" },
]

const difficulties = [
    { "value": -1, "label": "Any Difficulty" },
    { "value": "easy", "label": "Easy" },
    { "value": "medium", "label": "Medium" },
    { "value": "hard", "label": "Hard" },
]

const types = [
    { "value": -1, "label": "Any Type" },
    { "value": "multiple", "label": "Multiple Choice" },
    { "value": "boolean", "label": "True/False" },
]

const LandingPage: React.FC = () => {
    const canSubmit = useSelector((state: RootState) => state.form.canSubmit);
    const dispatch = useDispatch<AppDispatch>();
    const [quizParamsForm, setQuizForm] = useState<QuizParams>({
        amount: '10',
        category: -1,
        difficulty: -1,
        multiple: -1,
    })

    useEffect(() => {
        console.log(quizParamsForm);
        dispatch(formSlice.actions.setCanSubmit(true));
    }, []);

    const handleFormChange = (event: FormEvent<any>) => {
        const { name, value, type, checked } = event.currentTarget;
        console.log(`name: ${name}\nvalue: ${value}\ntype: ${type}\nchecked: ${checked}`);
        setQuizForm({ ...quizParamsForm, [name]: type === 'checkbox' ? checked : value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(formSlice.actions.handleSubmit(quizParamsForm));
        dispatch(getQuiz(configuredStore));
    }

    return (
        <div>
            <h1>Landing Page</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="amount-select">Select amount</label>
                    <select id='amount-select' name='amount' value={quizParamsForm.amount} onChange={handleFormChange}>
                        {
                            amounts.map(({ value, label }, index) =>
                                <option key={index} value={value}>{label}</option>
                            )
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="difficulty-select">Select Difficulty</label>
                    <select id='difficulty-select' name='difficulty' value={quizParamsForm.difficulty} onChange={handleFormChange}>
                        {
                            difficulties.map(({ value, label }, index) =>
                                <option key={index} value={value}>{label}</option>
                            )
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="category-select">Select Category</label>
                    <select name="category" id="category-select" value={quizParamsForm.category} onChange={handleFormChange}>
                        {
                            categories.map(({ id, name }, index) =>
                                <option key={index} value={id}>{name}</option>
                            )
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Choose the quiz type</legend>
                    {
                        types.map(({ value, label }, index) =>
                            <div key={index}>
                                <label htmlFor={`${label}-radio`}>{label}</label>
                                <input
                                    id={`${label}-radio`}
                                    type='radio'
                                    name='multiple'
                                    value={value}
                                    checked={value === quizParamsForm.multiple}
                                    onChange={handleFormChange}
                                />
                            </div>
                        )
                    }
                </fieldset>
                <button disabled={!canSubmit}>Start Quiz</button>
            </form>
        </div>
    )
}

export default LandingPage