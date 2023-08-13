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
import { Grid, Pagination } from '@mui/material';

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
        <DoctorListWrapper></DoctorListWrapper>
        <Grid container spacing={2}>
          {data &&
            data.data.map((doctor) => (
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <DoctorCard key={doctor.id} data={doctor} />
              </Grid>
            ))}
        </Grid>
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
