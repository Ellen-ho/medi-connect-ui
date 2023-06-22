import { MedicalSpecialtyType } from '../types/Share';
import queryString from 'query-string';
import api from './ApiService';
import { IQuestion } from '../types/Questions';

interface IGetQuestionsRequest {
  query: {
    page: number;
    limit: number;
  };
}

interface IGetQuestionsResponse {
  data: Array<IQuestion>;
  pagination: {
    pages: number[];
    totalPage: number;
    currentPage: number;
    prev: number;
    next: number;
  };
}

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

export const getQuestions = async (
  data: IGetQuestionsRequest,
): Promise<IGetQuestionsResponse> => {
  const queries = queryString.stringify(data.query);
  const response = await api.get<IGetQuestionsResponse>(
    `/questions?${queries}`,
  );
  return response.data;
};

export const createQuestion = async (
  data: ICreateQuestionRequest,
): Promise<ICreateQuestionResponse> => {
  const response = await api.post<ICreateQuestionResponse>('/questions', data);
  return response.data;
};
