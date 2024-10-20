import { combineReducers } from 'redux';
import vacanciesReducer from './vacancies';

const rootReducer = combineReducers({
  vacancies: vacanciesReducer,
});

export default rootReducer;
