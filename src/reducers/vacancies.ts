import { Action, Reducer } from "redux";

export interface Vacancy {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  company: string;
  salary: number;
  tags: string[];
}

interface VacanciesState {
  top: Vacancy[];
}

const initialState: VacanciesState = {
  top: [
    {
      id: 1,
      title: 'Frontend Developer',
      description: 'Frontend Developer',
      location: 'Kyiv, Ukraine',
      date: '2024-01-01',
      company: 'Company 1',
      salary: 1000,
      tags: ['Frontend', 'React'],
    },
    {
      id: 2,
      title: 'Backend Developer',
      description: 'Backend Developer',
      location: 'Kyiv, Ukraine',
      date: '2024-01-01',
      company: 'Company 2',
      salary: 1000,
      tags: ['Backend', 'Node'],
    }
  ],
};

const vacanciesReducer: Reducer<VacanciesState, Action> = (state, action) => {
  return initialState;
}

export default vacanciesReducer;