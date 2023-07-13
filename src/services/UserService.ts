import api from './ApiService';

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  user: {
    id: string;
    createdAt: string;
    displayName: string;
    role: string;
  };
  patientId: string;
}

interface ISignupRequest {
  displayName: string;
  email: string;
  password: string;
  role: string;
}

interface ISignupResponse {
  id: string;
  displayName: string;
  email: string;
  role: string;
}

export const loginUser = async (
  data: ILoginRequest,
): Promise<ILoginResponse> => {
  const response = await api.post<ILoginResponse>('/users/login', data);
  return response.data;
};

export const signupUser = async (
  data: ISignupRequest,
): Promise<ISignupResponse> => {
  const response = await api.post<ISignupResponse>('/users', data);
  return response.data;
};
