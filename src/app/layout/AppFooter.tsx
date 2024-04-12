import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Divider } from '@mui/material';

function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: '#143566',
        color: 'white',
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3} container alignItems="center">
          <HealthAndSafetyIcon sx={{ mr: 1 }} />
          <Typography
            variant="caption"
            display="block"
            color="white"
            fontSize={30}
            gutterBottom
          >
            Medi Connect
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="subtitle1"
            color="white"
            fontSize={18}
            gutterBottom
          >
            Product
          </Typography>
          <Link
            href="#"
            variant="body2"
            display="block"
            color="primary"
            underline="none"
            fontWeight="bold"
            fontSize={15}
          >
            Features
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="subtitle1"
            color="white"
            fontSize={18}
            gutterBottom
          >
            Health Knowledge
          </Typography>
          <Link
            href="#"
            variant="body2"
            display="block"
            color="primary"
            underline="none"
            fontWeight="bold"
            fontSize={15}
          >
            Our Blog
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="subtitle1"
            color="white"
            fontSize={18}
            gutterBottom
          >
            About Us
          </Typography>
          <Link
            href="#"
            variant="body2"
            display="block"
            color="primary"
            underline="none"
            fontWeight="bold"
            fontSize={15}
          >
            Who We Are
          </Link>
          <Link
            href="#"
            variant="body2"
            display="block"
            color="primary"
            underline="none"
            fontWeight="bold"
            fontSize={15}
          >
            Contact Us
          </Link>
        </Grid>
      </Grid>
      <Divider
        sx={{
          height: '0.1px',
          width: '100%',
          backgroundColor: 'rgba(154, 154, 154, 0.5)',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 3,
          gap: '10px',
        }}
      >
        <FacebookIcon />
        <TwitterIcon />
        <InstagramIcon />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Link href="#" underline="hover">
          Terms
        </Link>
        <Link href="#" underline="hover">
          Privacy Policy
        </Link>
      </Box>
      <Typography variant="body2" color="white" align="center" mt={3}>
        Copyright © {currentYear} HealthTap
      </Typography>
    </Box>
  );
}

export default AppFooter;
