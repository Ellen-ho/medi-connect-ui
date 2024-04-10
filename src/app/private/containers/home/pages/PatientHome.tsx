import { useContext } from 'react';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { AuthContext } from '../../../../../context/AuthContext';
import { Grid } from '@mui/material';
import UpcomingAppointment from '../components/UpcomingAppointment';
import SelfQuestions from '../components/SelfQuestions';
import PresentGoal from '../components/PresentGoal';

const PatientHome: React.FC = () => {
  const { state } = useContext(AuthContext);
  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <h2>Welcome, {state.currentUser?.displayName}</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <UpcomingAppointment />
          </Grid>
          <Grid item xs={12} md={8}>
            <SelfQuestions />
          </Grid>
          <Grid item xs={12} md={4}>
            <PresentGoal />
          </Grid>
          {/* <Grid item xs={8}>
            <BasicCard title={'Latest Questions'}>TBD</BasicCard>
          </Grid>
          <Grid item xs={4}>
            <BasicCard title={'News'}>TBD</BasicCard>
          </Grid> */}
        </Grid>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default PatientHome;
