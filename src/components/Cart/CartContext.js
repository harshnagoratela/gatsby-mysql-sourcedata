import React, { createContext, useReducer } from 'react';
import { CartReducer, sumItems } from './CartReducer';
import { isBrowser } from './utils'

export const CartContext = createContext()

const storage = (isBrowser() && window.localStorage.getItem('cart')) ? JSON.parse(window.localStorage.getItem('cart')) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };

const CartContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(CartReducer, initialState)

    const increase = payload => {
        dispatch({ type: 'INCREASE', payload })
    }

    const decrease = payload => {
        dispatch({ type: 'DECREASE', payload })
    }

    const addProduct = payload => {
        dispatch({ type: 'ADD_ITEM', payload })
    }

    const removeProduct = payload => {
        dispatch({ type: 'REMOVE_ITEM', payload })
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR' })
    }

    const refreshCart = () => {
        dispatch({ type: 'REFRESH' })
    }

    const handleCheckout = () => {
        console.log('CHECKOUT', state);
        dispatch({ type: 'CHECKOUT' })
    }

    const contextValues = {
        removeProduct,
        addProduct,
        increase,
        decrease,
        clearCart,
        refreshCart,
        handleCheckout,
        ...state
    }

    return (
        <CartContext.Provider value={contextValues} >
            { children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
