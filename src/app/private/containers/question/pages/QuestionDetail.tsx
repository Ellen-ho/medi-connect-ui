import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { QuestionDetailWrapper } from './QuestionDetail.styled';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
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
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import toast from 'react-hot-toast';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';

const QuestionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const [isThankDialogOpen, setIsThankDialogOpen] = useState(false);
  const [isAgreeDialogOpen, setIsAgreeDialogOpen] = useState(false);
  const [selectedAppreciationAnswerId, setSelectedAppreciationAnswerId] =
    useState<string | null>(null);
  const [selectedAgreeAnswerId, setSelectedAgreeAnswerId] = useState<
    string | null
  >(null);
  const [thankContent, setThankContent] = useState('');
  const [agreeContent, setAgreeContent] = useState('');

  const handleClickDoctor = (doctorId: string) => {
    navigate(`/doctor/${doctorId}`);
  };

  const handleToggleThankDoctorAnswer = async (answer: IAnswer) => {
    if (answer.isThanked) {
      await cancelAppreciation({
        answerId: answer.answerId,
      });
      mutate();
      toast.success('Unsent the appreciation successfully');
    } else {
      setSelectedAppreciationAnswerId(answer.answerId);
      setIsThankDialogOpen(true); // open dialog
    }
  };

  const handleSubmitThankContent = async () => {
    if (thankContent && selectedAppreciationAnswerId) {
      await createAppreciation({
        content: thankContent,
        answerId: selectedAppreciationAnswerId,
      });
      setIsThankDialogOpen(false);
      setThankContent('');
      mutate();
      toast.success('Thank you for your appreciation!');
    }
  };

  const handleToggleAgreeDoctorAnswer = async (answer: IAnswer) => {
    if (answer.isAgreed) {
      await cancelAgreement({
        answerId: answer.answerId,
      });
      mutate();
      toast.success('Canceled the agreement successfully');
    } else {
      setSelectedAgreeAnswerId(answer.answerId);
      setIsAgreeDialogOpen(true);
    }
  };

  const handleSubmitAgreeContent = async () => {
    if (agreeContent && selectedAgreeAnswerId) {
      await createAgreemewnt({
        answerId: selectedAgreeAnswerId,
        comment: agreeContent,
      });
      setIsAgreeDialogOpen(false);
      setAgreeContent('');
      mutate();
      toast.success('Agreed with the answer successfully');
    }
  };

  const { data, mutate } = useSWR('getSingleQuestion', () =>
    getSingleQuestion({
      patientQuestionId: questionId as string,
    }),
  );

  const isAnsweredByCurrecntDoctor = data?.answers.some(
    (answer) => answer.isAnswerByMe,
  );

  return (
    <>
      <PrimaryPageContent>
        <CommonWrapper>
          <SecondaryPageTop />
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
                <Typography variant="subtitle2">
                  by a {data.question.askerAge} years old user
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
                            sx={{
                              width: 50,
                              height: 50,
                              cursor: 'pointer',
                            }}
                            onClick={() => handleClickDoctor(answer.doctorId)}
                          >
                            {answer.avatar !== null ? (
                              <img
                                src={answer.avatar}
                                alt={answer.firstName}
                                width={'100%'}
                                height={'100%'}
                              />
                            ) : (
                              <PersonRoundedIcon />
                            )}
                          </Avatar>
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
                                      <Avatar key={agreedDoctor.doctorId}>
                                        {agreedDoctor.avatar !== null ? (
                                          <img
                                            src={agreedDoctor.avatar}
                                            alt={agreedDoctor.firstName}
                                            width={'100%'}
                                            height={'100%'}
                                          />
                                        ) : (
                                          <Face6Icon />
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
                                {isDoctor && !answer.isAnswerByMe && (
                                  <Tooltip
                                    title={
                                      answer.isAgreed
                                        ? 'Cancel the agreement'
                                        : 'Agree with this answer'
                                    }
                                    placement="top"
                                  >
                                    <IconButton
                                      color="primary"
                                      onClick={() => {
                                        handleToggleAgreeDoctorAnswer(answer);
                                      }}
                                    >
                                      {answer.isAgreed ? (
                                        <ThumbUpIcon />
                                      ) : (
                                        <ThumbUpOffAltIcon />
                                      )}
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Box>
                              {/* Patient Thank button */}
                              <Box sx={{ display: 'flex', gap: '.3rem' }}>
                                <Tooltip
                                  title={
                                    answer.isThanked
                                      ? 'Unsend thanks to the doctor'
                                      : 'Send thanks to the doctor'
                                  }
                                  placement="top"
                                >
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

          {isDoctor && (
            <BasicCard title={'Provide Your Answer'}>
              {isAnsweredByCurrecntDoctor ? (
                <NoDataFound
                  icon={<QuestionAnswerOutlinedIcon fontSize="small" />}
                  label={'You have already answered this question'}
                />
              ) : (
                <>
                  {questionId && (
                    <CreateAnswer
                      questionId={questionId}
                      onCreateCallback={mutate}
                    />
                  )}
                </>
              )}
            </BasicCard>
          )}
        </CommonWrapper>
      </PrimaryPageContent>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={isThankDialogOpen}
        onClose={() => setIsThankDialogOpen(false)}
      >
        <DialogTitle>Enter Thank Content</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            fullWidth
            onChange={(e) => setThankContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsThankDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitThankContent} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isAgreeDialogOpen}
        onClose={() => setIsAgreeDialogOpen(false)}
      >
        <DialogTitle>Enter Agree Comment</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            fullWidth
            onChange={(e) => setAgreeContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAgreeDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitAgreeContent} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuestionDetail;
