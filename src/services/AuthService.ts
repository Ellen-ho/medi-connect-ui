import api from './apiService';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    createdAt: string;
    displayName: string;
    role: string;
  };
}

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/users/login', data);
  return response.data;
};

interface SignupRequest {
  displayName: string;
  email: string;
  password: string;
  role: string;
}

interface SignupResponse {
  id: string;
  displayName: string;
  email: string;
  role: string;
}

export const signupUser = async (
  data: SignupRequest,
): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>('/users', data);
  return response.data;
};
