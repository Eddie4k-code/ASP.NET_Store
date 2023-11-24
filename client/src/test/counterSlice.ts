import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    data: number;
    title: string;
}

const theState: CounterState = {
    data: 42,
    title: 'with-redux-toolkt'
}


export const counterSlice = createSlice({
    name: 'counter',
    initialState: theState,
    reducers: {
        increment: (state, action) => {

            state.data += action.payload

        },
        decrement: (state, action) => {
            state.data -= action.payload
        }
    }
});

export const {increment, decrement} = counterSlice.actions;