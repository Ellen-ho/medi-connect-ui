import queryString from 'query-string';
import { IAddress, IDoctor } from '../types/Doctors';
import { GenderType, MedicalSpecialtyType } from '../types/Share';
import api from './ApiService';

interface ICreateDoctorProfileRequest extends IDoctor {}

interface ICreateDoctorProfileResponse {
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

export const getDoctorProfile = async (
  id: string,
): Promise<IGetDoctorProfileResponse> => {
  const response = await api.get<IGetDoctorProfileResponse>(
    `/doctors/${id}/profile`,
  );
  return response.data;
};

export const getDoctorStatistic = async (
  id: string,
): Promise<IGetDoctorStatisticResponse> => {
  const response = await api.get<IGetDoctorStatisticResponse>(
    `/doctors/${id}/statistic`,
  );
  return response.data;
};

export const getDoctors = async (
  data: IGetDoctorsRequest,
): Promise<IGetDoctorsResponse> => {
  const queries = queryString.stringify(data.query);
  const response = await api.get<IGetDoctorsResponse>(`/doctors?${queries}`);
  return response.data;
};
