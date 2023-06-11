import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoutes = () => {
  const { state } = useContext(AuthContext);

  return state.isLoggedIn ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoutes;
