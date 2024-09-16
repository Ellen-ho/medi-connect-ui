import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import React from 'react';
import HomeLanding from './page/HomeLanding';
import HomeLandingLayout from '../../../layout/HomeLandingLayout';

const Home: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isLoggedIn = state.isLoggedIn;
  const hasProfile = state.hasProfile;

  if (isLoggedIn) {
    if (hasProfile) {
      return <Navigate to="/home" replace />;
    } else {
      return <Navigate to="/profile" replace />;
    }
  }

  return (
    <HomeLandingLayout>
      <HomeLanding />
    </HomeLandingLayout>
  );
};

export default Home;
