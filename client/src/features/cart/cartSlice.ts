import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICart } from "../../app/models/cart";
import { caller } from "../../api/caller";

interface CartState {
    cart: ICart | null,
    status: string
}

const initialState: CartState = {
    cart: null,
    status: 'idle'
}

//Async thunk for adding an item to a user cart
export const addCartItemAsync = createAsyncThunk<ICart, {productId: number, quantity: number}>(
    'cart/addCartItemAsync',
    async ({productId, quantity}) => {
        try {

            return await caller.cart.addItem(productId, quantity)

        } catch(err) {
            console.log(err);
        }
    }
)


export const removeCartItemAsync = createAsyncThunk<void, {productId: number, quantity: number}>(
    'cart/removeCartItemAsync',
    async ({productId, quantity}) => {

        try {

            await caller.cart.removeItem(productId, quantity);

        } catch (err) {
            console.log(err);
        }

    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        removeItem: (state, action) => {
            const {productId, quantity} = action.payload;
            
            const itemIndex = state.cart?.items.findIndex(i => i.productId === productId);

            if (itemIndex == -1 || itemIndex === undefined) {
                return;
            }

            state.cart!.items[itemIndex].quantity -= quantity;

            if (state.cart?.items[itemIndex].quantity === 0) {
                state.cart.items.splice(itemIndex, 1);
            }
            
        }

    },
    //Async Thunks for handling async calls to backend for cart actions.
    extraReducers: (builder => {
        builder.addCase(addCartItemAsync.pending, (state, action) => {
            console.log(action)
            state.status = 'pendingAddItem'
        });

        builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = 'idle';
        });

        builder.addCase(addCartItemAsync.rejected, (state) => {
            state.status = 'idle';
        });



    })
});

export const {setCart, removeItem} = cartSlice.actions;