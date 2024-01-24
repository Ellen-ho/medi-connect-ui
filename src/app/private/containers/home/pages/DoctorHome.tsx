import { Grid } from '@mui/material';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useContext } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import useSWR from 'swr';
import { getDoctorStatistic } from '../../../../../services/DoctorServices';
import DoctorUpcomingAppointment from '../components/DoctorUpcomingAppointment';
import SelfQuestions from '../components/SelfQuestions';
import DoctorAchievement from '../components/DoctorAchievement';
import PresentTimeSlot from '../components/PresentTimeSlot';

const DoctorHome: React.FC = () => {
  const { state } = useContext(AuthContext);
  const doctorId = state.doctorId;

  const { data: doctorStatistic } = useSWR('getDoctorStatistic', () =>
    getDoctorStatistic(doctorId as string),
  );

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <h2>Welcome, Dr. {state.currentUser?.displayName}</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DoctorUpcomingAppointment />
          </Grid>
          <Grid item xs={8}>
            <DoctorAchievement />
          </Grid>
          <Grid item xs={4}>
            <PresentTimeSlot />
          </Grid>
        </Grid>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default DoctorHome;
