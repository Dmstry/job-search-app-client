import { useEffect, useState, useCallback, useRef } from "react";
import { VacancyCard } from "./VacancyCard";
import { Container } from "@mui/system";
import { Grid, Typography, CircularProgress, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { getVacancies } from "../../api/vacancies";
import { Vacancy } from "../../api/types";

export function Vacancies() {
  const [page, setPage] = useState(1);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const initialFetchDone = useRef(false);
  const fetchInProgress = useRef(false);
  const limit = 18;
  const abortController = useRef<AbortController | null>(null);

  const fetchMoreVacancies = useCallback(async () => {
    if (isLoading || fetchInProgress.current) return;

    try {
      fetchInProgress.current = true;
      setIsLoading(true);
      const response = await getVacancies(page, limit);

      if (response.error) {
        setError(response.error);
        setHasMore(false);
        return;
      }

      const newVacancies = response.data;

      // Deduplicate vacancies based on _id
      setVacancies(prevVacancies => {
        const uniqueVacancies = [...prevVacancies];
        newVacancies.forEach(newVacancy => {
          if (!uniqueVacancies.some(v => v._id === newVacancy._id)) {
            uniqueVacancies.push(newVacancy);
          }
        });
        return uniqueVacancies;
      });

      if (newVacancies.length < limit) {
        setHasMore(false);
      }

      setPage(prevPage => prevPage + 1);
    } catch (error) {
      setError('Failed to fetch vacancies');
      setHasMore(false);
    } finally {
      setIsLoading(false);
      fetchInProgress.current = false;
    }
  }, [page, limit, isLoading]);

  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
      fetchMoreVacancies();
    }
  }, [fetchMoreVacancies]);

  // Reset state when component unmounts
  useEffect(() => {
    return () => {
      setVacancies([]);
      setPage(1);
      setHasMore(true);
      setError(null);
      initialFetchDone.current = false;
    };
  }, []);

  useEffect(() => {
    const controller = abortController.current;
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, []);

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pt: 1 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Актуальні вакансії
        </Typography>
        <Button
          component={RouterLink}
          to="/vacancies/create"
          variant="contained"
          color="primary"
        >
          Створити вакансію
        </Button>
      </Box>
      <InfiniteScroll
        dataLength={vacancies.length}
        next={fetchMoreVacancies}
        hasMore={hasMore && !isLoading}
        loader={<CircularProgress />}
        endMessage={<p style={{ textAlign: "center" }}>Більше вакансій немає</p>}
        style={{ overflow: "hidden" }}
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
