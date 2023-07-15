import { useNavigate, useParams } from 'react-router-dom';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { QuestionDetailWrapper } from './QuestionDetail.styled';
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
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

const mockResponse = {
  question: {
    content:
      'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs.',
    askerAge: 27,
  },
  answers: [
    {
      id: 'de4d2799-6c93-4e5c-bf31-d15e7637b045',
      content:
        'Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix',
      avatar: 'https://i.pravatar.cc/200?img=5',
      createdAt: '2022-12-31T16:00:00.000Z', // not yet implemented
      doctorId: '22f00713-2ce1-49de-a09b-89addb0f69f1', // not yet implemented
      firstName: 'Candy',
      lastName: 'Chen',
      specialties: ['Cardiology', 'Oncology', 'Neurology'],
      careerStartDate: '2009-12-31T16:00:00.000Z',
      thankCounts: '0',
      isThanked: false,
      doctorAvatars: [
        'https://i.pravatar.cc/200?img=2',
        'https://i.pravatar.cc/200?img=7',
        null,
        null,
        null,
      ],
    },
    {
      id: 'de4d2799-6c93-4e5c-bf31-d15e7637b045',
      content:
        'Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix',
      avatar: 'https://i.pravatar.cc/200?img=5',
      createdAt: '2022-12-31T16:00:00.000Z', // not yet implemented
      doctorId: '22f00713-2ce1-49de-a09b-89addb0f69f1', // not yet implemented
      firstName: 'Candy',
      lastName: 'Chen',
      specialties: ['Cardiology', 'Oncology', 'Neurology'],
      careerStartDate: '2009-12-31T16:00:00.000Z',
      thankCounts: '0',
      isThanked: false,
      doctorAvatars: [
        'https://i.pravatar.cc/200?img=2',
        'https://i.pravatar.cc/200?img=7',
        null,
        null,
        null,
      ],
    },
  ],
};

// QuestionDetail
const QuestionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();

  const data = mockResponse;

  const handleClickDoctor = (doctorId: string) => {
    navigate(`/doctor/${doctorId}`);
  };

  const handleToggleThankDoctorAnswer = (answer: any) => {
    if (answer.isThanked) {
      // unthank
    } else {
      // thank
    }
  };

  return (
    <>
      <SecondaryPageTop />
      <PrimaryPageContent>
        <QuestionDetailWrapper>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" marginBottom={'1rem'}>
                Question
              </Typography>
              <Typography
                variant="body1"
                color={'text.secondary'}
                marginBottom={'1rem'}
              >
                {data.question.content}
              </Typography>
              <Divider sx={{ my: '1rem' }} />
              <Typography gutterBottom variant="h6" marginBottom={'1rem'}>
                Answers
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {data.answers.map((answer) => (
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
                        sx={{ width: 50, height: 50, cursor: 'pointer' }}
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
                          {fromNowFormatter(answer.careerStartDate)} experience
                          in {answer.specialties.join(', ')}
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
                          Answered on {dateFormatter(answer.createdAt)}
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
                              {answer.doctorAvatars.map((avatarUrl) => (
                                <Avatar src={avatarUrl} key={avatarUrl}>
                                  {avatarUrl == null ? <Face6Icon /> : ''}
                                </Avatar>
                              ))}
                            </AvatarGroup>
                            <Typography
                              variant="subtitle1"
                              color={'text.secondary'}
                              sx={{ ml: '1rem' }}
                            >
                              {answer.doctorAvatars.length} doctor agreed
                            </Typography>
                          </Box>
                          {/* Thank button */}
                          <Box>
                            <Tooltip title="Send thanks to the doctor">
                              <IconButton
                                color="warning"
                                onClick={() =>
                                  handleToggleThankDoctorAnswer(answer.id)
                                }
                              >
                                {answer.isThanked ? (
                                  <FavoriteIcon />
                                ) : (
                                  <FavoriteBorderIcon />
                                )}
                              </IconButton>
                            </Tooltip>
                            {answer.thankCounts}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Divider sx={{ my: '1rem' }} />
                  </>
                ))}
              </Box>
            </CardContent>
          </Card>
        </QuestionDetailWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default QuestionDetail;
