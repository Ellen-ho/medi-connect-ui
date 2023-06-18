import { MedicalSpecialtyType } from '../types/Share';
import api from './ApiService';

interface ICreateQuestionRequest {
  content: string;
  medicalSpecialty: MedicalSpecialtyType;
}

interface ICreateQuestionResponse {
  id: string;
  content: string;
  medicalSpecialty: MedicalSpecialtyType;
  createdAt: Date;
  updatedAt: Date;
}

export const createQuestion = async (
  data: ICreateQuestionRequest,
): Promise<ICreateQuestionResponse> => {
  const response = await api.post<ICreateQuestionResponse>('/questions', data);
  return response.data;
};
