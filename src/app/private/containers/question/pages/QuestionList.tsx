import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { getQuestions } from '../../../../../services/QuestionService';
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded';
import useSWR from 'swr';

const QuestionList: React.FC = () => {
  const navigate = useNavigate();
  const { data, error } = useSWR('getQuestions', () =>
    getQuestions({
      query: {
        limit: 10,
        page: 1,
      },
    }),
  );

  const handleClickNewQuestion = () => {
    navigate('/question/new');
  };

  const handleClickQuestion = (questionId: string) => {
    navigate(`/question/${questionId}`);
  };

  return (
    <>
      <PrimaryPageTop
        pageTitle="Question"
        leftElement={
          <Button onClick={handleClickNewQuestion} variant="contained">
            Ask Question
          </Button>
        }
      />
      <PrimaryPageContent>
        <List>
          {data?.data.map((question) => (
            <ListItemButton
              key={question.id}
              onClick={() => handleClickQuestion(question.id)}
            >
              <ListItemIcon>
                <LiveHelpRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary={question.content}
                secondary={question.createdAt}
              />
            </ListItemButton>
          ))}
        </List>
      </PrimaryPageContent>
    </>
  );
};

export default QuestionList;
