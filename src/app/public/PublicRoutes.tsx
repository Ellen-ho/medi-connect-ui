import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getAuthFromCache } from '../../utils/getAuthFromCache';
import Layout from '../layout/Layout';

const PublicRoutes = () => {
  const location = useLocation();
  const { state } = useContext(AuthContext);

  const cachedAuth = getAuthFromCache();
  const isLoggedIn = cachedAuth && cachedAuth.isLoggedIn;

  return isLoggedIn ? (
    <Navigate to="/home" replace={true} state={{ from: location }} />
  ) : (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PublicRoutes;
