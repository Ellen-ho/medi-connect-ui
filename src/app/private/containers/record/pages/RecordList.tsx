import { Button } from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useEffect, useState } from 'react';
import { IQuestion } from '../../../../../types/Questions';

const RecordList: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const navigate = useNavigate();

  const handleNewQuestion = () => {
    navigate('/record/new');
  };

  useEffect(() => {
    const fetchData = async () => {
      // const { data, pagination } = await getQuestions({
      //   query: {
      //     page: 1,
      //     limit: 10,
      //   },
      // });
      // setQuestions(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <PrimaryPageTop
        pageTitle="Record"
        leftElement={
          <Button onClick={handleNewQuestion} variant="contained">
            Add Record
          </Button>
        }
      />
      <PrimaryPageContent>123321</PrimaryPageContent>
    </>
  );
};

export default RecordList;
