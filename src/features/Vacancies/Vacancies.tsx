import { useEffect, useState, useCallback, useRef } from "react";
import { VacancyCard } from "./VacancyCard";
import { Container } from "@mui/system";
import { Grid, Typography, CircularProgress, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { getVacancies, VacancySorts } from "../../api/vacancies";
import { Vacancy } from "../../api/types";
import { VacancySortsComponent } from "./VacancySorts";

export function Vacancies() {
  const [page, setPage] = useState(1);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sorts, setSorts] = useState<VacancySorts>({});
  const fetchInProgress = useRef(false);
  const initialSortRef = useRef(false);
  const limit = 18;

  const fetchMoreVacancies = useCallback(
    async (reset = false) => {
      if (isLoading || fetchInProgress.current) return;

      try {
        fetchInProgress.current = true;
        setIsLoading(true);

        const response = await getVacancies(reset ? 1 : page, limit, sorts);

        if (response.error) {
          setError(response.error);
          setHasMore(false);
          return;
        }

        const newVacancies = response.data;

        setVacancies((prevVacancies) =>
          reset ? newVacancies : [...prevVacancies, ...newVacancies]
        );

        if (newVacancies.length < limit) {
          setHasMore(false);
        }

        setPage((prevPage) => (reset ? 2 : prevPage + 1));
      } catch (error) {
        setError("Failed to fetch vacancies");
        setHasMore(false);
      } finally {
        setIsLoading(false);
        fetchInProgress.current = false;
      }
    },
    [page, limit, sorts, isLoading]
  );

  useEffect(() => {
    if (!initialSortRef.current) {
      initialSortRef.current = true;
      fetchMoreVacancies(true);
    }
  }, [fetchMoreVacancies]);

  useEffect(() => {
    fetchMoreVacancies(true);
  }, [sorts]);

  const handleSortChange = (updatedSorts: VacancySorts) => {
    setSorts(updatedSorts);
  };

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
    <Container sx={{ py: 8, overflow: "visible" }} maxWidth="lg">
      <Box
        sx={{
          position: "sticky",
          top: { xs: "56px", sm: "64px" }, // Відступ, враховуючи висоту AppBar
          zIndex: 1100,
          backgroundColor: "white",
          py: 1,
          mb: 2,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" sx={{ whiteSpace: "nowrap", mr: 2 }}>
            Актуальні вакансії
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flex: 1, justifyContent: "center" }}>
            <VacancySortsComponent sorts={sorts} onSortsChange={handleSortChange} />
          </Box>
          <Button component={RouterLink} to="/vacancies/create" variant="contained" color="primary">
            Створити вакансію
          </Button>
        </Box>
      </Box>
      <InfiniteScroll
        dataLength={vacancies.length}
        next={() => fetchMoreVacancies(false)}
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
