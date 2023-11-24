
import { useAppDispatch, useAppSelector } from "../app/store/configureStore";
import { decrement, increment } from "./counterSlice";


export const Test = () => {

    const {data, title} = useAppSelector(state => state.counter);
    const dispatch = useAppDispatch();

    return (<>

    <button onClick={() => dispatch(increment(1))}>+</button>
    <button onClick={() => dispatch(decrement(1))}>-</button>
    
    {data}, {title}
    
    </>);

}