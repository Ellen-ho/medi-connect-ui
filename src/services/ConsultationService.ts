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
  firstName: string;
  lastName: string;
}

interface IDoctorData {
  firstName: string;
  lastName: string;
  specialties: MedicalSpecialtyType[];
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

interface IDoctorConsultAppointmentDatas {
  status: ConsultAppointmentStatusType;
  doctorTimeSlot: IDoctorTimeSlotData;
  patient: IPatientData;
  meetingLink: string | null;
}

export interface IGetPatientConsultAppointmentsResponse {
  upcomingAppointments: IPatientConsultAppointmentDatas[];
  completedAppointments: IPatientConsultAppointmentDatas[];
  canceledAppointments: IPatientConsultAppointmentDatas[];
}

interface IGetDoctorConsultAppointmentsResponse {
  upcomingAppointments: IDoctorConsultAppointmentDatas[];
  completedAppointments: IDoctorConsultAppointmentDatas[];
  canceledAppointments: IDoctorConsultAppointmentDatas[];
}

interface ICreateDoctorTimeSlotRequest {
  startAt: Date;
  endAt: Date;
}

interface ICreateDoctorTimeSlotResponse {
  id: string;
  doctorId: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface ICreateMultipleTimeSlotsRequest {
  timeSlots: Array<IDoctorTimeSlotData>;
}

interface ICreateMultipleTimeSlotsResponse {
  doctorId: string;
  timeSlots: Array<{
    id: string;
    startAt: Date;
    endAt: Date;
  }>;
}

interface IEditDoctorTimeSlotRequest extends IDoctorTimeSlotData {
  id: string;
}

interface IEditDoctorTimeSlotResponse extends IDoctorTimeSlotData {
  id: string;
  updatedAt: Date;
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

export const getPatientConsultAppointments =
  async (): Promise<IGetPatientConsultAppointmentsResponse> => {
    const response = await api.get('/consultations/patient');
    return response.data;
  };

export const getDoctorConsultAppointments =
  async (): Promise<IGetDoctorConsultAppointmentsResponse> => {
    const response = await api.get('/consultations/doctor');
    return response.data;
  };

export const editDoctorTimeSlot = async (
  data: IEditDoctorTimeSlotRequest,
): Promise<IEditDoctorTimeSlotResponse> => {
  const response = await api.patch<IEditDoctorTimeSlotResponse>(
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
