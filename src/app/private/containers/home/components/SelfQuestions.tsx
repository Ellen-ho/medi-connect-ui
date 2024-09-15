import { useNavigate } from 'react-router-dom';
import BasicCard from '../../../../../components/card/BasicCard';
import useSWR from 'swr';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import { Box, Button, Divider, Skeleton } from '@mui/material';
import QuestionItem from '../../question/components/QuestionItem';
import { getQuestions } from '../../../../../services/QuestionService';
import { useContext } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

const SelfQuestions: React.FC = () => {
  const title = 'Your Questions';
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);

  const { data } = useSWR(`getQuestions?q=askerId`, () => {
    const askerId = state.patientId ? { askerId: state.patientId } : {};
    const query = {
      limit: 2,
      page: 1,
      searchKeyword: '',
      ...askerId,
    };

    return getQuestions({
      query,
    });
  });

  const questions = data?.data;

  const handleViewQuestion = () => {
    navigate('/question');
  };

  const handleSingleQuestion = (questionId: string) => {
    navigate(`/question/${questionId}`);
  };

  if (!questions) {
    return (
      <BasicCard title={title}>
        <NoDataFound
          icon={<NotListedLocationIcon />}
          label="You haven't asked any questions yet."
        ></NoDataFound>
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
