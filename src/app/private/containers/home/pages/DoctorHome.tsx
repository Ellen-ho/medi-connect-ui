import { Box, Grid, Typography } from '@mui/material';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import BasicCard from '../../../../../components/card/BasicCard';
import { useContext } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import useSWR from 'swr';
import { getDoctorStatistic } from '../../../../../services/DoctorServices';

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
            <BasicCard title={'Achievement'}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    color={'text.secondary'}
                    lineHeight={'1rem'}
                  >
                    Answers provided
                  </Typography>
                  <Typography
                    variant="h3"
                    color={'text.primary'}
                    lineHeight={'3rem'}
                  >
                    {doctorStatistic?.answerCounts}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    color={'text.secondary'}
                    lineHeight={'1rem'}
                  >
                    Agrees given
                  </Typography>
                  <Typography
                    variant="h3"
                    color={'text.primary'}
                    lineHeight={'3rem'}
                  >
                    {doctorStatistic?.beAgreedCounts}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    color={'text.secondary'}
                    lineHeight={'1rem'}
                  >
                    Thank you notes
                  </Typography>
                  <Typography
                    variant="h3"
                    color={'text.primary'}
                    lineHeight={'3rem'}
                  >
                    {doctorStatistic?.thankedCounts}
                  </Typography>
                </Box>
              </Box>
            </BasicCard>
          </Grid>
          <Grid item xs={12}>
            <BasicCard title={'Upcoming Appointments'}>TBD</BasicCard>
          </Grid>
          <Grid item xs={8}>
            <BasicCard title={'Latest Questions'}>TBD</BasicCard>
          </Grid>
          <Grid item xs={4}>
            <BasicCard title={'Ongoing Goals'}>TBD</BasicCard>
          </Grid>
        </Grid>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default DoctorHome;
