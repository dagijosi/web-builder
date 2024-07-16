import { configureStore } from '@reduxjs/toolkit';
import elementsReducer from './features/elements/elementsSlice';

export const store = configureStore({
  reducer: {
    elements: elementsReducer,
  },
});
