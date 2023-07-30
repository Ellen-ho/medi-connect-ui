import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAuthFromCache } from '../utils/getAuthFromCache';

const useInitAuth = () => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
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
            role: string;
          },
          patientId: cachedAuth.patientId as string,
          doctorId: cachedAuth.doctorId as string,
        },
      });
    } else {
      dispatch({
        type: 'LOG_OUT',
      });
    }
  }, [dispatch]);
};

export default useInitAuth;
