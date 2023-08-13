import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getAuthFromCache } from '../../utils/getAuthFromCache';

const PublicRoutes = () => {
  const location = useLocation();
  const { state } = useContext(AuthContext);

  const cachedAuth = getAuthFromCache();
  const isLoggedIn = cachedAuth && cachedAuth.isLoggedIn;

  return isLoggedIn ? (
    <Navigate to="/" replace={true} state={{ from: location }} />
  ) : (
    <Outlet />
  );
};

export default PublicRoutes;
