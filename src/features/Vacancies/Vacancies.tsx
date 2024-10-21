import { Vacancy } from '../../reducers/vacancies';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { VacancyCard } from './VacancyCard';
import styles from './Vacancies.module.scss';

interface VacanciesProps {
  vacancies: Vacancy[];
}

export function Vacancies({ vacancies }: VacanciesProps) {
  return (
    <section>
      <div className={styles.list}>
        {vacancies.map((v) => (
          <VacancyCard
            key={v.id}
            id={v.id}
            title={v.title}
            description={v.description}
            location={v.location}
            date={v.date}
            company={v.company}
            salary={v.salary}
            tags={v.tags}
            employmentType={v.employmentType}
            remoteFriendly={v.remoteFriendly} />
        ))}
      </div>
    </section>
  );
}

const mapStateToProps = (state: RootState) => ({
  vacancies: state.vacancies.top,
});

const connector = connect(mapStateToProps);

export default connector(Vacancies);
