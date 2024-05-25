import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getHealthGoalList } from '../../../../../services/GoalService';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { Divider, List, Pagination } from '@mui/material';
import BasicCard from '../../../../../components/card/BasicCard';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import useSWR from 'swr';
import GoalItem from '../components/GoalItem';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

const HealthGoalList: React.FC = () => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  const isDoctor = state.doctorId != null;
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');
  const [page, setPage] = useState<number>(1);

  const handleClickGoal = (id: string) => {
    navigate({
      pathname: `/health-goal/${id}`,
      search: isDoctor ? `?targetPatientId=${targetPatientId}` : '',
    });
  };

  const { data } = useSWR(`getHealthGoalList?q=${page}`, () =>
    getHealthGoalList({
      query: {
        limit: 10,
        page: page,
        targetPatientId: (targetPatientId || state.patientId) as string,
      },
    }),
  );

  return (
    <>
      <PrimaryPageContent>
        <CommonWrapper>
          <PrimaryPageTop pageTitle="Health Goal" />
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
                    <GoalItem
                      key={goal.id}
                      goal={goal}
                      handleClickGoal={() => handleClickGoal(goal.id)}
                    />
                    <Divider />
                  </>
                ))
              ) : (
                <NoDataFound
                  icon={<SportsScoreIcon />}
                  label="You currently have no goal data."
                ></NoDataFound>
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
              page={page}
              onChange={(event, page) => {
                setPage(page);
              }}
            />
          </div>
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default HealthGoalList;
