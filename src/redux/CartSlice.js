const {createSlice} = require('@reduxjs/toolkit');

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    removeFromCart(state, action) {
      return state.filter((item, index) => item.id !== action.payload);
      // state.splice(action.payload, 1);
    },
    clearCart(state, action) {
      return [];
    },
  },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
