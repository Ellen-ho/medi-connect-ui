import { MedicalSpecialtyType } from './Share';

export interface IQuestion {
  id: string;
  content: string;
  createdAt: string;
  answerCounts: number;
  medicalSpecialty: MedicalSpecialtyType;
}
