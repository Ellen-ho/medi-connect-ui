import { MedicalSpecialtyType } from '../types/Share';
import api from './ApiService';

export interface IGetDoctorsResponse {
  doctorData: Array<{
    id: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
    specialties: MedicalSpecialtyType[];
  }>;
}

export const getDoctors = async (): Promise<IGetDoctorsResponse> => {
  try {
    const response = await api.get<IGetDoctorsResponse>(
      '/commons/load_doctors',
    );
    console.log('API Response:', response); // Log response data
    return response.data;
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    throw error;
  }
};
