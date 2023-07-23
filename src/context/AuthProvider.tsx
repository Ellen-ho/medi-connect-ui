import { useEffect, useReducer } from 'react';
import {
  AuthAction,
  AuthContext,
  AuthState,
  initialState,
} from './AuthContext';

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOG_IN': {
      const udpatedState = {
        isLoggedIn: true,
        token: action.payload.token,
        currentUser: action.payload.currentUser,
        patientId: action.payload.patientId,
        doctorId: action.payload.doctorId,
      };
      localStorage.setItem('auth', JSON.stringify(udpatedState));
      return {
        ...state,
        ...udpatedState,
      };
    }
    case 'LOG_OUT': {
      const udpatedState = {
        isLoggedIn: false,
        token: null,
        currentUser: null,
        patientId: null,
        doctorId: null,
      };
      localStorage.setItem('auth', JSON.stringify(udpatedState));
      return {
        ...state,
        ...udpatedState,
      };
    }
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   const cachedAuth = localStorage.getItem('auth');
  //   const isLogin = cachedAuth && JSON.parse(cachedAuth).isLoggedIn;

  //   if (isLogin) {
  //     const { token, currentUser, patientId, doctorId } =
  //       JSON.parse(cachedAuth);
  //     dispatch({
  //       type: 'LOG_IN',
  //       payload: { token, currentUser, patientId, doctorId },
  //     });
  //   } else {
  //     dispatch({
  //       type: 'LOG_OUT',
  //     });
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
