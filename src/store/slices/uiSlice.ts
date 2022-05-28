import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
    currentQuestion: number;
    isLoading: boolean;
    isError?: boolean;
    canSubmit: boolean,
}

const initialState: UIState = {
    currentQuestion: 0,
    isError: undefined,
    isLoading: false,
    canSubmit: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        goToQuestion: (state, action: PayloadAction<number>) => {
            state.currentQuestion = action.payload;
        },
        goToNextQuestion: (state) => {
            state.currentQuestion += 1;
        },
        goToPreviousQuestion: (state) => {
            state.currentQuestion -= 1;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setCanSubmit: (state, action: PayloadAction<boolean>) => {
            state.canSubmit = action.payload;
        },
        submitQuiz: (state) => {
            if (!state.canSubmit) return state;
        }
    }
});

export default {
    reducer: uiSlice.reducer,
    actions: uiSlice.actions
}