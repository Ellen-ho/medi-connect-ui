import queryString from 'query-string';
import api from './ApiService';
import { MedicalSpecialtyType } from '../types/Share';
import {
  ConsultAppointmentStatusType,
  IDoctorTimeSlotData,
} from '../types/Consultation';
import { extend } from 'dayjs';

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

interface patientConsultAppointmentDatas {
  patientId: string;
  status: ConsultAppointmentStatusType;
  doctorTimeSlot: IDoctorTimeSlotData;
  doctor: IDoctorData;
  meetingLink: string | null;
}

interface doctorConsultAppointmentDatas {
  status: ConsultAppointmentStatusType;
  doctorTimeSlot: IDoctorTimeSlotData;
  patient: IPatientData;
  meetingLink: string | null;
}

interface IGetPatientConsultAppointmentsResponse {
  upcomingAppointments: patientConsultAppointmentDatas[];
  completedAppointments: patientConsultAppointmentDatas[];
  canceledAppointments: patientConsultAppointmentDatas[];
}

interface IGetDoctorConsultAppointmentsResponse {
  upcomingAppointments: doctorConsultAppointmentDatas[];
  completedAppointments: doctorConsultAppointmentDatas[];
  canceledAppointments: doctorConsultAppointmentDatas[];
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

export const editDoctorTimeSlot = async (
  data: IEditDoctorTimeSlotRequest,
): Promise<IEditDoctorTimeSlotResponse> => {
  const response = await api.patch<IEditDoctorTimeSlotResponse>(
    '/consultations/time-slot/:id',
    data,
  );
  return response.data;
};

export const cancelConsultAppointment = async (
  data: ICancelConsultAppointmentRequest,
): Promise<ICancelConsultAppointmentResponse> => {
  const response = await api.delete<ICancelConsultAppointmentResponse>(
    '/consultations/:id',
  );
  return response.data;
};
