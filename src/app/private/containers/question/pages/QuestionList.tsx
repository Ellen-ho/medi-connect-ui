import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  Pagination,
} from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { getQuestions } from '../../../../../services/QuestionService';
import useSWR, { mutate } from 'swr';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import SearchBar from '../../../../../components/search/Search';
import QuestionItem from '../components/QuestionItem';

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
      <PrimaryPageContent>
        <CommonWrapper>
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
          <Card>
            <CardContent>
              <Box sx={{ paddingLeft: '6px' }}>
                <SearchBar onSearch={handleSearch} />
              </Box>
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
                      <QuestionItem
                        handleClickQuestion={handleClickQuestion}
                        question={question}
                      />
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
