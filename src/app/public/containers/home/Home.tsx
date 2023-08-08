import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Home: React.FC = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  const currentYear = new Date().getFullYear();

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
        <header>
          <Typography variant="h3" gutterBottom>
            Welcome to Medi-Connect!
          </Typography>
          <Typography variant="h5">
            Your health is our mission. Let's walk together towards a healthier
            future.
          </Typography>
        </header>
        <Divider sx={{ my: '1.5rem' }} />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardActionArea
                onClick={() => handleClick('/question')}
                sx={{ p: 4 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EventNoteIcon sx={{ mr: 2 }} fontSize="large" />
                  <Box>
                    <Typography variant="h5">Ask Doctor Questions</Typography>
                    <Typography variant="subtitle1">
                      Get your health questions answered by expert doctors. Get
                      reliable information, anytime, anywhere.
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardActionArea
                onClick={() => handleClick('/record')}
                sx={{ p: 4 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FolderSharedIcon sx={{ mr: 2 }} fontSize="large" />
                  <Box>
                    <Typography variant="h5">
                      Efficient Records Management
                    </Typography>
                    <Typography variant="subtitle1">
                      All your health records in one place. Access them anytime,
                      anywhere.
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardActionArea
                onClick={() => handleClick('/health-goal')}
                sx={{ p: 4 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FitnessCenterIcon sx={{ mr: 2 }} fontSize="large" />
                  <Box>
                    <Typography variant="h5">
                      Personalized Health Goals
                    </Typography>
                    <Typography variant="subtitle1">
                      Set health goals. Track progress. Achieve milestones.
                      We're with you at every step.
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardActionArea
                onClick={() => handleClick('/doctor')}
                sx={{ p: 4 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalHospitalIcon sx={{ mr: 2 }} fontSize="large" />
                  <Box>
                    <Typography variant="h5">
                      Expert Doctor Consultations
                    </Typography>
                    <Typography variant="subtitle1">
                      Expert advice tailored to your needs, from the comfort of
                      your home.
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
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
