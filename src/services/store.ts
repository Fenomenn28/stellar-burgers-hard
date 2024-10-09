import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice/userSlice';
import ingredientSlice from './slices/ingredientsSlice/ingredientsSlice';
import constructorSlice from './slices/constructorSlice/constructorSlice';
import feedSlice from './slices/feedSlice/feedSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  userSlice: userSlice,
  ingredient: ingredientSlice,
  constructorSlice: constructorSlice,
  feedSlice: feedSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
