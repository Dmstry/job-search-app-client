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