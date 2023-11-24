import { StaticDateRangePicker } from "@mui/lab";

export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export interface CounterState {
    data: number;
    title: string;
}

const initalState: CounterState = {
    data: 42,
    title: 'yuck'
}

export function increment(amount = 1) {

    return {
        type: INCREMENT_COUNTER,
        payload: amount
    }

}

export default function counterReducer(state = initalState, action: any) {

    switch (action.type) {
        case INCREMENT_COUNTER:
            return {...state, data: state.data + 1}

        case DECREMENT_COUNTER:
            return {...state, data: state.data - 1}

        default:
            return state;

    }
    
    return state;
}

