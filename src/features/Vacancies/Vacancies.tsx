import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchVacancies } from '../../features/Vacancies/vacanciesSlice';
import { VacancyCard } from './VacancyCard';
import { Container } from '@mui/system';
import { Grid, Typography } from '@mui/material';

export function Vacancies() {
  const dispatch = useAppDispatch();
  const { vacancies, loading, error } = useAppSelector(
    (state) => state.vacancies
  );

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
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Актуальні вакансії
      </Typography>
      <Grid container spacing={4}>
        {vacancies.map((v) => (
          <Grid item key={v._id} xs={12} sm={6} md={4}>
            <VacancyCard
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
