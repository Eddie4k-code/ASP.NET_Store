//Single store that contains all of the state


import { configureStore } from "@reduxjs/toolkit"
import { counterSlice } from "../../test/counterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../../features/cart/cartSlice";
import { accountSlice } from "../../features/account/accountSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        cart: cartSlice.reducer,
        account: accountSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;