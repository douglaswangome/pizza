import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./slice";

const store = configureStore({ reducer: { table: tableReducer } });

export default store;
