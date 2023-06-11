import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import PrivateRoutes from './app/private/PrivateRoutes';
import Record from './app/private/containers/record/Record';
import Home from './app/public/containers/home/Home';
import SignIn from './app/public/containers/signin/SignIn';
import SignUp from './app/public/containers/signup/SignUp';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Record />} path="/record" />
        </Route>
        <Route element={<Home />} path="/" />
        <Route element={<SignIn />} path="/signin" />
        <Route element={<SignUp />} path="/signup" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
