// features/vacancies/vacanciesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Vacancy {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  company: string;
  salary: string;
  tags?: string[];
  employmentType: string;
  remoteFriendly: boolean;
}

interface VacanciesState {
  loading: boolean;
  vacancies: Vacancy[];
  error: string | null;
}

const initialState: VacanciesState = {
  loading: false,
  vacancies: [],
  error: null,
};

// Asynchronous thunk to fetch vacancies
export const fetchVacancies = createAsyncThunk('vacancies/fetchVacancies', async () => {
  const response = await axios.get('http://localhost:8001/api/vacancies');
  return response.data;
});

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action: PayloadAction<Vacancy[]>) => {
        state.loading = false;
        state.vacancies = action.payload;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch vacancies';
      });
  },
});

export default vacanciesSlice.reducer;
