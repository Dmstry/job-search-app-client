import logo from './logosvg.svg';
import styles from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <ul>
          <li>
            <Link className={styles.link} to="/">Домашня</Link>
          </li>
          <li>
            <Link className={styles.link} to="/vacancies">Вакансії</Link>
          </li>
          <li>
            <Link className={styles.link} to="/resumes">Резюме</Link>
          </li>
          <li>
            <Link className={styles.link} to="/about">Про нас</Link>
          </li>
        </ul>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
