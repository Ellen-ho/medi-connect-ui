import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SignUpCard from '../../signup/components/SignUpCard';

const HomeJoin: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signUp');
  };
  return (
    <Box
      sx={{
        margin: 'auto',
        maxWidth: 1200,
        padding: '35px',
        backgroundColor: 'rgba(224, 247, 250, 0.5)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '20px',
      }}
    >
      <Box sx={{ width: '66.66%', paddingRight: '1.5%' }}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight={900}
          sx={{
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            marginBottom: '1.5rem',
          }}
        >
          {'Join to Understand Your Health Better'}
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{ color: 'black', lineHeight: 1.8 }}
        >
          Health is a lifelong dynamic balance. Our dedicated medical team is
          committed to maintaining your health fundamentally.
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{ color: 'black', lineHeight: 1.8 }}
        >
          Beyond the limited time in a clinical setting, we accompany you in
          understanding and tracking physiological data and lifestyle records.
          From us, you receive professional and personalized health education
          tailored to support your wellness journey every step of the way.
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{ color: '#1A237E' }}
          fontWeight={900}
        >
          Create your free account and start managing your health.
        </Typography>
      </Box>
      <Box sx={{ width: '33.33%', paddingRight: '1.5%' }}>
        <SignUpCard title="Join Medi Connect today" />
      </Box>
    </Box>
  );
};

export default HomeJoin;
