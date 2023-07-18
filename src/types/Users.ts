export enum UserRoleType {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
}

export interface IAccount {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
