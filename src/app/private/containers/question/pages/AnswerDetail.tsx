import { useNavigate, useParams } from 'react-router-dom';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import BasicCard from '../../../../../components/card/BasicCard';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import useSWR from 'swr';
import { getAnswerDetails } from '../../../../../services/QuestionService';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';

const AnswerDetail: React.FC = () => {
  const { answerId } = useParams();
  const navigate = useNavigate();

  const handleClickAnswer = (questionId: string) => {
    navigate(`/question/${questionId}`);
  };

  const { data, isLoading } = useSWR('getAnswerDetails', () =>
    getAnswerDetails({
      answerId: answerId as string,
    }),
  );

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <SecondaryPageTop />
        {isLoading || !data ? (
          <>Loading</>
        ) : (
          <>
            <BasicCard
              title={'Answer'}
              titleRightElement={
                <Tooltip title="See the question" placement={'top'}>
                  <IconButton
                    aria-label="See the question"
                    onClick={() => handleClickAnswer(data.questionId)}
                  >
                    <QuestionAnswerIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <Typography
                variant="body1"
                color={'text.secondary'}
                marginBottom={'.5rem'}
              >
                {data.answerContent}
              </Typography>
            </BasicCard>
            <BasicCard
              startTitleAdornment={
                <VolunteerActivismIcon sx={{ marginRight: '.5rem' }} />
              }
              title={'Appreciation from Patients'}
            >
              {/* Answers */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {data.appreciationData.length > 0 ? (
                  data.appreciationData.map((appreciation) => (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'top',
                        }}
                        key={appreciation.patientId}
                      >
                        <Avatar
                          sx={{
                            width: 35,
                            height: 35,
                          }}
                        >
                          <PersonRoundedIcon />
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
                          >
                            From a {appreciation.patientAge} old patient
                          </Typography>{' '}
                          <Typography
                            variant="body1"
                            color={'text.secondary'}
                            marginY={'.5rem'}
                          >
                            {appreciation.content}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color={'text.secondary'}
                          >
                            Said thank you on{' '}
                            {dateFormatter(appreciation.createdAt.toString())}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ my: '1rem' }} />
                    </>
                  ))
                ) : (
                  <NoDataFound label={'No appreciation for now'} />
                )}
              </Box>
            </BasicCard>
            <BasicCard
              startTitleAdornment={
                <ThumbUpAltIcon sx={{ marginRight: '.5rem' }} />
              }
              title={'Agreement from Doctors'}
            >
              {/* Answers */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {data.agreementData.length > 0 ? (
                  data.agreementData.map((agreement) => (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'top',
                        }}
                        key={agreement.agreedDoctorId}
                      >
                        <Avatar
                          sx={{
                            width: 35,
                            height: 35,
                          }}
                        >
                          <PersonRoundedIcon />
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
                          >
                            From Dr. {agreement.agreedDoctorFirstName}{' '}
                            {agreement.agreedDoctorLastName}
                          </Typography>{' '}
                          <Typography
                            variant="body1"
                            color={'text.secondary'}
                            marginY={'.5rem'}
                          >
                            {agreement.comment}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color={'text.secondary'}
                          >
                            Agree you on{' '}
                            {dateFormatter(agreement.createdAt.toString())}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ my: '1rem' }} />
                    </>
                  ))
                ) : (
                  <NoDataFound label={'No Agreement for now'} />
                )}
              </Box>
            </BasicCard>
          </>
        )}
      </CommonWrapper>
    </PrimaryPageContent>
  );
};
export default AnswerDetail;
