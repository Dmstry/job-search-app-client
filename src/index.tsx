import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { About } from './features/About/About';
import Vacancies from './features/Vacancies/Vacancies';
import { Provider } from 'react-redux';
import store from './store';
import { Resumes } from './features/Resumes/Resumes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Provider store={store}><App /></Provider>,
    children: [
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/vacancies',
        element: <Vacancies />,
      },
      {
        path: '/resumes',
        element: <Resumes />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
