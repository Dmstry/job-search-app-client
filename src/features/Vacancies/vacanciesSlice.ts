import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Vacancy {
  title: any;
  location: any;
  employer: any;
  _id: string;
  titleDetails: {
    shortName: string;
  };
  locationDetails: {
    locality: string;
  };
  employerDetails: {
    shortName: string;
  };
  employmentType: string;
  salary: number;
  postedDate: string;
  responsibilities: string;
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

// Асинхронний thunk для отримання вакансій з пагінацією
export const fetchVacancies = createAsyncThunk('vacancies/fetchVacancies', async (page: number) => {
  const response = await axios.get(`http://localhost:8001/api/vacancies/paginated?page=${page}&limit=18`);
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
        state.vacancies = [...state.vacancies, ...action.payload];
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch vacancies';
      });
  },
});

export default vacanciesSlice.reducer;
