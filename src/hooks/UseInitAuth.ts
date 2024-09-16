import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAuthFromCache } from '../utils/getAuthFromCache';
import { UserRoleType } from '../types/Users';
import { useNavigate } from 'react-router-dom';

const useInitAuth = () => {
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const cachedAuth = getAuthFromCache();
      const isLogin = cachedAuth != null && cachedAuth.isLoggedIn;

      if (isLogin) {
        dispatch({
          type: 'LOG_IN',
          payload: {
            token: cachedAuth.token as string,
            currentUser: cachedAuth.currentUser as {
              id: string;
              displayName: string;
              avatar: string;
              role: string;
            },
            patientId: cachedAuth.patientId as string,
            doctorId: cachedAuth.doctorId as string,
            hasProfile: cachedAuth.hasProfile as boolean,
          },
        });

        if (cachedAuth.currentUser !== null) {
          if (!cachedAuth.hasProfile) {
            if (cachedAuth.currentUser.role === UserRoleType.DOCTOR) {
              navigate('/profile/doctor', { replace: true });
            }
          } else if (cachedAuth.currentUser.role === UserRoleType.PATIENT) {
            navigate('/profile', { replace: true });
          }
        } else {
          navigate('/home', { replace: true });
        }
      } else {
        dispatch({
          type: 'LOG_OUT',
        });
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [dispatch]);

  return isLoading;
};

export default useInitAuth;
