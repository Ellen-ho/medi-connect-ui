import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
        height: 500,
        padding: 2,
        backgroundColor: 'rgba(224, 247, 250, 0.5)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '66.66%', paddingRight: '1.5%' }}>
        <Typography
          variant="h5"
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
          Health is a lifelong dynamic balance.Our mission is to uncover the why
          and the how, aiming for prevention rather than cure.
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{ color: 'black', lineHeight: 1.8 }}
        >
          Each health journey is personal.We strive to provide you and your
          doctor with insights and tools that extend beyond the doctor's office,
          supporting wellness every step of the way.
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
      <Card sx={{ width: '33.33%', maxHeight: 500, paddingRight: '1.5%' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Join Medi Connect today
          </Typography>

          <TextField
            label="Email address"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <FormControlLabel
            control={<Checkbox name="confirm" color="primary" />}
            label={
              <Typography variant="body2">
                By continuing, I confirm that I am over 18 years old and agree
                to Medi Connect's{' '}
                <Link href="#" underline="hover">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="#" underline="hover">
                  Privacy Policy
                </Link>
              </Typography>
            }
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginY: 2, borderRadius: '2rem' }}
            onClick={handleClick}
          >
            Get started
          </Button>

          <Typography align="center" variant="body1" component="div">
            OR
          </Typography>

          <Button
            variant="contained"
            startIcon={
              <img alt="Google logo" src="/path-to-your-google-logo" />
            }
            fullWidth
            sx={{ marginY: 1, borderRadius: '2rem' }}
          >
            Sign up with Google
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HomeJoin;
