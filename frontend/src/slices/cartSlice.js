import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "paypal",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item]; // we don't use push() because it mutates the state directly
      }

      return updateCart(state);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== id);
      return updateCart(state);
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems(state) {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
