import { useNavigate, useSearchParams } from 'react-router-dom';
import BasicCard from '../../../../../components/card/BasicCard';
import useSWR from 'swr';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getHealthGoalList } from '../../../../../services/GoalService';
import trophyUrl from '/src/assets/trophy.png';

const PresentGoal: React.FC = () => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  const isDoctor = state.doctorId != null;
  const patientId = state.patientId;
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');
  const [page, setPage] = useState<number>(1);

  const { data } = useSWR(`getHealthGoalList?q=${page}`, () =>
    getHealthGoalList({
      query: {
        page: page,
        limit: 10,
        targetPatientId: (targetPatientId || state.patientId) as string,
      },
    }),
  );

  const goal = data?.goalsData[0];

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
          <img src={trophyUrl} alt="" width="60" height="60" />
        </Box>
        <Box sx={{ flex: 9 }}>
          <Typography variant="body1" sx={{ mb: '.3rem' }}>
            Here Are Your Goals!
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

export default PresentGoal;
