import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Edit from '../pages/Edit';
import Login from '../pages/Login';
import Register from '../pages/Register';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/editar/:id',
    element: <Edit />
  },
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/cadastro',
    element: <Register />
  }
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;