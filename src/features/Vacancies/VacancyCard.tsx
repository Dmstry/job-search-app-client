import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import logo from '../../logo.svg';

interface Props {
  id: string;
  title: string;
  location: string;
  employer: string;
  employmentType: string;
  salary: number;
  postedDate: string;
  responsibilities: string;
}

export function VacancyCard({ id, title, location, employer, employmentType, salary, postedDate, responsibilities }: Props) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia component="img" sx={{ height: 60, width: 60, margin: '0 auto', objectFit: 'contain' }} image={logo} alt="Employer logo" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Роботодавець: {employer}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Місце роботи: {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Заробітна плата: {salary}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Тип зайнятості: {employmentType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {responsibilities.substring(0, 60)}...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Дата публікації: {new Date(postedDate).toLocaleDateString('uk-UA')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={RouterLink} to={`/vacancies/${id}`} color="secondary">
          Детальніше
        </Button>
      </CardActions>
    </Card>
  );
}
