import React from 'react';
import { useParams } from 'react-router-dom';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import {
  getDoctorProfile,
  getDoctorStatistic,
} from '../../../../../services/DoctorServices';
import { DoctorDetailWrapper } from './DoctorDetail.styled';
import { Typography, Divider, Box, Avatar, Stack, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import addressFormatter from '../../../../../utils/addressFormatter';
import { fromNowFormatter } from '../../../../../utils/fromNowFormatter';
import BasicCard from '../../../../../components/card/BasicCard';
import DoctorAppointmentCalendar from '../components/DoctorAppointmentCalendar';
import {
  createConsultAppointmentRecord,
  getDoctorTimeSlots,
} from '../../../../../services/ConsultationService';
import useSWR from 'swr';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// TODO: remove this to env
const MAP_API_KEY = 'AIzaSyBEI_3kBwvdfukP1FONBej8ELqWguE3azk';

const DoctorDetail: React.FC = () => {
  const { doctorId } = useParams();
  const { data: doctorDetail } = useSWR('getDoctorProfile', () =>
    getDoctorProfile(doctorId as string),
  );

  const { data: doctorStatistic } = useSWR('getDoctorStatistic', () =>
    getDoctorStatistic(doctorId as string),
  );

  const { data: doctorTimeSlot } = useSWR('getDoctorTimeSlots', () =>
    getDoctorTimeSlots({
      doctorId: doctorId as string,
      query: {
        startTime: '2023-08-01',
        endTime: '2023-08-31',
      },
    }),
  );

  const handleBookDoctorTimeSlot = (doctorTimeSlotId: string) => {
    createConsultAppointmentRecord({ doctorTimeSlotId });
  };

  return (
    <>
      <SecondaryPageTop />
      <PrimaryPageContent>
        <DoctorDetailWrapper>
          {doctorDetail ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  mb: '20px',
                }}
              >
                 {doctorDetail.avatar ? (
                  <Avatar
                    alt={doctorDetail.firstName}
                    src={doctorDetail.avatar}
                    sx={{ width: 180, height: 180 }}
                  />
                ) : (
                  <AccountCircleIcon/>
                )}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '30px',
                  }}
                >
                  <Typography variant="h4" fontWeight={'bold'}>
                    Dr. {doctorDetail.firstName} {doctorDetail.lastName}
                  </Typography>
                  <Typography variant="body1" color={'text.secondary'}>
                    {`${fromNowFormatter(
                      doctorDetail.careerStartDate.toString(),
                    )} experience in`}{' '}
                    {doctorDetail.specialties.join(', ')} |{' '}
                    {doctorDetail.gender}
                  </Typography>
                  <Divider sx={{ my: '20px' }} />
                  <Typography variant="body1" color={'text.secondary'}>
                    {doctorDetail.aboutMe}
                  </Typography>
                </Box>
              </Box>
              <BasicCard title={'Doctor Q&A'}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      color={'text.secondary'}
                      lineHeight={'1rem'}
                    >
                      Answers provided
                    </Typography>
                    <Typography
                      variant="h3"
                      color={'text.primary'}
                      lineHeight={'3rem'}
                    >
                      {doctorStatistic?.answerCounts}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      color={'text.secondary'}
                      lineHeight={'1rem'}
                    >
                      Agrees given
                    </Typography>
                    <Typography
                      variant="h3"
                      color={'text.primary'}
                      lineHeight={'3rem'}
                    >
                      {doctorStatistic?.beAgreedCounts}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      color={'text.secondary'}
                      lineHeight={'1rem'}
                    >
                      Thank you notes
                    </Typography>
                    <Typography
                      variant="h3"
                      color={'text.primary'}
                      lineHeight={'3rem'}
                    >
                      {doctorStatistic?.thankedCounts}
                    </Typography>
                  </Box>
                </Box>
              </BasicCard>
              <BasicCard title={'Languages spoken'}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Stack direction="row" spacing={1}>
                    {doctorDetail.languagesSpoken.map((language) => (
                      <Chip
                        key={language}
                        label={language}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Box>
              </BasicCard>
              <BasicCard title={'Education'}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {doctorDetail.education.map((education, index) => (
                    <>
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        <SchoolIcon />
                        <Typography
                          variant="body1"
                          color={'text.secondary'}
                          lineHeight={'4rem'}
                        >
                          {education}
                        </Typography>
                      </Box>
                      <Divider />
                    </>
                  ))}
                </Box>
              </BasicCard>
              <BasicCard title={'Awards'}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {doctorDetail.awards?.map((award, index) => (
                    <>
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        <MilitaryTechIcon />
                        <Typography
                          variant="body1"
                          color={'text.secondary'}
                          lineHeight={'4rem'}
                        >
                          {award}
                        </Typography>
                      </Box>
                      <Divider />
                    </>
                  ))}
                </Box>
              </BasicCard>
              <BasicCard title={'Affiliations'}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {doctorDetail.affiliations?.map((affiliation, index) => (
                    <>
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        <MenuBookIcon />
                        <Typography
                          variant="body1"
                          color={'text.secondary'}
                          lineHeight={'4rem'}
                        >
                          {affiliation}
                        </Typography>
                      </Box>
                      <Divider />
                    </>
                  ))}
                </Box>
              </BasicCard>
              <BasicCard title={'Practical location'}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                  >
                    <LocationOnIcon />
                    <Typography
                      variant="body1"
                      color={'text.secondary'}
                      lineHeight={'4rem'}
                    >
                      {addressFormatter(doctorDetail.officePracticalLocation)}
                    </Typography>
                  </Box>
                </Box>
                <iframe
                  width="100%"
                  height="450"
                  style={{ border: '0' }}
                  loading="lazy"
                  src={`https://www.google.com/maps/embed/v1/place?q=${addressFormatter(
                    doctorDetail.officePracticalLocation,
                  )}&key=${MAP_API_KEY}`}
                ></iframe>
              </BasicCard>
              <BasicCard title={'Appointment Time Slot'}>
                <DoctorAppointmentCalendar
                  events={doctorTimeSlot?.timeSlots || []}
                  doctorName={`${doctorDetail.firstName} ${doctorDetail.lastName}`}
                  eventClickCallback={handleBookDoctorTimeSlot}
                />
              </BasicCard>
            </>
          ) : (
            <NoDataFound />
          )}
        </DoctorDetailWrapper>
      </PrimaryPageContent>
    </>
  );
};
export default DoctorDetail;
