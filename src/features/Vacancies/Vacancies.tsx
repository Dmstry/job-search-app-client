import { useEffect, useState } from 'react';
import { VacancyCard } from './VacancyCard';
import { Container } from '@mui/system';
import { Grid, Typography, CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Vacancy } from './vacanciesSlice';

export function Vacancies() {
  const [page, setPage] = useState(1);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 18;

  const fetchMoreVacancies = async () => {
    console.log(`Fetching page ${page}`);
    try {
      const response = await axios.get('http://localhost:8001/api/vacancies', {
        params: {
          page,
          limit,
        },
      });
      const newVacancies = response.data;

      if (newVacancies.length < limit) {
        setHasMore(false);
      }

      setVacancies((prevVacancies) => [...prevVacancies, ...newVacancies]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching more vacancies:', error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchMoreVacancies();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Актуальні вакансії
      </Typography>
      <InfiniteScroll
        dataLength={vacancies.length}
        next={fetchMoreVacancies}
        hasMore={hasMore}
        loader={<CircularProgress />}
        endMessage={<p style={{ textAlign: 'center' }}>Більше вакансій немає</p>}
        style={{ overflow: 'hidden' }}
      >
        <Grid container spacing={4}>
          {vacancies.map((v: Vacancy) => (
            <Grid item key={v._id} xs={12} sm={6} md={4}>
              <VacancyCard
                id={v._id}
                title={v.titleDetails.shortName}
                location={v.locationDetails.locality}
                employer={v.employerDetails.shortName}
                employmentType={v.employmentType}
                salary={v.salary}
                postedDate={v.postedDate}
                responsibilities={v.responsibilities}
              />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}
