import { useNavigate, useParams } from 'react-router-dom';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { QuestionDetailWrapper } from './QuestionDetail.styled';
import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import { fromNowFormatter } from '../../../../../utils/fromNowFormatter';
import Face6Icon from '@mui/icons-material/Face6';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useSWR from 'swr';
import {
  IAnswer,
  cancelAgreement,
  cancelAppreciation,
  createAgreemewnt,
  createAppreciation,
  getSingleQuestion,
} from '../../../../../services/QuestionService';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import CreateAnswer from '../components/CreateAnswer';
import BasicCard from '../../../../../components/card/BasicCard';
import { useContext } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const QuestionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;

  const handleClickDoctor = (doctorId: string) => {
    navigate(`/doctor/${doctorId}`);
  };

  const handleToggleThankDoctorAnswer = async (answer: IAnswer) => {
    if (answer.isThanked) {
      await cancelAppreciation({
        answerAppreciationId: answer.answerId,
      });
    } else {
      await createAppreciation({
        content: '',
        answerId: answer.answerId,
      });
    }
  };

  const handleToggleAgreeDoctorAnswer = async (answer: IAnswer) => {
    alert('not yet implemented handleToggleAgreeDoctorAnswer');
    // if (answer.isDoctorAgreed) {
    //   await cancelAgreement({
    //     answerAgreementId: '',
    //   });
    // } else {
    //   await createAgreemewnt({
    //     answerId: '',
    //     comment: '',
    //   });
    // }
  };

  const { data, mutate } = useSWR('getSingleQuestion', () =>
    getSingleQuestion({
      patientQuestionId: questionId as string,
    }),
  );

  return (
    <>
      <SecondaryPageTop />
      <PrimaryPageContent>
        <QuestionDetailWrapper>
          <BasicCard title={'Question'}>
            {data ? (
              <>
                <Typography
                  variant="body1"
                  color={'text.secondary'}
                  marginBottom={'.5rem'}
                >
                  {data.question.content}
                </Typography>
                <Divider sx={{ my: '1rem' }} />
                <Typography gutterBottom variant="h6" marginBottom={'.5rem'}>
                  Answers
                </Typography>
                {/* Answers */}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {data.answers.length > 0 ? (
                    data.answers.map((answer) => (
                      <>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'top',
                          }}
                        >
                          <Avatar
                            alt={answer.firstName}
                            src={answer.avatar}
                            sx={{
                              width: 50,
                              height: 50,
                              cursor: 'pointer',
                            }}
                            onClick={() => handleClickDoctor(answer.doctorId)}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              paddingLeft: '15px',
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ cursor: 'pointer' }}
                              onClick={() => handleClickDoctor(answer.doctorId)}
                            >
                              Dr. {answer.firstName} {answer.lastName}
                            </Typography>{' '}
                            <Typography variant="subtitle2">
                              {fromNowFormatter(
                                answer.careerStartDate.toString(),
                              )}{' '}
                              experience in {answer.specialties.join(', ')}
                            </Typography>
                            <Typography
                              variant="body1"
                              color={'text.secondary'}
                              marginY={'.5rem'}
                            >
                              {answer.content}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color={'text.secondary'}
                            >
                              Answered on{' '}
                              {dateFormatter(answer.answerCreatedAt.toString())}
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                py: '1rem',
                              }}
                            >
                              {/* Agreed doctors group */}
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <AvatarGroup max={3}>
                                  {answer.agreedDoctors.length > 0 ? (
                                    answer.agreedDoctors.map((agreedDoctor) => (
                                      <Avatar
                                        src={agreedDoctor.avatar}
                                        key={agreedDoctor.doctorId}
                                      >
                                        {agreedDoctor.avatar == null ? (
                                          <Face6Icon />
                                        ) : (
                                          ''
                                        )}
                                      </Avatar>
                                    ))
                                  ) : (
                                    <Avatar>
                                      <Face6Icon />
                                    </Avatar>
                                  )}
                                </AvatarGroup>
                                <Typography
                                  variant="subtitle1"
                                  color={'text.secondary'}
                                  sx={{ ml: '.5rem' }}
                                >
                                  {answer.agreedDoctors.length} doctor agreed
                                </Typography>
                                {/* Doctor Agree button */}
                                <Tooltip title="Agree with this answer">
                                  <IconButton
                                    color="primary"
                                    onClick={() => {
                                      handleToggleAgreeDoctorAnswer(answer);
                                    }}
                                  >
                                    {/* TODO answer.isDoctorAgreed */}
                                    {false ? (
                                      <ThumbUpIcon />
                                    ) : (
                                      <ThumbUpOffAltIcon />
                                    )}
                                  </IconButton>
                                </Tooltip>
                              </Box>
                              {/* Patient Thank button */}
                              <Box sx={{ display: 'flex', gap: '.3rem' }}>
                                <Tooltip title="Send thanks to the doctor">
                                  <Chip
                                    icon={
                                      answer.isThanked ? (
                                        <FavoriteIcon />
                                      ) : (
                                        <FavoriteBorderIcon />
                                      )
                                    }
                                    label={answer.thankCounts}
                                    color="warning"
                                    variant="outlined"
                                    sx={{ px: '.2rem' }}
                                    disabled={isDoctor}
                                    onClick={() => {
                                      if (isDoctor) return;
                                      handleToggleThankDoctorAnswer(answer);
                                    }}
                                  />
                                </Tooltip>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Divider sx={{ my: '1rem' }} />
                      </>
                    ))
                  ) : (
                    <NoDataFound
                      icon={<QuestionAnswerOutlinedIcon fontSize="small" />}
                      label={'No answer for now'}
                    />
                  )}
                </Box>
              </>
            ) : (
              <NoDataFound />
            )}
          </BasicCard>

          <BasicCard title={'Provide Your Answer'}>
            {questionId && (
              <CreateAnswer questionId={questionId} onCreateCallback={mutate} />
            )}
          </BasicCard>
        </QuestionDetailWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default QuestionDetail;
