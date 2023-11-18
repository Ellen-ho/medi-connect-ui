import { useNavigate } from 'react-router-dom';
import BasicCard from '../../../../../components/card/BasicCard';
import useSWR from 'swr';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import { Box, Button, Divider, Skeleton } from '@mui/material';
import QuestionItem from '../../question/components/QuestionItem';
import { getQuestions } from '../../../../../services/QuestionService';

const SelfQuestions: React.FC = () => {
  const title = 'Your Questions';
  const navigate = useNavigate();

  // const { data } = useSWR(`getQuestions?q=${page}?q=${searchKeyword}`, () =>
  //   getQuestions({
  //     query: {
  //       limit: 10,
  //       page: page,
  //       searchKeyword: searchKeyword,
  //     },
  //   }),
  // );

  const questions = [
    {
      id: 'cce88a74-9698-4947-8ae6-addd6c69dad3',
      content: 'why I am here? who am I? Where I need to go?',
      createdAt: '2023-11-18T12:06:17.850Z',
      answerCounts: 0,
    },
    {
      id: '06a64fff-270c-480e-ad5d-a11ee3170d98',
      content: 'Why human gets old?',
      createdAt: '2023-11-12T13:01:10.432Z',
      answerCounts: 0,
    },
  ];

  const handleViewQuestion = () => {
    navigate('/question');
  };

  const handleSingleQuestion = (questionId: string) => {
    navigate(`/question/${questionId}`);
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

  if (!questions) {
    return (
      <BasicCard title={title}>
        <NoDataFound />
      </BasicCard>
    );
  }

  return (
    <BasicCard title={title}>
      {questions.map((question) => (
        <Box key={question.id}>
          <QuestionItem
            handleClickQuestion={() => handleSingleQuestion(question.id)}
            question={question}
          />
          <Divider />
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
        <Button size="large" onClick={handleViewQuestion}>
          View More
        </Button>
      </Box>
    </BasicCard>
  );
};

export default SelfQuestions;
