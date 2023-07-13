import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useEffect } from 'react';

const CreateAppointment: React.FC = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();

  // const handleNewQuestion = () => {
  //   navigate('/appointment/new');
  // };

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
      <PrimaryPageTop pageTitle="Create Appointment" />
      <PrimaryPageContent>
        Let make an appointment of {doctorId}
      </PrimaryPageContent>
    </>
  );
};

export default CreateAppointment;
