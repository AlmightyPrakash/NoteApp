import { configureStore } from '@reduxjs/toolkit';
import pasteReducer from './pasteSlice';

const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});

export default store;
