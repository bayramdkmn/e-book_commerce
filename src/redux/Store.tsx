// store.ts
import { configureStore } from "@reduxjs/toolkit";
import addBasketReducer from "./addBasketSlice"; // addBasketSlice dosyanız

const store = configureStore({
  reducer: {
    addBasket: addBasketReducer, // Burada addBasket adında bir dilim kullanıyoruz
  },
});

export default store;
