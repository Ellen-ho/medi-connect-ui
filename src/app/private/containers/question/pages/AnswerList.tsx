import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import {
  getAnswerDetails,
  getAnswerList,
} from '../../../../../services/QuestionService';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import {
  Grid,
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
  Tooltip,
  Typography,
  Pagination,
} from '@mui/material';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const AnswerList: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  const handleClickAnswer = (answerId: string) => {
    navigate(`/question/answer/${answerId}`);
  };

  const { data, error } = useSWR(`getAnswerList?q=${page}`, () =>
    getAnswerList({
      query: {
        limit: 10,
        page: page,
      },
    }),
  );

  return (
    <>
      <PrimaryPageTop pageTitle="Your Answer" />
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
                {data?.data.map((answer) => (
                  <>
                    <ListItemButton
                      onClick={() => handleClickAnswer(answer.id)}
                    >
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <ListItemText
                            primary={answer.content}
                            secondary={`Answered at ${dateFormatter(
                              answer.createdAt,
                            )}`}
                          />
                        </Grid>
                        <Grid container gap={'2rem'}>
                          <Grid
                            item
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '.3rem',
                            }}
                          >
                            {answer.thankCounts > 0 ? (
                              <>
                                <CheckCircleIcon color={'success'} />
                                <Typography variant="subtitle2">
                                  {`Appreciated ${answer.thankCounts} times`}
                                </Typography>
                              </>
                            ) : (
                              <>
                                <RadioButtonUncheckedIcon color={'disabled'} />
                                <Typography variant="subtitle2">
                                  No appreciation yet
                                </Typography>
                              </>
                            )}
                          </Grid>
                          <Grid
                            item
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '.3rem',
                            }}
                          >
                            {answer.agreeCounts > 0 ? (
                              <>
                                <CheckCircleIcon color={'success'} />
                                <Typography variant="subtitle2">
                                  {`Agreed ${answer.agreeCounts} times`}
                                </Typography>
                              </>
                            ) : (
                              <>
                                <RadioButtonUncheckedIcon color={'disabled'} />
                                <Typography variant="subtitle2">
                                  No agreement yet
                                </Typography>
                              </>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
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

export default AnswerList;
