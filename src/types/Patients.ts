import { GenderType } from './Share';

export interface IMedicalHistoryItem {
  diagnosis: PersonalDiagnosisType;
  diagnosisDetails?: string;
}

export enum PersonalDiagnosisType {
  HYPERTENSION = 'HYPERTENSION',
  DIABETES = 'DIABETES',
  HYPERLIPIDEMIA = 'HYPERLIPIDEMIA',
  CANCER = 'CANCER',
  SURGERY = 'SURGERY',
  OTHER = 'OTHER',
}

export interface IFamilyHistoryItem {
  relationship: string;
  diagnosis: FamilyDiagnosisType;
  diagnosisDetails?: string;
}

export enum FamilyDiagnosisType {
  HYPERTENSION = 'HYPERTENSION',
  DIABETES = 'DIABETES',
  HYPERLIPIDEMIA = 'HYPERLIPIDEMIA',
  CANCER = 'CANCER',
  OTHER = 'OTHER',
}

export interface IAllergy {
  medicine: string | null;
  food: string | null;
  other: string | null;
}

export interface IMedicinceUsageItem {
  medicineName: string;
  medicineDosage: number;
  medicineUnit: MedicineUnitType;
  medicineFrequency: MedicineFrequencyType;
  medicineTime: MedicineTimeType;
}

export enum MedicineUnitType {
  MILLIGRAM = 'MILLIGRAM',
  MILLILITER = 'MILLILITER',
}

export enum MedicineFrequencyType {
  ONCE_DAILY = 'ONCE_DAILY',
  TWICE_DAILY = 'TWICE_DAILY',
  THREE_TIMES_A_DAY = 'THREE_TIMES_A_DAY',
  FOUR_TIMES_A_DAY = 'FOUR_TIMES_A_DAY',
  OTHER = 'OTHER',
}

export enum MedicineTimeType {
  BEFORE_MEAL = 'BEFORE_MEAL',
  AFTER_MEAL = 'AFTER_MEAL',
  OTHER = 'OTHER',
}

export interface IPatient {
  avatar: string | null;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: GenderType;
  heightValueCm: number;
  allergy: IAllergy;
  medicalHistory: IMedicalHistoryItem[] | null;
  familyHistory: IFamilyHistoryItem[] | null;
  medicinceUsage: IMedicinceUsageItem[] | null;
}
