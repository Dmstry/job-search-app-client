import { useMemo, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { getPositions } from "../../api/vacancies";
import { VacancyFilters as VacancyFiltersType } from "../../api/vacancies";

interface Locality {
  _id: string;
  name: string;
  fullName: string;
  region: string;
  district: string;
  territorialCommunity: string;
}

interface Position {
  _id: string;
  shortName: string;
}

interface VacancyFiltersProps {
  filters: VacancyFiltersType;
  onFiltersChange: (filters: VacancyFiltersType) => void;
  localities: Locality[];
}

export function VacancyFilters({
  filters,
  onFiltersChange,
  localities,
}: VacancyFiltersProps) {
  const [positions, setPositions] = useState<Position[]>([]);

  // Fetching list of positions
  useEffect(() => {
    const fetchPositions = async () => {
      const response = await getPositions();
      if (response.data) {
        setPositions(response.data);
      } else {
        console.error("Failed to fetch positions:", response.error);
      }
    };
    fetchPositions();
  }, []);

  // Unique communities
  const uniqueCommunities = useMemo(() => {
    const uniqueSet = new Set(
      localities.map((locality) => locality.territorialCommunity)
    );
    return Array.from(uniqueSet).sort();
  }, [localities]);

  // Unique and sorted positions
  const uniqueSortedPositions = useMemo(() => {
    const uniquePositions = positions.reduce((acc, current) => {
      const exists = acc.find(item => item.shortName === current.shortName);
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, [] as Position[]);

    return uniquePositions.sort((a, b) =>
      a.shortName.localeCompare(b.shortName, 'uk')
    );
  }, [positions]);

  const handleFilterChange = (
    field: keyof VacancyFiltersType,
    value: string | undefined
  ) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  // Handler for changing the value
  const handleHigherEducationChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    onFiltersChange({
      ...filters,
      hasHigherEducation: newValue || undefined
    });
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: "1rem",
        width: "100%",
        maxWidth: "300px",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Фільтри
      </Typography>

      {/* Territorial community filter */}
      <Autocomplete
        value={filters.territorialCommunity || null}
        onChange={(_, newValue) =>
          handleFilterChange("territorialCommunity", newValue || undefined)
        }
        options={uniqueCommunities}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Територіальна громада"
            variant="outlined"
            size="small"
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option}>
            {option}
          </li>
        )}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option === value}
        fullWidth
        clearText="Очистити"
        noOptionsText="Немає результатів"
        loadingText="Завантаження..."
      />

      {/* Position filter */}
      <Autocomplete
        value={positions.find((pos) => pos._id === filters.title) || null}
        onChange={(_, newValue) =>
          handleFilterChange("title", newValue ? newValue._id : undefined)
        }
        options={uniqueSortedPositions}
        getOptionLabel={(option) => option.shortName}
        renderInput={(params) => (
          <TextField {...params} label="Посада" variant="outlined" size="small" />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option._id}>
            {option.shortName}
          </li>
        )}
        fullWidth
        clearText="Очистити"
        noOptionsText="Немає результатів"
        loadingText="Завантаження..."
        sx={{ marginTop: 2 }}
      />

      <ToggleButtonGroup
        value={filters.hasHigherEducation}
        exclusive
        onChange={handleHigherEducationChange}
        aria-label="вища освіта"
        size="small"
        sx={{ mt: 2 }}
      >
        <ToggleButton value="true" aria-label="потрібна вища освіта">
          З вищою освітою
        </ToggleButton>
        <ToggleButton value="false" aria-label="не потрібна вища освіта">
          Без вищої освіти
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Switch for experience */}
      <FormControlLabel
        control={
          <Switch
            checked={filters.noExperienceRequired === 'true'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onFiltersChange({
                ...filters,
                noExperienceRequired: event.target.checked ? 'true' : undefined
              });
            }}
          />
        }
        label="Без досвіду роботи"
        sx={{ mt: 2, display: 'block' }}
      />
    </Box>
  );
}
