import { useNavigate } from 'react-router-dom';
import BasicCard from '../../../../../components/card/BasicCard';
import useSWR from 'swr';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import { Box, Button, Skeleton, Tooltip, Typography } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import { HealthGoalStatus } from '../../../../../types/Goals';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const OnGoingGoals: React.FC = () => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  const isDoctor = state.doctorId != null;
  const patientId = state.patientId;

  // const { data } = useSWR(`getHealthGoalList?q=${page}`, () =>
  //   getHealthGoalList({
  //     query: {
  //       limit: 10,
  //       page: page,
  //       targetPatientId: (targetPatientId || state.patientId) as string,
  //     },
  //   }),
  // );

  const goal = {
    id: '4201ea87-156f-4209-b639-86ae1be27084',
    startAt: new Date('2023-11-18T04:34:49.171Z'),
    endAt: new Date('2023-11-30T04:34:49.171Z'),
    status: HealthGoalStatus.IN_PROGRESS,
    result: null,
    createdAt: new Date('2023-11-18T04:34:49.171Z'),
  };

  const handleViewGoals = () => {
    navigate('/health-goal');
  };

  const handleSingleGoal = (id: string) => {
    navigate({
      pathname: `/health-goal/${id}`,
      search: isDoctor ? `?targetPatientId=${patientId}` : '',
    });
  };

  // if (isLoading) {
  //   return (
  //     <BasicCard title={''}>
  //       <Skeleton />
  //       <Skeleton />
  //       <Skeleton />
  //     </BasicCard>
  //   );
  // }

  if (!goal) {
    return (
      <BasicCard>
        <NoDataFound />
      </BasicCard>
    );
  }

  return (
    <BasicCard>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'stretch',
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <img src="src/assets/trophy.png" alt="" width="60" height="60" />
        </Box>
        <Box sx={{ flex: 9 }}>
          <Typography variant="body1" sx={{ mb: '.3rem' }}>
            You have a goal!
          </Typography>
          <Tooltip title="End Date" placement="bottom-start">
            <Typography
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
              color={'#6B6B6B'}
            >
              <CalendarMonthIcon fontSize="small" />{' '}
              {dateFormatter(goal.endAt.toString(), 'MM/DD YYYY')}
            </Typography>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
        <Button size="small" onClick={handleViewGoals}>
          View More
        </Button>
      </Box>
    </BasicCard>
  );
};

export default OnGoingGoals;
