import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import {
  IGetDoctorItem,
  IGetDoctorsResponse,
} from '../../../../../services/DoctorServices';
import { DoctorListWrapper } from './DoctorListWrapper.styled';
import { useState } from 'react';
import { MedicalSpecialtyType } from '../../../../../types/Share';
import DoctorCard from '../components/DoctorCard';

/**
 * Get Doctors
 * 
 * Search
 * - specialties
 * 
 * return {
 *  data: Array<IGetDoctorItem>;
    pagination: {
    pages: number[];
    totalPage: number;
    currentPage: number;
    prev: number;
    next: number;
  };
 * }
 */

const mockResponse: IGetDoctorsResponse = {
  data: [
    {
      id: '22f00713-2ce1-49de-a09b-89addb0f69f1',
      avatar: 'https://i.pravatar.cc/100?img=6',
      firstName: 'John',
      lastName: 'Doe',
      specialties: [
        'INTERNAL_MEDICINE',
        'PEDIATRICS',
      ] as MedicalSpecialtyType[],
    },
    {
      id: '2b641762-faa3-493c-bc46-57f290e87be2',
      avatar: 'https://i.pravatar.cc/100?img=5',
      firstName: 'Jane',
      lastName: 'Doe',
      specialties: ['DERMATOLOGY'] as MedicalSpecialtyType[],
    },
    {
      id: '67ba5df8-2e48-47c8-af00-1474550021ef',
      avatar: 'https://i.pravatar.cc/100?img=12',
      firstName: 'Jane',
      lastName: 'Doe',
      specialties: ['DERMATOLOGY'] as MedicalSpecialtyType[],
    },
    {
      id: 'de4d2799-6c93-4e5c-bf31-d15e7637b045',
      avatar: 'https://i.pravatar.cc/100?img=31',
      firstName: 'Jane',
      lastName: 'Doe',
      specialties: ['ORTHOPEDICS'] as MedicalSpecialtyType[],
    },
  ],
  pagination: {
    pages: [1],
    totalPage: 1,
    currentPage: 0,
    prev: 0,
    next: 1,
  },
};

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<IGetDoctorItem[]>(mockResponse.data);
  return (
    <>
      <PrimaryPageTop pageTitle="Doctors" />
      <PrimaryPageContent>
        <DoctorListWrapper>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} data={doctor} />
          ))}
        </DoctorListWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default DoctorList;
