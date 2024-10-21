import { Link } from "react-router-dom";
import styles from "./VacancyCard.module.scss";
import logo from "../../logo.svg"; // Імпортуємо логотип React як заглушку

interface VacancyCardProps {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  company: string;
  salary: string;
  tags: string[];
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
  tags,
  employmentType,
  remoteFriendly,
}: VacancyCardProps) {
  return (
    <div className={styles.card}>
      <img src={logo} alt="Company Logo" className={styles.logo} />
      <Link to={`/vacancies/${id}`} className={styles.title}>{title}</Link>
      <div className={styles.company}><strong>Компанія:</strong> {company}</div>
      <div className={styles.location}><strong>Місто:</strong> {location} {remoteFriendly && "| Remote Friendly"}</div>
      <div className={styles.salary}><strong>Заробітна плата:</strong> {salary}</div>
      <div className={styles.employmentType}><strong>Тип зайнятості:</strong> {employmentType}</div>
      <div className={styles.date}><strong>Дата публікації:</strong> {date}</div>
      <div className={styles.description}><strong>Опис:</strong> {description}</div>
      <div className={styles.tags}><strong>Навички:</strong> {tags.join(', ')}</div>
    </div>
  );
}
