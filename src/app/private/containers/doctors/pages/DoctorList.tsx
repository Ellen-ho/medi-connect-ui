import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import {
  IGetDoctorItem,
  getDoctors,
} from '../../../../../services/DoctorServices';
import { useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import { DoctorListWrapper } from './DoctorList.styled';
import useSWR from 'swr';

const DoctorList: React.FC = () => {
  const { data, isLoading } = useSWR('getDoctors', () =>
    getDoctors({
      query: {
        page: 1,
        limit: 10,
      },
    }),
  );

  return (
    <>
      <PrimaryPageTop pageTitle="Doctors" />
      <PrimaryPageContent>
        <DoctorListWrapper>
          {data &&
            data.data.map((doctor) => (
              <DoctorCard key={doctor.id} data={doctor} />
            ))}
        </DoctorListWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default DoctorList;
