import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getAuthFromCache } from '../../utils/getAuthFromCache';

const PrivateRoutes = () => {
  const location = useLocation();
  const { state } = useContext(AuthContext);

  const cachedAuth = getAuthFromCache();
  const isLoggedIn = cachedAuth && cachedAuth.isLoggedIn;

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace={true} state={{ from: location }} />
  );
};

export default PrivateRoutes;
