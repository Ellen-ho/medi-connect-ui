import React from 'react';
import { useParams } from 'react-router-dom';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import useSWR from 'swr';
import { getDoctorProfile } from '../../../../../services/DoctorServices';
import { DoctorDetailWrapper } from './DoctorDetail.styled';
import { Typography, Divider, Box, Avatar, Stack, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import addressFormatter from '../../../../../utils/addressFormatter';
import { fromNowFormatter } from '../../../../../utils/fromNowFormatter';
import Calendar from '../../../../../components/calendar/calendar';
import BasicCard from '../../../../../components/card/BasicCard';

const MAP_API_KEY = '';

const mockResponse = {
  id: 'de4d2799-6c93-4e5c-bf31-d15e7637b045',
  avatar: 'https://i.pravatar.cc/200?img=5',
  firstName: 'Amy',
  lastName: 'Chen',
  gender: 'FEMALE',
  aboutMe:
    'I am a highly skilled doctor with over 10 years of experience in treating various illnesses.',
  languagesSpoken: ['English', 'Spanish', 'French'],
  careerStartDate: '2009-12-31T16:00:00.000Z',
  specialties: ['Cardiology', 'Oncology', 'Neurology'],
  officePracticalLocation: {
    city: 'Los Angeles',
    line1: '123 Main St.',
    line2: 'Suite 200',
    country: 'United States',
    postalCode: '90001',
    countryCode: 'US',
    stateProvince: 'California',
  },
  education: ['Doctor of Medicine, University of California, Los Angeles'],
  awards: ['Best Doctor Award 2015'],
  affiliations: ['American Medical Association'],
  createdAt: '2023-06-22T12:53:23.432Z',
  updatedAt: '2023-06-22T12:53:23.432Z',
};

const mockResponseStatistic = {
  id: '22f00713-2ce1-49de-a09b-89addb0f69f1',
  answerCounts: 3,
  thankedCounts: 1,
  beAgreedCounts: 2,
};

const DoctorDetail: React.FC = () => {
  const { doctorId } = useParams();

  const data = mockResponse;
  const doctorStatistic = mockResponseStatistic;

  //   const { data, error } = useSWR('getRecords', () =>

  //   }),
  // );
  return (
    <>
      <SecondaryPageTop />
      <PrimaryPageContent>
        <DoctorDetailWrapper>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              mb: '20px',
            }}
          >
            <Avatar
              alt={data.firstName}
              src={data.avatar}
              sx={{ width: 180, height: 180 }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '30px',
              }}
            >
              <Typography variant="h4" fontWeight={'bold'}>
                Dr. {data.firstName} {data.lastName}
              </Typography>
              <Typography variant="body1" color={'text.secondary'}>
                {`${fromNowFormatter(data.careerStartDate)} experience in`}{' '}
                {data.specialties.join(', ')} | {data.gender}
              </Typography>
              <Divider sx={{ my: '20px' }} />
              <Typography variant="body1" color={'text.secondary'}>
                {data.aboutMe}
              </Typography>
            </Box>
          </Box>
          <BasicCard title={'Doctor Q&A'}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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
                  {doctorStatistic.answerCounts}
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
                  {doctorStatistic.beAgreedCounts}
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
                  {doctorStatistic.thankedCounts}
                </Typography>
              </Box>
            </Box>
          </BasicCard>
          <BasicCard title={'Languages spoken'}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Stack direction="row" spacing={1}>
                {data.languagesSpoken.map((language) => (
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
              {data.education.map((education, index) => (
                <>
                  <Box
                    key={index}
                    sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
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
              {data.awards.map((award, index) => (
                <>
                  <Box
                    key={index}
                    sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
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
              {data.affiliations.map((affiliation, index) => (
                <>
                  <Box
                    key={index}
                    sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <LocationOnIcon />
                <Typography
                  variant="body1"
                  color={'text.secondary'}
                  lineHeight={'4rem'}
                >
                  {addressFormatter(data.officePracticalLocation)}
                </Typography>
              </Box>
            </Box>
            <iframe
              width="100%"
              height="450"
              style={{ border: '0' }}
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?q=${addressFormatter(
                data.officePracticalLocation,
              )}&key=${MAP_API_KEY}`}
            ></iframe>
          </BasicCard>
          <BasicCard title={'Appointment Time Slot'}>
            <Calendar />
          </BasicCard>
        </DoctorDetailWrapper>
      </PrimaryPageContent>
    </>
  );
};
export default DoctorDetail;
