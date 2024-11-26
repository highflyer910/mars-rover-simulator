import { configureStore } from '@reduxjs/toolkit';
import roverReducer from './roverSlice';

export const store = configureStore({
  reducer: {
    rover: roverReducer
  }
});