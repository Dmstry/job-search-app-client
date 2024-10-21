import { Link } from "react-router-dom";


interface VacancyCardProps {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  company: string;
  salary: number;
  tags: string[];
}

export function VacancyCard({
  id,
  title,
  description,
  location,
  date,
  company,
  salary,
  tags,
}: VacancyCardProps) {
  return (
    <div className="Vacancies-card">
      <Link to={`/vacancies/${id}`}>{title}</Link>
      <div className="Vacancies-card-desc">{description}</div>
      <div>{location}</div>
      <div>{date}</div>
      <div>{company}</div>
      <div className="Vacansies-card-salary">{salary}</div>
      <div>{tags}</div>
    </div>
  );
}
