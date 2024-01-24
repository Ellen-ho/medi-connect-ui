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
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { HealthGoalStatus } from '../../../../../types/Goals';
import GoalStatus from '../components/GoalStatus';
import { useContext } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import { getGoalDurationRecords } from '../../../../../services/RecordService';
import InsightsIcon from '@mui/icons-material/Insights';

const HealthGoalDetail: React.FC = () => {
  const { id } = useParams();
  const { state } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');
  const navigate = useNavigate();

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

  const handleClickViewDataAnalyzation = async () => {
    await getGoalDurationRecords({
      goalId: id as string,
      query: {
        targetPatientId: (targetPatientId || state.patientId) as string,
      },
    }),
      navigate(`/health-goal/${id}/data-analysis`);
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
    <PrimaryPageContent>
      <CommonWrapper>
        <SecondaryPageTop />
        {data ? (
          <>
            {data.status === HealthGoalStatus.PENDING && (
              <>
                <Alert severity="info">
                  <AlertTitle>
                    Your Health Challenge: Become Your Best Self!
                  </AlertTitle>
                  Spotted unusual health patterns! It's your launchpad to great
                  health. Embrace our goals, forge vibrant habits. Ready for an
                  exciting journey? Your future self cheers you on!
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
            <BasicCard
              title={'Health Goal Info'}
              titleRightElement={
                <Tooltip title="View Record Data Analysis">
                  <IconButton onClick={handleClickViewDataAnalyzation}>
                    <InsightsIcon />
                  </IconButton>
                </Tooltip>
              }
            >
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
                  data.bloodPressureCurrentValue?.systolicBloodPressure || '--'
                }
                rightItem={
                  data.bloodPressureTargetValue?.systolicBloodPressure || '--'
                }
                unit={'mmHg'}
              />
              <GoalCompareItem
                label={'Diastolic Blood Pressure'}
                leftItem={
                  data.bloodPressureCurrentValue?.diastolicBloodPressure || '--'
                }
                rightItem={
                  data.bloodPressureTargetValue?.diastolicBloodPressure || '--'
                }
                unit={'mmHg'}
              />
              <GoalCompareItem
                label={'Fasting Blood Sugar'}
                leftItem={data.bloodSugarCurrentValue || '--'}
                rightItem={data.bloodSugarTargetValue || '--'}
                unit={'mg/dl'}
              />
              <GoalCompareItem
                label={'Glycated Hemonglobin'}
                leftItem={data.glycatedHemoglobinCurrentValue || '--'}
                rightItem={data.glycatedHemoglobinTargetValue || '--'}
                unit={'%'}
              />
              <GoalCompareItem
                label={'Weight'}
                leftItem={data.weightCurrentValue || '--'}
                rightItem={data.weightTargetValue || '--'}
                unit={'kg'}
              />
              <GoalCompareItem
                label={'Body Mass Index'}
                leftItem={data.bodyMassIndexCurrentValue || '--'}
                rightItem={data.bodyMassIndexTargetValue || '--'}
                unit={'kg/m²'}
              />
            </BasicCard>
          </>
        ) : (
          <NoDataFound />
        )}
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default HealthGoalDetail;
