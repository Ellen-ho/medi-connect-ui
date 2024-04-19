import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Divider } from '@mui/material';
import { mq } from '../../styles/media-query';

function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#143566',
        color: 'white',
      }}
    >
      <Box
        sx={{
          width: '1280px',
        }}
      >
        <Grid container sx={{ padding: '25px' }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            container
            alignItems="center"
            sx={mq({
              justifyContent: ['center', 'center', 'start'],
            })}
          >
            <HealthAndSafetyIcon sx={{ mr: 1 }} />
            <Typography
              variant="caption"
              display="block"
              color="white"
              fontSize={30}
            >
              Medi Connect
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Box
              sx={mq({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: ['10px', '10px', '100px'],
              })}
            >
              <Box>
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
              </Box>
              <Box>
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
                  sx={{ marginBottom: 2 }}
                >
                  Our Blog
                </Link>
                <Link
                  href="/article/health-matrix"
                  variant="body2"
                  display="block"
                  color="primary"
                  underline="none"
                  fontWeight="bold"
                  fontSize={15}
                  sx={{ marginBottom: 2 }}
                >
                  Health Matrix Data Types
                </Link>
                <Link
                  href="/article/life-style"
                  variant="body2"
                  display="block"
                  color="primary"
                  underline="none"
                  fontWeight="bold"
                  fontSize={15}
                >
                  Life Style Data Types
                </Link>
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  color="white"
                  fontSize={18}
                  gutterBottom
                >
                  About Us
                </Typography>
                <Link
                  href="/team"
                  variant="body2"
                  display="block"
                  color="primary"
                  underline="none"
                  fontWeight="bold"
                  fontSize={15}
                  sx={{ marginBottom: 2 }}
                >
                  Who We Are
                </Link>
                <Link
                  href="/contact"
                  variant="body2"
                  display="block"
                  color="primary"
                  underline="none"
                  fontWeight="bold"
                  fontSize={15}
                >
                  Contact Us
                </Link>
              </Box>
            </Box>
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
            padding: '25px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <Box
            sx={{
              display: 'flex',

              justifyContent: 'center',
              alignItems: 'center',
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
              Privacy
            </Link>
          </Box>
          <Typography variant="body2" color="white" align="center">
            Copyright © {currentYear} Medi Connect
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AppFooter;
