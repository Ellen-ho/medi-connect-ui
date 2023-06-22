import { Button } from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useEffect, useState } from 'react';
import { IQuestion } from '../../../../../types/Questions';

const AppointmentList: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const navigate = useNavigate();

  const handleNewQuestion = () => {
    navigate('/appointment/new');
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
        pageTitle="Appointment"
        leftElement={
          <Button onClick={handleNewQuestion} variant="contained">
            Make Appointment
          </Button>
        }
      />
      <PrimaryPageContent>123321</PrimaryPageContent>
    </>
  );
};

export default AppointmentList;
