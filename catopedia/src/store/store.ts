import { configureStore } from '@reduxjs/toolkit';
import catReducer from './reducers/catSlice';

export const store = configureStore({
  reducer: {
    cat: catReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
