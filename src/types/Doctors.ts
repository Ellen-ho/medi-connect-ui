import { GenderType, MedicalSpecialtyType } from './Share';

export interface IAddress {
  line1: string; // Street address, P.O. Box, company name, c/o
  line2?: string; // Apartment, suite, unit, building, floor, etc.
  city: string; // City, town, village, etc.
  stateProvince?: string; // State, province, region, etc.
  postalCode?: string; // Postal code, ZIP code, etc.
  country: string; // Country name or ISO country code
  countryCode: string; // ISO country code (2 or 3 characters), optional if using the full country name
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
