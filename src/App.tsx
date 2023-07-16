import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoutes from './app/private/PrivateRoutes';
import Home from './app/public/containers/home/Home';
import SignIn from './app/public/containers/signin/SignIn';
import SignUp from './app/public/containers/signup/SignUp';
import Question from './app/private/containers/question/Index';
import Record from './app/private/containers/record/Index';
import Appointment from './app/private/containers/appointment/Index';
import NotFound from './app/public/containers/not-found/NotFound';
import Profile from './app/private/containers/profile/Index';
import Account from './app/private/containers/account/Index';
import Doctors from './app/private/containers/doctors/Index';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Record />} path="/record/*" />
        <Route element={<Question />} path="/question/*" />
        <Route element={<Appointment />} path="/appointment/*" />
        <Route element={<Account />} path="/account/*" />
        <Route element={<Profile />} path="/profile/*" />
        <Route element={<Doctors />} path="/doctor/*" />
      </Route>
      <Route element={<Home />} path="/" />
      <Route element={<SignIn />} path="/signin" />
      <Route element={<SignUp />} path="/signup" />
      <Route element={<NotFound />} path="" />
    </Routes>
  );
};

export default App;

const DebugRouter = ({ children }: { children: any }) => {
  const location = useLocation();

  console.log(
    `Route: ${location.pathname}${location.search}, State: ${JSON.stringify(
      location.state,
    )}`,
  );

  return children;
};
