import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVacancyById } from '../../api/vacancies';
import { Vacancy } from '../../api/types';
import { Container, Typography, Paper, Grid, Divider, Box, CircularProgress } from '@mui/material';

export function VacancyDetails() {
  const { id } = useParams<{ id: string }>();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancy = async () => {
      if (!id) return;

      try {
        const response = await getVacancyById(id);
        if (response.error) {
          setError(response.error);
        } else {
          setVacancy(response.data);
        }
      } catch (err) {
        setError('Failed to fetch vacancy details');
      } finally {
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!vacancy) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography align="center">
          Вакансію не знайдено
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, p: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {vacancy.titleDetails.name}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Основна інформація
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography><strong>Роботодавець:</strong> {vacancy.employerDetails.name}</Typography>
              <Typography><strong>Місце роботи:</strong> {vacancy.locationDetails.locality}</Typography>
              <Typography><strong>Заробітна плата:</strong> {vacancy.salary} грн</Typography>
              <Typography><strong>Тип зайнятості:</strong> {vacancy.employmentType}</Typography>
            </Box>

            <Typography variant="h6" gutterBottom>
              Обов'язки
            </Typography>
            <Typography paragraph>{vacancy.responsibilities}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Вимоги до кандидата
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography><strong>Освіта:</strong> {vacancy.educationRequirements}</Typography>
              <Typography>
                <strong>Вища освіта:</strong> {vacancy.hasHigherEducation ? 'Так' : 'Ні'}
              </Typography>
              {vacancy.hasHigherEducation && (
                <Typography><strong>Ступінь:</strong> {vacancy.educationDegree}</Typography>
              )}
              <Typography>
                <strong>Досвід роботи:</strong> {vacancy.hasExperience ? vacancy.experience : 'Без досвіду'}
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom>
              Контактна інформація
            </Typography>
            <Box>
              <Typography><strong>Телефон:</strong> {vacancy.contactDetails.phone}</Typography>
              {vacancy.contactDetails.phoneHR && (
                <Typography><strong>HR телефон:</strong> {vacancy.contactDetails.phoneHR}</Typography>
              )}
              {vacancy.contactDetails.email && (
                <Typography><strong>Email:</strong> {vacancy.contactDetails.email}</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 