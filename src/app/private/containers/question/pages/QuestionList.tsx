import { Button } from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useEffect, useState } from 'react';
import { getQuestions } from '../../../../../services/QuestionService';
import { IQuestion } from '../../../../../types/Questions';

const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const navigate = useNavigate();

  const handleNewQuestion = () => {
    navigate('/question/new');
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, pagination } = await getQuestions({
        query: {
          page: 1,
          limit: 10,
        },
      });
      setQuestions(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <PrimaryPageTop
        pageTitle="Question"
        leftElement={
          <Button onClick={handleNewQuestion} variant="contained">
            Ask Question
          </Button>
        }
      />
      <PrimaryPageContent>123321</PrimaryPageContent>
    </>
  );
};

export default QuestionList;
