import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './app/private/PrivateRoutes';
import Home from './app/public/containers/home/Home';
import SignIn from './app/public/containers/signin/SignIn';
import SignUp from './app/public/containers/signup/SignUp';
import Question from './app/private/containers/question/Index';
import Record from './app/private/containers/record/Index';
import Appointment from './app/private/containers/appointment/Index';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Record />} path="/record/*" />
        <Route element={<Question />} path="/question/*" />
        <Route element={<Appointment />} path="/appointment/*" />
      </Route>
      <Route element={<Home />} path="/" />
      <Route element={<SignIn />} path="/signin" />
      <Route element={<SignUp />} path="/signup" />
    </Routes>
  );
};

export default App;
