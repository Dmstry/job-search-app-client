import { Action, Reducer } from "redux";

export interface Vacancy {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  company: string;
  salary: string;
  tags: string[];
  employmentType: string;
  remoteFriendly: boolean;
}

interface VacanciesState {
  top: Vacancy[];
}

const initialState: VacanciesState = {
  top: [
    {
      id: 1,
      title: 'Frontend Developer',
      description: 'Шукаємо досвідченого розробника для роботи з React та створення привабливого користувацького інтерфейсу.',
      location: 'Kyiv, Ukraine',
      date: '2024-01-01',
      company: 'TechSoft',
      salary: '$1500 - $2000',
      tags: ['Frontend', 'React', 'JavaScript'],
      employmentType: 'Повна зайнятість',
      remoteFriendly: true,
    },
    {
      id: 2,
      title: 'Backend Developer',
      description: 'Необхідний фахівець для підтримки та розробки API з використанням Node.js.',
      location: 'Kyiv, Ukraine',
      date: '2024-01-05',
      company: 'BackEnders',
      salary: '$1700 - $2200',
      tags: ['Backend', 'Node', 'Express'],
      employmentType: 'Повна зайнятість',
      remoteFriendly: false,
    },
    {
      id: 3,
      title: 'Fullstack Developer',
      description: 'Шукаємо розробника, здатного працювати як з фронтендом, так і з бекендом для створення масштабованих веб-додатків.',
      location: 'Lviv, Ukraine',
      date: '2024-01-10',
      company: 'WebWorks',
      salary: '$2000 - $2500',
      tags: ['Fullstack', 'React', 'Node.js'],
      employmentType: 'Контракт',
      remoteFriendly: true,
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      description: 'Ми шукаємо DevOps спеціаліста для підтримки CI/CD процесів та налаштування інфраструктури в хмарі.',
      location: 'Remote',
      date: '2024-01-12',
      company: 'CloudMasters',
      salary: '$1800 - $2300',
      tags: ['DevOps', 'AWS', 'CI/CD'],
      employmentType: 'Повна зайнятість',
      remoteFriendly: true,
    }
  ],
};

const vacanciesReducer: Reducer<VacanciesState, Action> = (state, action) => {
  return initialState;
}

export default vacanciesReducer;