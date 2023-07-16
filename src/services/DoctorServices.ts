import queryString from 'query-string';
import { IAddress, IDoctor } from '../types/Doctors';
import { GenderType, MedicalSpecialtyType } from '../types/Share';
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

interface IGetDoctorProfileResponse {
  id: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
  gender: GenderType;
  aboutMe: string;
  languagesSpoken: string[];
  specialties: MedicalSpecialtyType[];
  careerStartDate: Date;
  officePracticalLocation: IAddress;
  education: string[];
  awards: string[] | null;
  affiliations: string[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetDoctorItem {
  id: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
  specialties: MedicalSpecialtyType[];
}

interface IGetDoctorsRequest {
  query: {
    page: number;
    limit: number;
    specialties?: MedicalSpecialtyType;
  };
}

export interface IGetDoctorsResponse {
  data: Array<IGetDoctorItem>;
  pagination: {
    pages: number[];
    totalPage: number;
    currentPage: number;
    prev: number;
    next: number;
  };
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

export const getDoctorProfile =
  async (): Promise<IGetDoctorProfileResponse> => {
    const response = await api.get<IGetDoctorProfileResponse>(
      '/doctors/profile',
    );
    return response.data;
  };

export const getDoctorStatistic = async (
  data: IGetDoctorStatisticRequest,
): Promise<IGetDoctorStatisticResponse> => {
  const response = await api.get<IGetDoctorStatisticResponse>(
    `/doctors/${data.doctorId}/statistic`,
  );
  return response.data;
};

// BE TODO: new endpoint needed
export const getDoctors = async (
  data: IGetDoctorsRequest,
): Promise<IGetDoctorsResponse> => {
  const queries = queryString.stringify(data.query);
  const response = await api.get<IGetDoctorsResponse>('/doctors');
  return response.data;
};
