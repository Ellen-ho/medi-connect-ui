import { GenderType, MedicalSpecialtyType } from './Share';

export interface IAddress {
  line1: string;
  line2?: string;
  city: string;
  stateProvince?: string;
  postalCode?: string;
  country: string;
  countryCode: string;
}

export interface IDoctor {
  avatar: string | null;
  firstName: string;
  lastName: string;
  gender: GenderType;
  aboutMe: string;
  languagesSpoken: string[];
  specialties: MedicalSpecialtyType[];
  careerStartDate: string;
  officePracticalLocation: IAddress;
  education: string[];
  awards: string[] | null;
  affiliations: string[] | null;
}
