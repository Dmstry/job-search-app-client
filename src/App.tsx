import logo from './logosvg.svg';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { AppBar, createTheme, CssBaseline, Link, ThemeProvider, Toolbar, Typography } from '@mui/material';

function HeaderLink({
  children,
  to,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      component={RouterLink}
      to={to}
      variant="button"
      color="inherit"
      sx={{ my: 1, mx: 1.5 }}
    >
      {children}
    </Link>
  );
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#202062',
    },
    secondary: {
      main: '#edc936',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <img src={logo} alt="logo" />
          <Typography variant="h5" color='inherit' noWrap>HRnet</Typography>
          <nav>
            <HeaderLink to="/">Домашня</HeaderLink>
            <HeaderLink to="/vacancies">Вакансії</HeaderLink>
            <HeaderLink to="/resumes">Резюме</HeaderLink>
            <HeaderLink to="/about">Про нас</HeaderLink>
          </nav>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
