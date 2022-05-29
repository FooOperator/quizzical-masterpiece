import { createAsyncThunk, Store } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../api/axios";
import { formGetAction } from "../slices/formSlice";

export const getQuiz = createAsyncThunk(formGetAction.name, async (store: Store) => {
    try {
        const { fields } = store.getState().form;
        const params = Object.keys(fields).reduce((acc, key) => {
            if (fields[key] !== -1) {
                acc[key] = fields[key] as string;
            }
            return acc;
        }, {} as { [key: string]: string });
        // console.log(`the params are: ${JSON.stringify(params)}`);
        const res = await api.get('', {
            params: {
                ...params,
                encode: 'base64'
            }
        })
        // console.log(`response data: ${res.data}`);
        // console.log(`response status: ${res.status}`);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log(axiosError);
    } finally {
        // console.log('Get quiz is done');
    }
})