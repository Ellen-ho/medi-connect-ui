import { useContext } from 'react';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { AuthContext } from '../../../../../context/AuthContext';
import { Grid } from '@mui/material';
import BasicCard from '../../../../../components/card/BasicCard';

const PatientHome: React.FC = () => {
  const { state } = useContext(AuthContext);
  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <h2>Welcome, {state.currentUser?.displayName}</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BasicCard title={'Upcoming Appointments'}>TBD</BasicCard>
          </Grid>
          <Grid item xs={8}>
            <BasicCard title={'Your Questions'}>TBD</BasicCard>
          </Grid>
          <Grid item xs={4}>
            <BasicCard title={'Ongoing Goals'}>TBD</BasicCard>
          </Grid>
          <Grid item xs={8}>
            <BasicCard title={'Latest Questions'}>TBD</BasicCard>
          </Grid>
          <Grid item xs={4}>
            <BasicCard title={'News'}>TBD</BasicCard>
          </Grid>
        </Grid>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default PatientHome;
