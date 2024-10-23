import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchVacancies } from '../../features/Vacancies/vacanciesSlice';
import { VacancyCard } from './VacancyCard';
import "./Vacancies.module.scss";

export function Vacancies() {
  const dispatch = useAppDispatch();
  const { vacancies, loading, error } = useAppSelector((state) => state.vacancies);

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <div className="Vacancies-list">
        {vacancies.map((v) => (
          <VacancyCard
            key={v._id}
            id={v._id}
            title={v.title}
            description={v.description}
            location={v.location}
            date={v.date}
            company={v.company}
            salary={v.salary}
            tags={v.tags}
            employmentType={v.employmentType}
            remoteFriendly={v.remoteFriendly}
          />
        ))}
      </div>
    </section>
  );
}
