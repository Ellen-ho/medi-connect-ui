import { createContext } from 'react';

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  currentUser: {
    id: string;
    displayName: string;
    role: string;
  } | null;
  patientId: string | null;
  doctorId: string | null;
}

export type AuthAction =
  | {
      type: 'LOG_IN';
      payload: {
        token: string;
        currentUser: {
          id: string;
          displayName: string;
          role: string;
        };
        patientId: string;
        doctorId: string;
      };
    }
  | { type: 'LOG_OUT' };

interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const initialState = {
  isLoggedIn: false,
  token: null,
  currentUser: null,
  patientId: null,
  doctorId: null,
};

export const AuthContext = createContext<AuthContextProps>({
  state: initialState,
  dispatch: () => null,
});
