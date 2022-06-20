import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getQuiz } from "../helpers";

type FormState = {
    fields: QuizParams;
    canSubmit: boolean;
    quizRequestSituation: 'fulfilled' | 'pending' | 'rejected' | 'none';
}

const initialState: FormState = {
    fields: {
        category: '',
        difficulty: '',
        amount: '',
        type: '',
    },
    canSubmit: false,
    quizRequestSituation: "none"
}

export const formGetAction = createAction<PayloadAction<any>>('form/get');

const formSlice = createSlice({
    name: "form",
    initialState: initialState,
    reducers: {
        setCanSubmit: (state: FormState, action: PayloadAction<boolean>) => {
            state.canSubmit = action.payload;
        },
        handleSubmit: (state: FormState, action: PayloadAction<QuizParams>) => {
            if (!state.canSubmit) return state;
            state.fields = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getQuiz.fulfilled, (state: FormState, action: {}) => {
            state.quizRequestSituation = 'fulfilled';
        }),
            builder.addCase(getQuiz.rejected, (state: FormState, action: {}) => {
                state.quizRequestSituation = 'rejected'
            }),
            builder.addCase(getQuiz.pending, (state: FormState, action: {}) => {
                state.quizRequestSituation = 'pending'
            })
    }
});

export default {
    reducer: formSlice.reducer,
    actions: formSlice.actions,
}