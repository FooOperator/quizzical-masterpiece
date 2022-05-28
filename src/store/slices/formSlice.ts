import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizParams } from "../../types/store";
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
        multiple: '',
    },
    canSubmit: false,
    quizRequestSituation: "none"
}

export const formGetAction = createAction<PayloadAction<any>>('form/get');

const formSlice = createSlice({
    name: "form",
    initialState: initialState,
    reducers: {
        setCanSubmit: (state, action: PayloadAction<boolean>) => {
            state.canSubmit = action.payload;
        },
        handleSubmit: (state, action: PayloadAction<QuizParams>) => {
            if (!state.canSubmit) return state;
            state.fields = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getQuiz.fulfilled, (state, action) => {
            state.quizRequestSituation = 'fulfilled';
        }),
            builder.addCase(getQuiz.rejected, (state, action) => {
                state.quizRequestSituation = 'rejected'
            }),
            builder.addCase(getQuiz.pending, (state, action) => {
                state.quizRequestSituation = 'pending'
            })
    }
});

export default {
    reducer: formSlice.reducer,
    actions: formSlice.actions,
}