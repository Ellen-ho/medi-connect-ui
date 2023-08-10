import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Pagination,
  Tooltip,
} from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { getQuestions } from '../../../../../services/QuestionService';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import useSWR, { mutate } from 'swr';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { useContext } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';

const QuestionList: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const navigate = useNavigate();

  const handleClickNewQuestion = () => {
    navigate('/question/new');
  };

  const handleClickQuestion = (questionId: string) => {
    navigate(`/question/${questionId}`);
  };

  const handleClickViewAnswer = () => navigate('/question/answer');

  const { data, error } = useSWR('getQuestions', () =>
    getQuestions({
      query: {
        limit: 10,
        page: 1,
      },
    }),
  );

  return (
    <>
      <PrimaryPageTop
        pageTitle="Question"
        rightElement={
          isDoctor ? (
            <Button onClick={handleClickViewAnswer} variant="contained">
              View Your Answers
            </Button>
          ) : (
            <Button onClick={handleClickNewQuestion} variant="contained">
              Ask Question
            </Button>
          )
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
                        <Tooltip
                          title={
                            question.answerCounts > 0
                              ? 'This question had been answered'
                              : 'No answer yet'
                          }
                          placement="top"
                        >
                          <Badge
                            badgeContent={question.answerCounts}
                            color="error"
                            overlap="circular"
                          >
                            <Avatar
                              sx={{
                                bgcolor:
                                  question.answerCounts > 0
                                    ? (theme) => theme.palette.success.light
                                    : (theme) => theme.palette.grey[500],
                              }}
                            >
                              <QuestionAnswerIcon />
                            </Avatar>
                          </Badge>
                        </Tooltip>
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Pagination
              count={data?.pagination.totalPage || 1}
              page={data?.pagination.currentPage || 1}
              onChange={(event, page) => {
                const newPage = page;
                mutate('getQuestions', async () => {
                  const newData = await getQuestions({
                    query: {
                      limit: 10,
                      page: newPage,
                    },
                  });
                  return newData;
                });
              }}
            />
          </div>
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default QuestionList;
