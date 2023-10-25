import {
  Avatar,
  Badge,
  Box,
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
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import SearchBar from '../../../../../components/search/Search';

const QuestionList: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleClickNewQuestion = () => {
    navigate('/question/new');
  };

  const handleClickQuestion = (questionId: string) => {
    navigate(`/question/${questionId}`);
  };

  const handleSearch = (searchString: string) => {
    setSearchKeyword(searchString);
  };

  const handleClickViewAnswer = () => navigate('/question/answer');

  const { data } = useSWR(`getQuestions?q=${page}?q=${searchKeyword}`, () =>
    getQuestions({
      query: {
        limit: 10,
        page: page,
        searchKeyword: searchKeyword,
      },
    }),
  );

  return (
    <>
      <PrimaryPageTop
        pageTitle="Question"
        rightElement={
          isDoctor ? (
            <>
              <SearchBar onSearch={handleSearch} />
              <Button onClick={handleClickViewAnswer} variant="contained">
                View Your Answers
              </Button>
            </>
          ) : (
            <>
              <SearchBar onSearch={handleSearch} />
              <Button onClick={handleClickNewQuestion} variant="contained">
                Ask Question
              </Button>
            </>
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
                {data?.data
                  .filter((question) => {
                    if (searchKeyword === '') {
                      return true;
                    }
                    return question.content
                      .toLowerCase()
                      .includes(searchKeyword.toLowerCase());
                  })
                  .map((question) => (
                    <Box key={question.id}>
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
                    </Box>
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
              page={page}
              onChange={(event, page) => {
                setPage(page);
              }}
            />
          </div>
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default QuestionList;
