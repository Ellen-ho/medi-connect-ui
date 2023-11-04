import { Box, Card, CardActionArea, Divider, Typography } from '@mui/material';
import HomeHeader from './HomeHeader';
import MainContent from '../../../../layout/MainContent.styled';

const HomeLanding: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <HomeHeader />
      <MainContent>
        <Divider sx={{ my: '1.5rem' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Get Your Health Questions Answered
          </Typography>
          <Typography
            variant="subtitle1"
            color={'text.secondary'}
            sx={{ fontSize: { xs: '1rem' } }}
          >
            This feature allows users to ask medical questions and receive
            answers from experienced doctors, providing quick and reliable
            medical advice.
          </Typography>
        </Box>
      </MainContent>
    </Box>
    // <Card>
    //   <CardActionArea onClick={handleClick} sx={{ p: 4, height: '100%' }}>
    //     <Box
    //       sx={{
    //         display: 'flex',
    //         flexDirection: { xs: 'column', sm: 'row' },
    //         alignItems: 'center',
    //       }}
    //     >
    //       <Box sx={{ mr: '1rem' }}>{icon}</Box>
    //       <Box>
    //         <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem' } }}>
    //           {title}
    //         </Typography>
    //         <Typography
    //           variant="subtitle1"
    //           color={'text.secondary'}
    //           sx={{ fontSize: { xs: '1rem' } }}
    //         >
    //           {subtitle}
    //         </Typography>
    //       </Box>
    //     </Box>
    //   </CardActionArea>
    // </Card>
  );
};

export default HomeLanding;
