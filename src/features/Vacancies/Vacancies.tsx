import { useEffect, useState, useCallback, useRef } from "react";
import { VacancyCard } from "./VacancyCard";
import { Container } from "@mui/system";
import { Grid, Typography, CircularProgress, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { getVacancies, VacancySorts, VacancyFilters as VacancyFiltersType, getLocalities } from "../../api/vacancies";
import { Vacancy } from "../../api/types";
import { VacancySortsComponent } from "./VacancySorts";
import { VacancyFilters } from "./VacancyFilters";

export function Vacancies() {
  const [page, setPage] = useState(1);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sorts, setSorts] = useState<VacancySorts>({});
  const [filters, setFilters] = useState<VacancyFiltersType>({});
  const [localities, setLocalities] = useState<{ _id: string; territorialCommunity: string }[]>([]);
  const fetchInProgress = useRef(false);
  const limit = 18;

  // Fetch localities for filters
  useEffect(() => {
    const fetchLocalities = async () => {
      try {
        const response = await getLocalities();
        if (response.error) {
          console.error('Error fetching localities:', response.error);
          return;
        }
        setLocalities(response.data);
      } catch (error) {
        console.error('Failed to fetch localities:', error);
      }
    };

    fetchLocalities();
  }, []);

  const fetchMoreVacancies = useCallback(
    async (reset = false) => {
      if (isLoading || fetchInProgress.current) return;

      try {
        fetchInProgress.current = true;
        setIsLoading(true);

        const currentPage = reset ? 1 : page;
        const response = await getVacancies(currentPage, limit, sorts, filters);

        if (response.error) {
          setError(response.error);
          setHasMore(false);
          return;
        }

        const newVacancies = response.data;

        setVacancies(prevVacancies => {
          if (reset) {
            return newVacancies;
          }
          const existingIds = new Set(prevVacancies.map(v => v._id));
          const uniqueNewVacancies = newVacancies.filter(v => !existingIds.has(v._id));
          return [...prevVacancies, ...uniqueNewVacancies];
        });

        setHasMore(newVacancies.length === limit);

        if (!reset) {
          setPage(prevPage => prevPage + 1);
        } else {
          setPage(2);
        }
      } catch (error) {
        setError("Failed to fetch vacancies");
        setHasMore(false);
      } finally {
        setIsLoading(false);
        fetchInProgress.current = false;
      }
    },
    [limit, sorts, filters, isLoading, page]
  );

  useEffect(() => {
    const resetAndFetch = async () => {
      setVacancies([]);
      setPage(1);
      await fetchMoreVacancies(true);
    };

    resetAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorts, filters]);

  const handleSortChange = (updatedSorts: VacancySorts) => {
    setSorts(updatedSorts);
    setPage(1);
  };

  const handleFiltersChange = (updatedFilters: VacancyFiltersType) => {
    setFilters(updatedFilters);
    setPage(1);
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
      <Grid container spacing={3}>
        {/* Filters Section */}
        <Grid item xs={12} md={3}>
          <VacancyFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            localities={localities.map(locality => ({
              _id: locality._id,
              name: locality.territorialCommunity,
              fullName: locality.territorialCommunity,
              region: '',
              district: '',
              territorialCommunity: locality.territorialCommunity
            }))}
          />
        </Grid>

        {/* Vacancies Section */}
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              position: "sticky",
              top: { xs: "56px", sm: "64px" },
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
              <Box sx={{ display: "flex", gap: 1.5, flex: 1, justifyContent: "center", mr: 2 }}>
                <VacancySortsComponent sorts={sorts} onSortsChange={handleSortChange} />
              </Box>
              <Button
                component={RouterLink}
                to="/vacancies/create"
                variant="contained"
                color="primary"
                sx={{ textAlign: "center" }}
              >
                Додати вакансію
              </Button>
            </Box>
          </Box>
          <InfiniteScroll
            dataLength={vacancies.length}
            next={() => fetchMoreVacancies(false)}
            hasMore={hasMore && !isLoading}
            loader={<CircularProgress />}
            endMessage={<p style={{ textAlign: "center", marginTop: "30px" }}>Більше вакансій немає</p>}
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
        </Grid>
      </Grid>
    </Container>
  );
}
