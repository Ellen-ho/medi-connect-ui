import { Grid } from '@mui/material';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import useSWR from 'swr';
import { getDoctorStatistic } from '../../../../../services/DoctorServices';
import DoctorUpcomingAppointment from '../components/DoctorUpcomingAppointment';
import DoctorAchievement from '../components/DoctorAchievement';
import PresentTimeSlot from '../components/PresentTimeSlot';
import Typewriter from '../components/TypeWriter';

const DoctorHome: React.FC = () => {
  const { state } = useContext(AuthContext);
  const doctorId = state.doctorId;

  const { data: doctorStatistic } = useSWR('getDoctorStatistic', () =>
    getDoctorStatistic(doctorId as string),
  );
  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <Typewriter text={`Welcome, Dr. ${state.currentUser?.displayName}`} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DoctorUpcomingAppointment />
          </Grid>
          <Grid item xs={12} md={8}>
            <DoctorAchievement />
          </Grid>
          <Grid item xs={12} md={4}>
            <PresentTimeSlot />
          </Grid>
        </Grid>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default DoctorHome;
