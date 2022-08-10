import React, { FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppDispatch, configuredStore, RootState } from '../../store'
import { getQuiz } from '../../store/helpers'
import { formSlice } from '../../store/slices'
import { default as S } from './LandingPage.styled';

const categories = [
    { "id": -1, "name": "Mixed" },
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
];

const amounts = [
    { "value": "5", "label": "5 Questions" },
    { "value": "10", "label": "10 Questions" },
    { "value": "15", "label": "15 Questions" },
    { "value": "20", "label": "20 Questions" },
];

const difficulties = [
    { "value": -1, "label": "Any Difficulty" },
    { "value": "easy", "label": "Easy" },
    { "value": "medium", "label": "Medium" },
    { "value": "hard", "label": "Hard" },
];

const types = [
    { "value": -1, "label": "Any Type" },
    { "value": "multiple", "label": "Multiple Choice" },
    { "value": "boolean", "label": "True/False" },
];

const LandingPage: React.FC = () => {
    const canSubmit = useSelector((state: RootState) => state.form.canSubmit);
    const dispatch = useDispatch<AppDispatch>();
    const [quizParamsForm, setQuizForm] = useState<QuizParams>({
        amount: '5',
        category: -1,
        difficulty: -1,
        type: -1,
    })

    useEffect(() => {
        dispatch(formSlice.actions.setCanSubmit(true));
    }, []);

    const handleFormChange = (event: FormEvent<any>) => {
        const { name, value, type, checked } = event.currentTarget;
        let processedValue = value;
        if (processedValue === '-1') processedValue = -1;
        setQuizForm({ ...quizParamsForm, [name]: type === 'checkbox' ? checked : processedValue });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(formSlice.actions.handleSubmit(quizParamsForm));
        dispatch(getQuiz(configuredStore));
    }

    return (
		<S.Wrapper>
			<S.Stack>
				<h1>Quizzical Masterpiece</h1>
				<form onSubmit={handleSubmit}>
					<S.ColumnFieldset>
						<label htmlFor="amount-select">
							Number of Questions
						</label>
						<select
							id="amount-select"
							name="amount"
							value={quizParamsForm.amount}
							onChange={handleFormChange}>
							{amounts.map(({ value, label }, index) => (
								<option key={index} value={value}>
									{label}
								</option>
							))}
						</select>
					</S.ColumnFieldset>
					<S.ColumnFieldset>
						<label htmlFor="difficulty-select">
							Difficulty
						</label>
						<select
							id="difficulty-select"
							name="difficulty"
							value={quizParamsForm.difficulty}
							onChange={handleFormChange}>
							{difficulties.map(
								({ value, label }, index) => (
									<option key={index} value={value}>
										{label}
									</option>
								)
							)}
						</select>
					</S.ColumnFieldset>
					<S.ColumnFieldset>
						<label htmlFor="category-select">Category</label>
						<select
							name="category"
							id="category-select"
							value={quizParamsForm.category}
							onChange={handleFormChange}>
							{categories.map(({ id, name }, index) => (
								<option key={index} value={id}>
									{name}
								</option>
							))}
						</select>
					</S.ColumnFieldset>
					<S.RowFieldset>
						<legend>Choose the quiz type</legend>
						{types.map(({ value, label }, index) => (
							<div key={index}>
								<input
									id={`${label}-radio`}
									type="radio"
									name="type"
									value={value}
									checked={value === quizParamsForm.type}
									onChange={handleFormChange}
								/>
								<label htmlFor={`${label}-radio`}>
									{label}
								</label>
							</div>
						))}
					</S.RowFieldset>
					<S.RowFieldset>
						<S.Button disabled={!canSubmit}>
							Start Quiz
						</S.Button>
					</S.RowFieldset>
				</form>
			</S.Stack>
		</S.Wrapper>
	);
}

export default LandingPage;