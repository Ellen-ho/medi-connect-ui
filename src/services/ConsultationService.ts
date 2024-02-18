import queryString from 'query-string';
import api from './ApiService';
import { MedicalSpecialtyType } from '../types/Share';
import {
  ConsultAppointmentStatusType,
  IDoctorTimeSlotData,
} from '../types/Consultations';

interface ICreateConsultAppointmentRequest {
  doctorTimeSlotId: string;
}

interface ICreateConsultAppointmentResponse {
  id: string;
}

interface IPatientData {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface IDoctorData {
  firstName: string;
  lastName: string;
  specialties: MedicalSpecialtyType[];
  avatar: string;
}
export interface IPatientConsultAppointmentDatas {
  appointmentId: string;
  patientId: string;
  status: ConsultAppointmentStatusType;
  doctorTimeSlot: IDoctorTimeSlotData;
  doctor: IDoctorData;
  meetingLink: string | null;
  cancelAvailability: boolean;
}

export interface IDoctorConsultAppointmentDatas {
  appointmentId: string;
  status: ConsultAppointmentStatusType;
  doctorTimeSlot: IDoctorTimeSlotData;
  patient: IPatientData;
  meetingLink: string | null;
}

export interface IGetConsultAppointmentsRequest {
  query: {
    onlyUpcoming?: boolean;
  };
}

export interface IGetPatientConsultAppointmentsResponse {
  upcomingAppointments: IPatientConsultAppointmentDatas[];
  completedAppointments: IPatientConsultAppointmentDatas[];
  canceledAppointments: IPatientConsultAppointmentDatas[];
}

export interface IGetDoctorConsultAppointmentsResponse {
  upcomingAppointments: IDoctorConsultAppointmentDatas[];
  completedAppointments: IDoctorConsultAppointmentDatas[];
  canceledAppointments: IDoctorConsultAppointmentDatas[];
}

export interface ICreateDoctorTimeSlotRequest {
  startAt: string;
  endAt: string;
}

interface ICreateDoctorTimeSlotResponse {
  id: string;
  doctorId: string;
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
}

interface ICreateMultipleTimeSlotsRequest {
  timeSlots: Array<IDoctorTimeSlotData>;
}

interface ICreateMultipleTimeSlotsResponse {
  doctorId: string;
  timeSlots: Array<{
    id: string;
    startAt: string;
    endAt: string;
  }>;
}

interface IEditDoctorTimeSlotRequest extends IDoctorTimeSlotData {
  id: string;
}

interface IEditDoctorTimeSlotResponse extends IDoctorTimeSlotData {
  id: string;
  updatedAt: string;
}

interface ICancelConsultAppointmentRequest {
  consultAppointmentId: string;
}

interface ICancelConsultAppointmentResponse {
  consultAppointmentId: string;
  status: ConsultAppointmentStatusType;
}

export interface IGetDoctorTimeSlotsvRequest {
  doctorId: string;
  query: {
    startTime: string;
    endTime: string;
  };
}

export interface IGetDoctorTimeSlotsvResponse {
  doctorId: string;
  timeSlots: IDoctorTimeSlot[];
}
export interface IDoctorTimeSlot {
  id: string;
  startAt: string;
  endAt: string;
  isAvailable: boolean;
}

interface ICancelDoctorTimeSlotRequest {
  id: string;
}

export const createDoctorTimeSlot = async (
  data: ICreateDoctorTimeSlotRequest,
): Promise<ICreateDoctorTimeSlotResponse> => {
  const response = await api.post<ICreateDoctorTimeSlotResponse>(
    '/consultations/time-slot',
    data,
  );
  return response.data;
};

export const createMultipleTimeSlots = async (
  data: ICreateMultipleTimeSlotsRequest,
): Promise<ICreateMultipleTimeSlotsResponse> => {
  const response = await api.post<ICreateMultipleTimeSlotsResponse>(
    '/consultations/multiple-time-slots',
    data,
  );
  return response.data;
};

export const createConsultAppointmentRecord = async (
  data: ICreateConsultAppointmentRequest,
): Promise<ICreateConsultAppointmentResponse> => {
  const response = await api.post<ICreateConsultAppointmentResponse>(
    '/consultations',
    data,
  );
  return response.data;
};

export const getPatientConsultAppointments = async ({
  query,
}: IGetConsultAppointmentsRequest): Promise<IGetPatientConsultAppointmentsResponse> => {
  const queries = query.onlyUpcoming
    ? `?${queryString.stringify({ onlyUpcoming: query.onlyUpcoming })}`
    : '';
  const response = await api.get(`/consultations/patient${queries}`);
  return response.data;
};

export const getDoctorConsultAppointments = async ({
  query,
}: IGetConsultAppointmentsRequest): Promise<IGetDoctorConsultAppointmentsResponse> => {
  const queries = query.onlyUpcoming
    ? `?${queryString.stringify({ onlyUpcoming: query.onlyUpcoming })}`
    : '';
  const response = await api.get(`/consultations/doctor${queries}`);
  return response.data;
};

export const editDoctorTimeSlot = async (
  data: IEditDoctorTimeSlotRequest,
): Promise<IEditDoctorTimeSlotResponse> => {
  const { startAt, endAt } = data;
  const response = await api.patch<IEditDoctorTimeSlotResponse>(
    `/consultations/time-slot/${data.id}`,
    { startAt, endAt },
  );
  return response.data;
};

export const cancelDoctorTimeSlot = async (
  data: ICancelDoctorTimeSlotRequest,
): Promise<void> => {
  const response = await api.delete<void>(
    `/consultations/time-slot/${data.id}`,
  );
  return response.data;
};

export const cancelConsultAppointment = async (
  data: ICancelConsultAppointmentRequest,
): Promise<ICancelConsultAppointmentResponse> => {
  const response = await api.delete<ICancelConsultAppointmentResponse>(
    `/consultations/${data.consultAppointmentId}`,
  );
  return response.data;
};

export const getDoctorTimeSlots = async ({
  doctorId,
  query,
}: IGetDoctorTimeSlotsvRequest): Promise<IGetDoctorTimeSlotsvResponse> => {
  const queries = queryString.stringify(query);
  const response = await api.get(
    `/consultations/time-slots/doctors/${doctorId}?${queries}`,
  );
  return response.data;
};
