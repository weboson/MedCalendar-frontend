import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Recipes from '../pages/Recipes';
import Mealschedules from '../pages/Mealschedules';
import AuthPage from '../pages/AuthPage';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'; // условие: если авторизованы то показываем страницы, если нет - то показывает сообщение, чтобы вошли

export const router = createBrowserRouter([
  {
    path: `${import.meta.env.BASE_URL}`, //! `${import.meta.env.BASE_URL} - это значение из "vite.config.ts" == /MedCalendar-frontend
    element: <Layout />, // используется главный шаблон (Lauout.tsx), где header, monitor, <Outlet> и к примеру, footer
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: `${import.meta.env.BASE_URL}/recipes`,
        element: (
          <ProtectedRoute>
            <Recipes />
          </ProtectedRoute>
        ),
      },
      {
        path: `${import.meta.env.BASE_URL}/mealschedules`,
        element: (
          <ProtectedRoute>
            <Mealschedules />
          </ProtectedRoute>
        ),
      },
      {
        path: `${import.meta.env.BASE_URL}/auth`,
        element: <AuthPage />,
      },
    ],
  },
]);
