import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getQuiz, shuffleArray } from "../helpers";
import { UnicodeDecodeB64 } from "../helpers/utils";

type QuizState = {
    questions: Question[];
    selectedAnswersIndex: number[];
    score: number;
    quizRunning: boolean;
    showResults: boolean;
}

const initialState: QuizState = {
    questions: [],
    selectedAnswersIndex: [],
    score: 0,
    quizRunning: false,
    showResults: false
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState: initialState,
    reducers: {
        finishQuiz: (state, action: PayloadAction<number[]>) => {
            const { questions } = state;
            action.payload.forEach((answerIndex, index) => {
                console.log(`selected index: ${answerIndex}\ncorrect index: ${questions[index].correctAnswerIndex}`);
                if (questions[index].correctAnswerIndex === answerIndex) {
                    state.score++;
                }
            })
            console.log(state.score);
            state.quizRunning = false;
            state.showResults = true;
        },
        returnToMainMenu: (state) => {
            state.showResults = false;
            state.quizRunning = false;
            state.questions = [];
            state.selectedAnswersIndex = [];
            state.score = 0;
        },
        playAgain: (state) => {
            state.showResults = false;
            state.quizRunning = true;
            state.selectedAnswersIndex = [];
            state.score = 0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getQuiz.fulfilled, (state, action: PayloadAction<any>) => {
            // console.log(`get quiz status: ${action.type}`);
            const results = action.payload['results'];
            Object.keys(results).map((key, index) => {
                const answers = shuffleArray([...results[key]['incorrect_answers'], results[key]['correct_answer']].map((answer) => UnicodeDecodeB64(answer)));
                const correctAnswerIndex = answers.indexOf(UnicodeDecodeB64(results[key]['correct_answer']));
                const question: Question = {
                    id: index,
                    question: UnicodeDecodeB64(results[key]['question']),
                    category: results[key]['category'],
                    difficulty: results[key]['difficulty'],
                    correctAnswerIndex: correctAnswerIndex,
                    answers: answers,
                };
                state.questions.push(question);
            })
            state.quizRunning = true;
        }),
            builder.addCase(getQuiz.rejected, (state, action) => {
                // console.log(`get quiz status: ${action.type}`);

            })
    }
});

export default {
    reducer: quizSlice.reducer,
    actions: quizSlice.actions
}