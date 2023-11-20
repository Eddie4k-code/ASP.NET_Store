import { PropsWithChildren, createContext, useContext, useState } from "react";
import { ICart, ICartItem } from "../models/cart";

interface IStoreContext {
    cart: ICart | null;
    setCart: (cart: ICart) => void;
    removeItem: (productId: number, quantity: number) => void;
}


export const StoreContext = createContext<IStoreContext | undefined>(undefined);


//Custom hook to use the actual context.
export const useStoreContext = () => {

    const context = useContext(StoreContext);

    if (context == undefined) {
        throw Error('Must be inside the provider..');
    }

    return context;

}


export const CartContextProvider = ({children}: PropsWithChildren<unknown>) => {
    const [cart, setCart] = useState<ICart | null>(null);


    const removeItem = (productId: number, quantity: number) => {

        if (!cart) {
            return;
        }

        const items = [...cart.items];

        const itemIndex = items.findIndex(i => i.productId === productId);

        if (itemIndex >= 0) {
            items[itemIndex].quantity -= 1
            if (items[itemIndex].quantity == 0) {
                items.splice(itemIndex, 1);
            }
            setCart(prevState => {
                return {...prevState!, items}
            }); //update state
        }




    }


    return (

        <StoreContext.Provider value={{cart, setCart, removeItem}}>
            {children}
        </StoreContext.Provider>

    )




    




}