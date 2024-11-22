import { Box, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { VacancySorts } from "../../api/vacancies";

interface VacancySortsProps {
  sorts: VacancySorts;
  onSortsChange: (sorts: VacancySorts) => void;
}

export function VacancySortsComponent({ sorts, onSortsChange }: VacancySortsProps) {
  const handleSortChange = (field: keyof VacancySorts, value: string) => {
    onSortsChange({
      ...sorts,
      [field]: value as VacancySorts[keyof VacancySorts],
    });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      {/* Лейбел для сортування */}
      <Typography variant="subtitle1" sx={{ whiteSpace: "nowrap" }}>
        Сортувати за:
      </Typography>

      {/* Сортування за датою */}
      <FormControl size="small" sx={{ minWidth: 130 }}>
        <InputLabel>датою</InputLabel>
        <Select
          value={sorts.sort === "date_asc" || sorts.sort === "date_desc" ? sorts.sort : ""}
          label="Датою"
          onChange={(e) => handleSortChange("sort", e.target.value)}
        >
          <MenuItem value="date_asc">Раніше</MenuItem>
          <MenuItem value="date_desc">Пізніше</MenuItem>
        </Select>
      </FormControl>

      {/* Сортування за зарплатою */}
      <FormControl size="small" sx={{ minWidth: 130 }}>
        <InputLabel>зарплатою</InputLabel>
        <Select
          value={sorts.sort === "salary_asc" || sorts.sort === "salary_desc" ? sorts.sort : ""}
          label="Зарплатою"
          onChange={(e) => handleSortChange("sort", e.target.value)}
        >
          <MenuItem value="salary_asc">Менша</MenuItem>
          <MenuItem value="salary_desc">Більша</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
