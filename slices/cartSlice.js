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

            //console.log(state.items);
        },
        removeFromCart: (state, action) => {
            state.value -= 1;
        },
    }
});


export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = state => state.cart.items;

export const selectCartItemsById = (state, id) => state.cart.items.filter((item) => item.dish.id === id);

export default cartSlice.reducer;