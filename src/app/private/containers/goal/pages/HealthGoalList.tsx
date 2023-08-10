import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  IGetHealthGoalListResponse,
  getHealthGoalList,
} from '../../../../../services/GoalService';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import {
  Avatar,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Pagination,
} from '@mui/material';
import BasicCard from '../../../../../components/card/BasicCard';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import useSWR, { mutate } from 'swr';
import GoalStatus from '../components/GoalStatus';

const HealthGoalList: React.FC = () => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  const isDoctor = state.doctorId != null;
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');

  const handleClickGoal = (id: string) => {
    navigate({
      pathname: `/health-goal/${id}`,
      search: isDoctor ? `?targetPatientId=${targetPatientId}` : '',
    });
  };

  const { data } = useSWR('getHealthGoalList', () =>
    getHealthGoalList({
      query: {
        page: 1,
        limit: 10,
        targetPatientId: (targetPatientId || state.patientId) as string,
      },
    }),
  );

  return (
    <>
      <PrimaryPageTop pageTitle="Health Goal" />
      <PrimaryPageContent>
        <CommonWrapper>
          <BasicCard title={'Goal'}>
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
              }}
            >
              {data?.goalsData && data?.goalsData.length > 0 ? (
                data?.goalsData.map((goal) => (
                  <>
                    <ListItemButton onClick={() => handleClickGoal(goal.id)}>
                      <ListItemAvatar>
                        <Avatar>
                          <FlagCircleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            Health Goal:{' '}
                            {dateFormatter(goal.startAt.toString(), 'YYYY/M/D')}{' '}
                            - {dateFormatter(goal.endAt.toString(), 'YYYY/M/D')}{' '}
                            <GoalStatus status={goal.status} />
                          </>
                        }
                        secondary={`Created At: ${dateFormatter(
                          goal.createdAt.toString(),
                        )}`}
                      ></ListItemText>
                    </ListItemButton>
                    <Divider />
                  </>
                ))
              ) : (
                <NoDataFound />
              )}
            </List>
          </BasicCard>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Pagination
              count={data?.pagination.totalPage || 1}
              page={data?.pagination.currentPage || 1}
              onChange={(event, page) => {
                const newPage = page;
                mutate('getHealthGoalList', async () => {
                  const newData = await getHealthGoalList({
                    query: {
                      targetPatientId: (targetPatientId ||
                        state.patientId) as string,
                      page: newPage,
                      limit: 10,
                    },
                  });
                  return newData;
                });
              }}
            />
          </div>
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default HealthGoalList;
