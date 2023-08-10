import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import useSWR from 'swr';
import {
  activateHealthGoal,
  getHealthGoal,
  rejectHealthGoal,
} from '../../../../../services/GoalService';
import BasicCard from '../../../../../components/card/BasicCard';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import GoalCompareItem from '../components/GoalCompareItem';
import RowItem from '../../../../../components/form/RowItem';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import { Alert, AlertTitle, Box, Button } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { HealthGoalStatus } from '../../../../../types/Goals';
import GoalStatus from '../components/GoalStatus';
import { useContext } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';

const mockResponse = {
  id: '0b417e61-65b0-49a8-aedf-9e141dd7346a',
  bloodPressureCurrentValue: {
    systolicBloodPressure: 130,
    diastolicBloodPressure: 80,
  },
  bloodPressureTargetValue: {
    systolicBloodPressure: 120,
    diastolicBloodPressure: 70,
  },
  bloodSugarCurrentValue: '50.00',
  bloodSugarCurrentType: 'FAST_PLASMA_GLUCOSE',
  bloodSugarTargetValue: '200.00',
  bloodSugarTargetType: 'FAST_PLASMA_GLUCOSE',
  glycatedHemonglobinCurrentValue: '3.00',
  glycatedHemonglobinTargetValue: '50.00',
  weightCurrentValue: '80.00',
  weightTargetValue: '10.00',
  bodyMassIndexTargetValue: '20.00',
  startAt: '2023-07-22T01:58:46.000Z',
  result: null,
  endAt: '2023-07-28T01:58:05.000Z',
  status: 'PENDING',
  createdAt: '2023-07-21T05:59:55.797Z',
  updatedAt: '2023-07-21T05:59:55.797Z',
};

const HealthGoalDetail: React.FC = () => {
  const { id } = useParams();
  const { state } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');
  const navigate = useNavigate();

  // const data = mockResponse;

  const handleReject = async () => {
    await rejectHealthGoal({
      healthGoalId: id as string,
    });
    navigate('/health-goal');
  };

  const handleActivate = async () => {
    await activateHealthGoal({
      healthGoalId: id as string,
    });
    navigate('/health-goal');
  };

  const { data } = useSWR('getHealthGoal', () =>
    getHealthGoal({
      healthGoalId: id as string,
      query: {
        targetPatientId: (targetPatientId || state.patientId) as string,
      },
    }),
  );

  return (
    <>
      <SecondaryPageTop />
      <PrimaryPageContent>
        <CommonWrapper>
          {data ? (
            <>
              {data.status === HealthGoalStatus.PENDING && (
                <>
                  <Alert severity="info">
                    <AlertTitle>
                      Your Health Challenge: Become Your Best Self!
                    </AlertTitle>
                    Spotted unusual health patterns! It's your launchpad to
                    great health. Embrace our goals, forge vibrant habits. Ready
                    for an exciting journey? Your future self cheers you on!
                  </Alert>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem',
                    }}
                  >
                    <Button
                      onClick={handleActivate}
                      variant="contained"
                      color="primary"
                    >
                      <RocketLaunchIcon sx={{ paddingRight: '.4rem' }} /> Take
                      Challenge!
                    </Button>
                    <Button
                      onClick={handleReject}
                      variant="outlined"
                      color="error"
                    >
                      Reject
                    </Button>
                  </Box>
                </>
              )}
              <BasicCard title={'Health Goal Info'}>
                <RowItem label={'Status'}>
                  <GoalStatus status={data.status} />
                </RowItem>
                <RowItem label={'Start At'}>
                  {dateFormatter(data.startAt.toString())}
                </RowItem>
                <RowItem label={'End At'}>
                  {dateFormatter(data.endAt.toString())}
                </RowItem>
                <RowItem label={'Created At'}>
                  {dateFormatter(data.createdAt.toString())}
                </RowItem>
              </BasicCard>
              <BasicCard title={'Health Goal Targets'}>
                <GoalCompareItem
                  label={'Category'}
                  leftItem={'Current Value'}
                  rightItem={'Suggested Value'}
                  isHeader={true}
                />
                <GoalCompareItem
                  label={'Systolic Blood Pressure'}
                  leftItem={
                    data.bloodPressureCurrentValue?.systolicBloodPressure ||
                    '--'
                  }
                  rightItem={
                    data.bloodPressureTargetValue?.systolicBloodPressure || '--'
                  }
                />
                <GoalCompareItem
                  label={'Diastolic Blood Pressure'}
                  leftItem={
                    data.bloodPressureCurrentValue?.diastolicBloodPressure ||
                    '--'
                  }
                  rightItem={
                    data.bloodPressureTargetValue?.diastolicBloodPressure ||
                    '--'
                  }
                />
                <GoalCompareItem
                  label={'Blood Sugar'}
                  leftItem={data.bloodSugarCurrentValue || '--'}
                  rightItem={data.bloodSugarTargetValue || '--'}
                />
                <GoalCompareItem
                  label={'Glycated Hemonglobin'}
                  leftItem={data.glycatedHemonglobinCurrentValue || '--'}
                  rightItem={data.glycatedHemonglobinTargetValue || '--'}
                />
                <GoalCompareItem
                  label={'Weight'}
                  leftItem={data.weightCurrentValue || '--'}
                  rightItem={data.weightTargetValue || '--'}
                />
              </BasicCard>
            </>
          ) : (
            <NoDataFound />
          )}
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default HealthGoalDetail;
