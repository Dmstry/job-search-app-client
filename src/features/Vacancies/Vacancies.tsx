import { useEffect, useState, useCallback } from "react";
import { VacancyCard } from "./VacancyCard";
import { Container } from "@mui/system";
import { Grid, Typography, CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { getVacancies } from "../../api/vacancies";
import { Vacancy } from "../../api/types";

export function Vacancies() {
  const [page, setPage] = useState(1);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 18;

  const fetchMoreVacancies = useCallback(async () => {
    try {
      const response = await getVacancies(page, limit);

      if (response.error) {
        setError(response.error);
        setHasMore(false);
        return;
      }

      const newVacancies = response.data;

      if (newVacancies.length < limit) {
        setHasMore(false);
      }

      setVacancies((prevVacancies) => [...prevVacancies, ...newVacancies]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError('Failed to fetch vacancies');
      setHasMore(false);
    }
  }, [page, limit]);

  const loggedIn = true;

  useEffect(() => {
    fetchMoreVacancies();
  }, [fetchMoreVacancies]);

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
      <Typography variant="h4" align="center" gutterBottom>
        Актуальні вакансії
      </Typography>
      <InfiniteScroll
        dataLength={vacancies.length}
        next={fetchMoreVacancies}
        hasMore={hasMore}
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
                enableUserActions={loggedIn}
              />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}
