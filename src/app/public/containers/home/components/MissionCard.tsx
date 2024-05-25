import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import missionUrl from '/src/assets/mission.png';

const MissionCard: React.FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {' '}
      <Card
        sx={{
          maxWidth: 600,
          maxHeight: 300,
          width: '100%',
          aspectRatio: '2',
          backgroundColor: '#E2E5F4',
          margin: 'auto',
          display: 'flex',
          flexDirection: matches ? 'row' : 'column',
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                sx={{
                  marginBottom: theme.spacing(4),
                }}
              >
                Our mission
              </Typography>
              <Typography variant="body1">
                We expand healthcare beyond the confines of traditional clinic
                hours and locations, bringing quality care into every aspect of
                your life.
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img
              src={missionUrl}
              alt="Healthcare"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default MissionCard;
