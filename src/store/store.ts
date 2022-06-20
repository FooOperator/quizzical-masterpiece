import { configureStore, Store } from "@reduxjs/toolkit";
import { formSlice, quizSlice, uiSlice } from "./slices";

const configuredStore = configureStore({
    reducer: {
        quiz: quizSlice.reducer,
        ui: uiSlice.reducer,
        form: formSlice.reducer,
    },
})

export type RootState = ReturnType<typeof configuredStore.getState>;
export type AppDispatch = typeof configuredStore.dispatch;
export default configuredStore;