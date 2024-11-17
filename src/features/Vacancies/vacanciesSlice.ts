import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getVacancies } from '../../api/vacancies';
import { Vacancy } from '../../api/types';

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

export const fetchVacancies = createAsyncThunk(
  'vacancies/fetchVacancies',
  async (page: number) => {
    const response = await getVacancies(page);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  }
);

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
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.loading = false;
        state.vacancies = [...state.vacancies, ...action.payload];
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch vacancies';
      });
  },
});

export default vacanciesSlice.reducer;
