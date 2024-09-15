import { Box, Typography } from '@mui/material';
import consultUrl from '/src/assets/doctor_banner.png';

const HomeHeader: React.FC = () => {
  return (
    <header>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            background: `url(${consultUrl}) no-repeat top`,
            backgroundSize: 'contain',
            height: { xs: '200px', sm: '300px', md: '450px' },
          }}
        ></Box>
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
          gutterBottom
        >
          Your health is our mission!
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}
        >
          Your health is our mission. Let's walk together towards a healthier
          future.
        </Typography>
      </Box>
    </header>
  );
};

export default HomeHeader;
