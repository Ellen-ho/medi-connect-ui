// give me a react component called DcotorDetail

import React from 'react';
import { useParams } from 'react-router-dom';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import useSWR from 'swr';
import { getDoctorProfile } from '../../../../../services/DoctorServices';

const DoctorDetail: React.FC = () => {
  const { doctorId } = useParams();

  //   const { data, error } = useSWR('getRecords', () =>

  //   }),
  // );
  return (
    <>
      <SecondaryPageTop />
      <PrimaryPageContent>{doctorId}</PrimaryPageContent>
    </>
  );
};
export default DoctorDetail;
