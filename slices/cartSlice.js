import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {

            state.items = [...state.items, action.payload];

        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id);

            let newCart = [...state.items];

            if (index >= 0) {
                newCart.splice(index, 1);
            } else {
                console.warn('Cannot remove product');
            }

            state.items = newCart;
        },
    }
});


export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = state => state.cart.items;

export const selectCartItemsById = (state, id) => state.cart.items.filter((item) => item.dish.id === id);

export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => total += item.dish.price, 0);

export default cartSlice.reducer;