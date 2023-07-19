import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { getQuestions } from '../../../../../services/QuestionService';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import useSWR from 'swr';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';

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
        rightElement={
          <Button onClick={handleClickNewQuestion} variant="contained">
            Ask Question
          </Button>
        }
      />
      <PrimaryPageContent>
        <CommonWrapper>
          <Card>
            <CardContent>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                }}
              >
                {data?.data.map((question) => (
                  <>
                    <ListItemButton
                      onClick={() => handleClickQuestion(question.id)}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <QuestionAnswerIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={question.content}
                        secondary={`Created at ${dateFormatter(
                          question.createdAt,
                        )}`}
                      />
                    </ListItemButton>
                    <Divider />
                  </>
                ))}
              </List>
            </CardContent>
          </Card>
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default QuestionList;
