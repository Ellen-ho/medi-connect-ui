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
import Notification from './app/private/containers/notification/Index';
import HealthGoal from './app/private/containers/goal/Index';
import useInitAuth from './hooks/UseInitAuth';
import OAuth from './app/public/containers/oauth/OAuth';
import PublicRoutes from './app/public/PublicRoutes';
import PersonalHome from './app/private/containers/home/Index';
import useSocketNotification from './hooks/UseSocketNotification';
import MailForReset from './app/public/containers/resetPassword/pages/MailForReset';
import PasswordReset from './app/public/containers/resetPassword/pages/PasswordReset';
import SignInDoctor from './app/public/containers/signin-doctor/SignInDoctor';
import LoadingComponent from './components/loading/Loading';
import Article from './app/public/containers/article/Article';
import TeamLanding from './app/public/containers/home/page/TeamLanding';

const App: React.FC = () => {
  const isLoading = useInitAuth();
  useSocketNotification();

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Record />} path="/record/*" />
        <Route element={<Question />} path="/question/*" />
        <Route element={<Appointment />} path="/appointment/*" />
        <Route element={<Account />} path="/account/*" />
        <Route element={<Profile />} path="/profile/*" />
        <Route element={<Doctors />} path="/doctor/*" />
        <Route element={<Notification />} path="/notification/*" />
        <Route element={<HealthGoal />} path="/health-goal/*" />
        <Route element={<PersonalHome />} path="/home" />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route element={<OAuth />} path="/oauth" />
        <Route element={<SignIn />} path="/signin" />
        <Route element={<SignInDoctor />} path="/signin-doctor" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<MailForReset />} path="/input-email" />
        <Route element={<PasswordReset />} path="/reset-password" />
      </Route>
      <Route element={<Article />} path="/article/*" />
      <Route element={<TeamLanding />} path="/team" />
      <Route element={<Home />} path="/" />
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
