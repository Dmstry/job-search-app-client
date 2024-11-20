import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from './config';
import { Vacancy, ApiResponse } from './types';
import { FormInputs } from '../features/Vacancies/CreateVacancy';

export interface VacancySorts {
  sort?: 'date_asc' | 'date_desc' | 'salary_asc' | 'salary_desc';
}

// Отримання списку вакансій
export const getVacancies = async (page: number, limit: number = 18, sorts?: VacancySorts): Promise<ApiResponse<Vacancy[]>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.VACANCIES}`, {
      params: {
        page,
        limit,
        ...sorts,
      },
    });
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { data: [], error: error.message };
    }
    return { data: [], error: 'An unknown error occurred' };
  }
};

// Отримання вакансії за ID
export const getVacancyById = async (id: string): Promise<ApiResponse<Vacancy | null>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.VACANCIES}/${id}`);
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { data: null, error: error.message };
    }
    return { data: null, error: 'An unknown error occurred' };
  }
};

// Створення нової вакансії
export const createVacancy = async (formData: FormInputs): Promise<ApiResponse<Vacancy>> => {
  try {
    const vacancyData = {
      ...formData,
      postedDate: new Date().toISOString(),
    };

    const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.VACANCIES}`, vacancyData);
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error('An unknown error occurred');
  }
};