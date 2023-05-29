import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './app/public/Home';
import SignIn from './app/public/SignIn';
import SignUp from './app/public/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
