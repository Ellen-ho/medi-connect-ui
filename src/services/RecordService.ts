import queryString from 'query-string';
import api from './ApiService';

interface IPatientData {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
}

interface IGetRecordsRequest {
  urlPath: string;
  query: {
    targetPatientId: string;
    page: number;
    limit: number;
  };
}

interface IGetRecordsResponse<T> {
  patientData: IPatientData;
  recordsData: Array<T>;
  pagination: {
    pages: number[];
    totalPage: number;
    currentPage: number;
    prev: number;
    next: number;
  };
}

interface ICreateBloodPressureRecordRequest {
  bloodPressureDate: Date;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  heartBeat: number;
  bloodPressureNote: string | null;
}

interface ICreateBloodPressureRecordResponse {
  id: string;
  bloodPressureDate: Date;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  heartBeat: number;
  bloodPressureNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const getRecords = async ({
  urlPath,
  query,
}: IGetRecordsRequest): Promise<IGetRecordsResponse<unknown>> => {
  const queries = queryString.stringify(query);
  const response = await api.get<IGetRecordsResponse<unknown>>(
    `/records/${urlPath}?${queries}`,
  );
  return response.data;
};

export const createBloodPressureRecord = async (
  data: ICreateBloodPressureRecordRequest,
): Promise<ICreateBloodPressureRecordResponse> => {
  const response = await api.post<ICreateBloodPressureRecordResponse>(
    '/records/blood-pressure',
    data,
  );
  return response.data;
};
