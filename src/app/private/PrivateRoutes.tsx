import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoutes = () => {
  const { state } = useContext(AuthContext);
  console.log(state.isLoggedIn);
  return state.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace={true} />
  );
};

export default PrivateRoutes;
