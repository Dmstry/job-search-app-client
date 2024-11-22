import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "./config";
import { Vacancy, ApiResponse } from "./types";
import { FormInputs } from "../features/Vacancies/CreateVacancy";

export interface VacancySorts {
  sort?: "date_asc" | "date_desc" | "salary_asc" | "salary_desc";
}

export interface VacancyFilters {
  [key: string]: string | number | Array<string | number> | undefined;
  territorialCommunity?: string;
  title?: string;
  hasHigherEducation?: string;
  noExperienceRequired?: string;
}

// Get list of vacancies
export const getVacancies = async (
  page: number,
  limit: number = 18,
  sorts?: VacancySorts,
  filters?: Record<string, string | number | Array<string | number> | undefined>
): Promise<ApiResponse<Vacancy[]>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.VACANCIES}`, {
      params: {
        page,
        limit,
        ...sorts,
        ...filters,
      },
    });
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { data: [], error: error.message };
    }
    return { data: [], error: "An unknown error occurred" };
  }
};

// Get vacancy by id
export const getVacancyById = async (id: string): Promise<ApiResponse<Vacancy | null>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.VACANCIES}/${id}`);
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { data: null, error: error.message };
    }
    return { data: null, error: "An unknown error occurred" };
  }
};

// Create new vacancy
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
    throw new Error("An unknown error occurred");
  }
};

// Updated interface according to the data structure from the backend
interface Locality {
  _id: string;
  name: string;
  fullName: string;
  region: string;
  district: string;
  territorialCommunity: string;
}

// Updated function to get list of localities
export const getLocalities = async (): Promise<ApiResponse<Locality[]>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.LOCALITIES}`);

    // Check if data is available
    if (!response.data || response.data.length === 0) {
      console.warn("No localities data received from the server");
      return { data: [], error: "No data available" };
    }

    return { data: response.data };
  } catch (error) {
    console.error("Error fetching localities:", error);
    if (axios.isAxiosError(error)) {
      return { data: [], error: error.message };
    }
    return { data: [], error: "An unknown error occurred" };
  }
};

// Interface for positions
interface Position {
  _id: string;
  shortName: string;
  category?: string;
  description?: string;
}

// Function to get list of positions
export const getPositions = async (): Promise<ApiResponse<Position[]>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.POSITIONS}`);

    if (!response.data || response.data.length === 0) {
      console.warn("No positions data received from the server");
      return { data: [], error: "No data available" };
    }

    return { data: response.data };
  } catch (error) {
    console.error("Error fetching positions:", error);
    if (axios.isAxiosError(error)) {
      return { data: [], error: error.message };
    }
    return { data: [], error: "An unknown error occurred" };
  }
};
