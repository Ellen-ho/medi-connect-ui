export interface IDoctorTimeSlotData {
  startAt: Date;
  endAt: Date;
}

export enum ConsultAppointmentStatusType {
  UPCOMING = 'UPCOMING',
  COMPLETED = 'COMPLETED',
  PATIENT_CANCELED = 'PATIENT_CANCELED',
}
