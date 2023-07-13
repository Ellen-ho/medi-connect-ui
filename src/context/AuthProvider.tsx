import { useEffect, useReducer } from 'react';
import {
  AuthAction,
  AuthContext,
  AuthState,
  initialState,
} from './AuthContext';

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOG_IN':
      const udpatedState = {
        isLoggedIn: true,
        token: action.payload.token,
        currentUser: action.payload.currentUser,
        patientId: action.payload.patientId,
      };
      localStorage.setItem('auth', JSON.stringify(udpatedState));
      return {
        ...state,
        ...udpatedState,
      };
    case 'LOG_OUT':
      return {
        isLoggedIn: false,
        token: null,
        currentUser: null,
        patientId: null,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const cachedAuth = localStorage.getItem('auth');
    if (cachedAuth) {
      const { token, currentUser, patientId } = JSON.parse(cachedAuth);
      dispatch({ type: 'LOG_IN', payload: { token, currentUser, patientId } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
