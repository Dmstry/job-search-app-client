import { Link } from 'react-router-dom';
import logo from '../../logo.svg'; // Імпортуємо логотип React як заглушку
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import WorkIcon from '@mui/icons-material/Work';

interface VacancyCardProps {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  company: string;
  salary: string;
  tags?: string[];
  employmentType: string;
  remoteFriendly: boolean;
}

export function VacancyCard({
  id,
  title,
  description,
  location,
  date,
  company,
  salary,
  tags = [],
  employmentType,
  remoteFriendly,
}: VacancyCardProps) {
  // Форматування дати у дд-мм-рррр
  const formattedDate = new Date(date).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return (
    <Card sx={{ maxWidth: 400, margin: "1rem" }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <img src={logo} alt="Company Logo" style={{ width: 40, marginRight: 10 }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton>
            <WorkIcon color="primary" />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {company} | {location}
          {remoteFriendly && " | Remote Friendly"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          Заробітна Плата: {salary}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Тип Зайнятості: {employmentType}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ marginTop: 2 }}>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
          Теги: {tags.join(", ")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
          Дата: {formattedDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/vacancies/${id}`}>
          Детальніше
        </Button>
        <Button size="small" color="primary">
          Зберегти
        </Button>
      </CardActions>
    </Card>
  );
}
