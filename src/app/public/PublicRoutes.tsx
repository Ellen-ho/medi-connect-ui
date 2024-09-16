import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getAuthFromCache } from '../../utils/getAuthFromCache';
import Layout from '../layout/Layout';
import { UserRoleType } from '../../types/Users';

const PublicRoutes = () => {
  const location = useLocation();
  const { state } = useContext(AuthContext);

  const cachedAuth = getAuthFromCache();
  const isLoggedIn = cachedAuth && cachedAuth.isLoggedIn;
  const hasProfile = cachedAuth?.hasProfile ?? false;
  const userRole = cachedAuth?.currentUser?.role;

  if (isLoggedIn) {
    if (!hasProfile) {
      if (userRole === UserRoleType.DOCTOR) {
        return (
          <Navigate
            to="/profile/doctor"
            replace={true}
            state={{ from: location }}
          />
        );
      } else if (userRole === UserRoleType.PATIENT) {
        return (
          <Navigate to="/profile" replace={true} state={{ from: location }} />
        );
      }
    } else {
      return <Navigate to="/home" replace={true} state={{ from: location }} />;
    }
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PublicRoutes;
