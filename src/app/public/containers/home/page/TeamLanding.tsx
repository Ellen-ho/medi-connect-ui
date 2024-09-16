import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import DoctorCarousel from '../components/DoctorCarousel';
import MissionCard from '../components/MissionCard';
import HomeLandingLayout from '../../../../layout/HomeLandingLayout';
import Typewriter from '../../../../private/containers/home/components/TypeWriter';

const TeamLanding: React.FC = () => {
  return (
    <HomeLandingLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: '1.5rem',
          mt: '1.5rem',
        }}
      >
        <Typewriter text="Hello, We Are Your Health Guardians!" />
      </Box>
      <Box sx={{ mb: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            maxWidth: '1280px',
            gap: '1rem',
          }}
        >
          <MissionCard />
          <DoctorCarousel />
        </Box>
      </Box>
      <Box
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '350px',
          marginBottom: '30px',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 4,
            width: '100%',
            maxWidth: 1280,
            bgcolor: '#E0E0E0',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            gutterBottom
          >
            Your health, always our priority
          </Typography>
          <>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Our dedicated professionals do more than just provide expert
              medical care in the clinic. We are committed to deeply
              understanding each patient's lifestyle, as well as their physical
              and mental states.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Our goal is to help patients better understand their own body and
              mind, empowering them to take charge of their own health.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Our team of expert physicians forms a cohesive medical group,
              offering customized and accurate health education. We accompany
              and safeguard each patient throughout their health journey.
            </Typography>
          </>
        </Paper>
      </Box>
    </HomeLandingLayout>
  );
};
export default TeamLanding;
