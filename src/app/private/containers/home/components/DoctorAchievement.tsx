import { useNavigate } from 'react-router-dom';
import BasicCard from '../../../../../components/card/BasicCard';
import useSWR from 'swr';
import { Box, Button, Divider, Skeleton, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import { getDoctorStatistic } from '../../../../../services/DoctorServices';
import CountUp from 'react-countup';

const DoctorAchievement: React.FC = () => {
  const title = 'Your Questions';
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const doctorId = state.doctorId;
  const [shouldFetchData, setShouldFetchData] = useState(false);

  const { data } = useSWR(shouldFetchData ? 'getDoctorStatistic' : null, () =>
    getDoctorStatistic(doctorId as string),
  );

  // const data = {
  //   id: '91318353-1e93-410b-afbc-c7cc67ea9ceb',
  //   answerCounts: 10,
  //   thankedCounts: 9,
  //   beAgreedCounts: 3,
  // };

  const handleViewQuestion = () => {
    navigate('/question');
  };

  const handleSingleQuestion = (questionId: string) => {
    navigate(`/question/${questionId}`);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldFetchData(true);
    }, 500);

    return () => {
      clearTimeout(timeoutId); // 清除定时器以防止内存泄漏
    };
  }, []);

  // if (isLoading) {
  //   return (
  //     <BasicCard title={''}>
  //       <Skeleton />
  //       <Skeleton />
  //       <Skeleton />
  //     </BasicCard>
  //   );
  // }

  return (
    <BasicCard title={title}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Box>
          <Typography
            variant="subtitle1"
            color={'text.secondary'}
            lineHeight={'1rem'}
          >
            Answers provided
          </Typography>
          <Typography variant="h3" color={'text.primary'} lineHeight={'3rem'}>
            {data ? (
              <CountUp start={0} end={data.answerCounts} duration={0.6} />
            ) : (
              0
            )}
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
          <Typography variant="h3" color={'text.primary'} lineHeight={'3rem'}>
            {data ? (
              <CountUp start={0} end={data.beAgreedCounts} duration={0.5} />
            ) : (
              0
            )}
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
          <Typography variant="h3" color={'text.primary'} lineHeight={'3rem'}>
            {data ? (
              <CountUp start={0} end={data.thankedCounts} duration={0.5} />
            ) : (
              0
            )}
          </Typography>
        </Box>
      </Box>
    </BasicCard>
  );
};

export default DoctorAchievement;
