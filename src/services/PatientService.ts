import queryString from 'query-string';
import { IPatient } from '../types/Patients';
import api from './ApiService';

interface ICreatePatientProfileRequest extends IPatient {}

interface ICreatePatientProfileResponse extends IPatient {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEditPatientProfileRequest extends IPatient {}

interface IEditPatientProfileResponse extends IPatient {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IGetPatientProfileRequest {
  query: {
    targetPatientId: string;
  };
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

export const getPatientProfile = async ({
  query,
}: IGetPatientProfileRequest): Promise<IGetPatientProfileResponse> => {
  const queries = queryString.stringify(query);
  const response = await api.get<IGetPatientProfileResponse>(
    `/patients/profile?${queries}`,
  );
  return response.data;
};
