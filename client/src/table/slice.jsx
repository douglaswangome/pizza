import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  table: [],
  total: 0,
  user: null,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addToTable: (state, action) => {
      const item = { ...action.payload, quantity: 1 };

      const existingItem = state.table.find(
        (exist) => exist.title === item.title
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.table.push(item);
      }
      state.total += item.price;
    },
    updateQuantity: (state, action) => {
      const { title, newQuantity } = action.payload;
      const existingItem = state.table.find((exist) => exist.title === title);
      if (existingItem && newQuantity > 0) {
        state.total +=
          (newQuantity - existingItem.quantity) * existingItem.price;
        existingItem.quantity = newQuantity;
      }
    },
    updateSize: (state, action) => {
      const { title, newSize, price } = action.payload;
      const existingItem = state.table.find((exist) => exist.title === title);
      if (existingItem) {
        state.total -= existingItem.quantity * existingItem.price;
        state.total += existingItem.quantity * price;
        existingItem.price = price;
        existingItem.size = newSize;
      }
    },
    deleteFromTable: (state, action) => {
      const { title } = action.payload;
      const existingItem = state.table.find((exist) => exist.title === title);
      if (existingItem) {
        state.total -= existingItem.quantity * existingItem.price;
        state.table = state.table.filter((item) => item.title !== title);
      }
    },
    clearTable: (state) => {
      state.table = [];
      state.total = 0;
    },
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

export const {
  addToTable,
  updateQuantity,
  updateSize,
  deleteFromTable,
  clearTable,
  signIn,
  signOut,
} = tableSlice.actions;

export default tableSlice.reducer;
