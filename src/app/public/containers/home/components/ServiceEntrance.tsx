import { Box, Card, CardActionArea, Typography } from '@mui/material';

interface IServiceEntranceProps {
  handleClick: () => void;
  title: string;
  subtitle: string;
  icon: JSX.Element;
}

const ServiceEntrance: React.FC<IServiceEntranceProps> = ({
  handleClick,
  title,
  subtitle,
  icon,
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={handleClick} sx={{ p: 4, height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
          }}
        >
          <Box sx={{ mr: '1rem' }}>{icon}</Box>
          <Box>
            <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem' } }}>
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color={'text.secondary'}
              sx={{ fontSize: { xs: '1rem' } }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ServiceEntrance;
