// store.ts
import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer from './features/Vacancies/vacanciesSlice';

export const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
