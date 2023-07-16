import { IPatient } from '../types/Patients';
import api from './ApiService';

interface ICreatePatientProfileRequest extends IPatient {}

interface ICreatePatientProfileResponse {
  id: string;
  createdAt: Date;
}

export interface IEditPatientProfileRequest extends IPatient {}

interface IEditPatientProfileResponse extends IPatient {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IGetPatientProfileResponse extends IPatient {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createPatientProfile = async (
  data: ICreatePatientProfileRequest,
): Promise<ICreatePatientProfileResponse> => {
  const response = await api.post<ICreatePatientProfileResponse>(
    '/patients/profile',
    data,
  );
  return response.data;
};

export const editPatientProfile = async (
  data: IEditPatientProfileRequest,
): Promise<IEditPatientProfileResponse> => {
  const response = await api.patch<IEditPatientProfileResponse>(
    '/patients/profile',
    data,
  );
  return response.data;
};

export const getPatientProfile =
  async (): Promise<IGetPatientProfileResponse> => {
    const response = await api.get<IGetPatientProfileResponse>(
      '/patients/profile',
    );
    return response.data;
  };
