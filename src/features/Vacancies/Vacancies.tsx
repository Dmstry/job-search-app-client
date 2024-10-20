import { Vacancy } from "../../reducers/vacancies";
import { connect } from "react-redux";
import { RootState } from "../../store";

interface VacanciesProps {
  vacancies: Vacancy[];
}

export function Vacancies({ vacancies }: VacanciesProps) {
  return (
    <div>
      <ul>
        {vacancies.map((v) => (
          <li key={v.id}>
            <h3>{v.title}</h3>
            <p>{v.description}</p>
            <p>{v.location}</p>
            <p>{v.date}</p>
            <p>{v.company}</p>
            <p>{v.salary}</p>
            <p>{v.tags}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  vacancies: state.vacancies.top,
})

const connector = connect(mapStateToProps);

export default connector(Vacancies);
