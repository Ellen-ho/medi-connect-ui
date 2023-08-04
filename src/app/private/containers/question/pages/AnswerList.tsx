import { useContext } from 'react';
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
} from '@mui/material';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { dateFormatter } from '../../../../../utils/dateFormatter';

const AnswerList: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const navigate = useNavigate();

  const handleClickAnswer = (answerId: string) => {
    navigate(`/question/answer/${answerId}`);
  };

  const { data, error } = useSWR('getAnswerList', () =>
    getAnswerList({
      query: {
        limit: 10,
        page: 1,
      },
    }),
  );

  return (
    <>
      <PrimaryPageTop pageTitle="Answer" />
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
                            secondary={`Created at ${dateFormatter(
                              answer.createdAt,
                            )}`}
                          />
                        </Grid>
                        <Grid container justifyContent="space-between">
                          <Grid item>
                            <ListItemText
                              primary={answer.thankCounts}
                              secondary={
                                answer.thankCounts > 0
                                  ? `This answer had been appreciated ${answer.thankCounts} times`
                                  : 'No appreciation yet'
                              }
                            />
                          </Grid>
                          <Grid item>
                            <ListItemText
                              primary={answer.agreeCounts}
                              secondary={
                                answer.agreeCounts > 0
                                  ? `This answer had been agreed ${answer.agreeCounts} times`
                                  : 'No agreement yet'
                              }
                            />
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
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default AnswerList;
