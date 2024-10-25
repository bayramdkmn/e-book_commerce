import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, data } from "../data";

interface InitialState {
  bookList: typeof data; // data'nın tipini kullanarak belirtiyoruz
  cart: Array<any>;
}

const initialState: InitialState = {
  bookList: data,
  cart: [],
};

export const addBasketSlice = createSlice({
  name: "addBasket",
  initialState,
  reducers: {
    addBasket: (state, action: PayloadAction<Book & { quantity: number }>) => {
      const existingBook = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingBook) {
        existingBook.quantity += action.payload.quantity; // Ürün zaten varsa adeti artır
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity,
        }); // Ürün yoksa ekleyip adeti 1 yap
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        if (state.cart[index].quantity > 1) {
          state.cart[index].quantity -= 1; // Adeti azalt
        } else {
          state.cart.splice(index, 1); // Adet 1 ise ürünü çıkar
        }
      }
    },
    increaseBasket: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.cart[index].quantity += 1;
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.cart.splice(index, 1);
      } else {
      }
    },
  },
});

// Actions ve reducer'ı dışa aktarın
export const { addBasket, removeFromCart, deleteFromCart, increaseBasket } =
  addBasketSlice.actions;
export default addBasketSlice.reducer; // Default olarak dışa aktar
