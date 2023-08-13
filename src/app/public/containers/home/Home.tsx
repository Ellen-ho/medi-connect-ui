import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import React from 'react';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ServiceEntrance from './components/ServiceEntrance';
import HomeHeader from './components/HomeHeader';

const Home: React.FC = () => {
  const { state } = useContext(AuthContext);
  const hasProfile = state.hasProfile;
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  const currentYear = new Date().getFullYear();

  if (!hasProfile) {
    navigate('/profile');
  }

  return (
    <>
      <Box
        sx={{
          m: 4,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <HomeHeader
          title={'Welcome to Medi-Connect!'}
          subtitle={
            "Your health is our mission. Let's walk together towards a healthier future."
          }
        />
        <Divider sx={{ my: '1.5rem' }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <ServiceEntrance
              handleClick={() => handleClick('/question')}
              title={'Ask Doctor Questions'}
              subtitle={
                'Get your health questions answered by expert doctors. Get reliable information, anytime, anywhere.'
              }
              icon={<EventNoteIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <ServiceEntrance
              handleClick={() => handleClick('/record')}
              title={'Efficient Records Management'}
              subtitle={
                'All your health records in one place. Access them anytime anywhere.'
              }
              icon={<FolderSharedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <ServiceEntrance
              handleClick={() => handleClick('/health-goal')}
              title={'Personalized Health Goals'}
              subtitle={
                "Set health goals. Track progress. Achieve milestones. We're with you at every step."
              }
              icon={<FitnessCenterIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <ServiceEntrance
              handleClick={() => handleClick('/doctor')}
              title={'Expert Doctor Consultations'}
              subtitle={
                'Expert advice tailored to your needs, from the comfort of your home.'
              }
              icon={<LocalHospitalIcon fontSize="large" />}
            />
          </Grid>
        </Grid>
        <footer
          style={{
            marginTop: 'auto',
            padding: '1rem 0',
            backgroundColor: '#f5f5f5',
            textAlign: 'center',
          }}
        >
          <Container>
            <Typography variant="body2" color="textSecondary">
              Copyright ©{currentYear} Medi Connect
            </Typography>
          </Container>
        </footer>
      </Box>
    </>
  );
};

export default Home;
