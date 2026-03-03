import { combineReducers, configureStore } from "@reduxjs/toolkit";
import api from "../features/baseApi";
import userReducer from "../features/users/userSlice";
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
