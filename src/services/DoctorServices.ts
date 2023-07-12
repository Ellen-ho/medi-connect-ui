import { IDoctor } from '../types/Doctors';
import api from './ApiService';

interface ICreateDoctorProfileRequest extends IDoctor {}

interface ICreateDoctorProfileResponse {
  id: string;
  createdAt: Date;
}

interface IEditDoctorProfileRequest extends IDoctor {}

interface IEditDoctorProfileResponse extends IDoctor {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IGetDoctorStatisticRequest {
  doctorId: string;
}

interface IGetDoctorStatisticResponse {
  id: string;
  answerCounts: number;
  thankedCounts: number;
  beAgreedCounts: number;
}

export const createDoctorProfile = async (
  data: ICreateDoctorProfileRequest,
): Promise<ICreateDoctorProfileResponse> => {
  const response = await api.post<ICreateDoctorProfileResponse>(
    '/doctors/profile',
    data,
  );
  return response.data;
};

export const editDoctorProfile = async (
  data: IEditDoctorProfileRequest,
): Promise<IEditDoctorProfileResponse> => {
  const response = await api.patch<IEditDoctorProfileResponse>(
    '/doctors/profile',
    data,
  );
  return response.data;
};

export const getDoctorStatistic = async (
  data: IGetDoctorStatisticRequest,
): Promise<IGetDoctorStatisticResponse> => {
  const response = await api.post<IGetDoctorStatisticResponse>(
    `/doctors/${data.doctorId}/statistic`,
  );
  return response.data;
};
