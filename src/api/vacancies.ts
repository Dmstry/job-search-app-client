import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from './config';
import { Vacancy, ApiResponse } from './types';

export const getVacancies = async (page: number, limit: number = 18): Promise<ApiResponse<Vacancy[]>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.VACANCIES}`, {
      params: {
        page,
        limit,
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