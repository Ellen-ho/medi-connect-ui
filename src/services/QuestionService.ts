import { MedicalSpecialtyType } from '../types/Share';
import queryString from 'query-string';
import api from './ApiService';
import { IQuestion } from '../types/Questions';

interface IGetAnswerListRequest {
  query: {
    page: number;
    limit: number;
  };
}
interface IGetAnswerListResponse {
  totalAnswerCounts: number;
  data: Array<{
    id: string;
    content: string;
    createdAt: string;
    thankCounts: number;
    agreeCounts: number;
  }>;
  pagination: {
    pages: number[];
    totalPage: number;
    currentPage: number;
    prev: number;
    next: number;
  };
}

interface IGetAnswerDetailsRequest {
  answerId: string;
}

interface IGetAnswerDetailsResponse {
  questionId: string;
  answerId: string;
  answerContent: string;
  appreciationData: Array<{
    content: string | null;
    patientId: string;
    patientAge: number;
    createdAt: string;
  }>;
  agreementData: Array<{
    comment: string | null;
    agreedDoctorId: string;
    agreedDoctorFirstName: string;
    agreedDoctorLastName: string;
    createdAt: string;
  }>;
}

interface IGetQuestionsRequest {
  query: {
    page: number;
    limit: number;
    searchKeyword?: string;
    medicalSpecialty?: MedicalSpecialtyType;
    askerId?: string;
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

export interface IAnswer {
  answerId: string;
  doctorId: string;
  agreedDoctors: Array<{
    doctorId: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
  }>;
  content: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
  specialties: MedicalSpecialtyType[];
  careerStartDate: Date;
  answerCreatedAt: Date;
  agreeCounts: number;
  thankCounts: number;
  isThanked: boolean;
  isAgreed: boolean;
  isAnswerByMe: boolean;
}
interface IGetSingleQuestionRequest {
  patientQuestionId: string;
}

interface IGetSingleQuestionResponse {
  question: {
    content: string;
    askerAge: number;
  };
  answers: IAnswer[];
}

interface ICreatePatientQuestionAnswerRequest {
  content: string;
  patientQuestionId: string;
}

interface ICreatePatientQuestionAnswerResponse {
  id: string;
  content: string;
  patientQuestionId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ICreateAnswerAppreciationRequest {
  content: string | null;
  answerId: string;
}

interface ICreateAnswerAppreciationResponse {
  id: string;
  answerId: string;
  totalThankCounts: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ICreateAnswerAgreementRequest {
  answerId: string;
  comment: string | null;
}

interface ICreateAnswerAgreementResponse {
  id: string;
  answerId: string;
  totalAgreedDoctorCounts: number;
  agreedDoctorAvatars: Array<string | null>;
  createdAt: Date;
  updatedAt: Date;
}

interface ICancelPatientQuestionRequest {
  patientQuestionId: string;
}

interface ICancelPatientQuestionResponse {
  patientQuestionId: string;
}

interface ICancelPatientQuestionAnswerRequest {
  answerId: string;
}

interface ICancelPatientQuestionAnswerResponse {
  answerId: string;
}

interface ICancelAnswerAppreciationRequest {
  answerId: string;
}

interface ICancelAnswerAppreciationResponse {
  totalThankCounts: number;
}

interface ICancelAnswerAgreementRequest {
  answerId: string;
}

interface ICancelAnswerAgreementResponse {
  totalAgreedDoctorCounts: number;
  agreedDoctorAvatars: Array<string | null>;
}

export const getAnswerList = async (
  data: IGetAnswerListRequest,
): Promise<IGetAnswerListResponse> => {
  const queries = queryString.stringify(data.query);
  const response = await api.get<IGetAnswerListResponse>(
    `/questions/answers?${queries}`,
  );
  return response.data;
};

export const getAnswerDetails = async (
  data: IGetAnswerDetailsRequest,
): Promise<IGetAnswerDetailsResponse> => {
  const response = await api.get<IGetAnswerDetailsResponse>(
    `/questions/answers/${data.answerId}`,
  );
  return response.data;
};

export const getSingleQuestion = async (
  data: IGetSingleQuestionRequest,
): Promise<IGetSingleQuestionResponse> => {
  const response = await api.get<IGetSingleQuestionResponse>(
    `/questions/${data.patientQuestionId}`,
  );
  return response.data;
};

export const getQuestions = async (
  data: IGetQuestionsRequest,
): Promise<IGetQuestionsResponse> => {
  const queryParams = {
    askerId: data.query.askerId !== undefined ? data.query.askerId : '',
    searchKeyword: data.query.searchKeyword,
    medicalSpecialty: data.query.medicalSpecialty,
  };
  const queries = queryString.stringify(queryParams);
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

export const createAppreciation = async (
  data: ICreateAnswerAppreciationRequest,
): Promise<ICreateAnswerAppreciationResponse> => {
  const response = await api.post<ICreateAnswerAppreciationResponse>(
    `/questions/answers/${data.answerId}/appreciations`,
    {
      content: data.content,
    },
  );
  return response.data;
};

export const createAgreemewnt = async (
  data: ICreateAnswerAgreementRequest,
): Promise<ICreateAnswerAgreementResponse> => {
  const response = await api.post<ICreateAnswerAgreementResponse>(
    `/questions/answers/${data.answerId}/agreements`,
    {
      comment: data.comment,
    },
  );
  return response.data;
};

export const createAnswer = async (
  data: ICreatePatientQuestionAnswerRequest,
): Promise<ICreatePatientQuestionAnswerResponse> => {
  const response = await api.post<ICreatePatientQuestionAnswerResponse>(
    `/questions/${data.patientQuestionId}/answers`,
    {
      content: data.content,
    },
  );
  return response.data;
};

export const cancelAgreement = async (
  data: ICancelAnswerAgreementRequest,
): Promise<ICancelAnswerAgreementResponse> => {
  const response = await api.delete<ICancelAnswerAgreementResponse>(
    `/questions/answers/${data.answerId}/agreements`,
  );
  return response.data;
};

export const cancelAppreciation = async (
  data: ICancelAnswerAppreciationRequest,
): Promise<ICancelAnswerAppreciationResponse> => {
  const response = await api.delete<ICancelAnswerAppreciationResponse>(
    `/questions/answers/${data.answerId}/appreciations`,
  );
  return response.data;
};

export const cancelAnswer = async (
  data: ICancelPatientQuestionAnswerRequest,
): Promise<ICancelPatientQuestionAnswerResponse> => {
  const response = await api.delete<ICancelPatientQuestionAnswerResponse>(
    `/questions/answers/${data.answerId}`,
  );
  return response.data;
};

export const cancelQuestion = async (
  data: ICancelPatientQuestionRequest,
): Promise<ICancelPatientQuestionResponse> => {
  const response = await api.delete<ICancelPatientQuestionResponse>(
    `/questions/${data.patientQuestionId}`,
  );
  return response.data;
};
