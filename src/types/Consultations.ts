import { MedicalSpecialtyType } from './Share';

export interface IDoctorTimeSlotData {
  startAt: string;
  endAt: string;
}

export enum ConsultAppointmentStatusType {
  UPCOMING = 'UPCOMING',
  COMPLETED = 'COMPLETED',
  PATIENT_CANCELED = 'PATIENT_CANCELED',
}

export interface ConsultAppointmentDatas {
  patientId: string;
  status: ConsultAppointmentStatusType;
  doctorTimeSlot: {
    startAt: string;
    endAt: string;
  };
  doctor: {
    firstName: string;
    lastName: string;
    specialties: MedicalSpecialtyType[];
  };
  meetingLink: string | null;
  cacelAvailability: boolean;
}
