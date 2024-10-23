import { Link } from "react-router-dom";
import styles from "./VacancyCard.module.scss";
import logo from "../../logo.svg"; // Імпортуємо логотип React як заглушку

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
  const formattedDate = new Date(date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div className={styles.card}>
      <img src={logo} alt="Company Logo" className={styles.logo} />
      <Link to={`/vacancies/${id}`} className={styles.title}>{title}</Link>
      <div className={styles.company}><strong>Компанія:</strong> {company}</div>
      <div className={styles.location}><strong>Місто:</strong> {location} {remoteFriendly && "| Remote Friendly"}</div>
      <div className={styles.salary}><strong>Заробітна плата:</strong> {salary}</div>
      <div className={styles.employmentType}><strong>Тип зайнятості:</strong> {employmentType}</div>
      <div className={styles.date}><strong>Дата публікації:</strong> {formattedDate}</div>
      <div className={styles.description}><strong>Опис:</strong> {description}</div>
      <div className={styles.tags}>
        {/* Перевіряємо, чи tags є масивом перед використанням */}
        {Array.isArray(tags) ? tags.join(", ") : ""}<strong>Навички:</strong> {tags.join(', ')}</div>
    </div>
  );
}
