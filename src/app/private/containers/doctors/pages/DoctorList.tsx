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
import { Pagination } from '@mui/material';

const DoctorList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useSWR(`getDoctors?q=${page}`, () =>
    getDoctors({
      query: {
        limit: 9,
        page: page,
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Pagination
            count={data?.pagination.totalPage || 1}
            page={page}
            onChange={(event, page) => {
              setPage(page);
            }}
          />
        </div>
      </PrimaryPageContent>
    </>
  );
};

export default DoctorList;
