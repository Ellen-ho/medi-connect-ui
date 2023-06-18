import { Button } from '@mui/material';
import UnderConstructionSign from '../../../../components/signs/UnderConstructionSign';
import PrimaryPageTop from '../../../layout/PrimaryPageTop';
import { useNavigate } from 'react-router-dom';

const Question: React.FC = () => {
  const navigate = useNavigate();

  const handleNewQuestion = () => {
    navigate('/question/new');
  };

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
      <UnderConstructionSign />
    </>
  );
};

export default Question;
