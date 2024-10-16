import {
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MedicalSpecialtyType } from '../../../../../types/Share';
import { toSentenceCaseFormat } from '../../../../../utils/sentenceCaseFormat';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

interface IDoctorCard {
  data: {
    id: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
    specialties: MedicalSpecialtyType[];
  };
}

const DoctorCard: React.FC<IDoctorCard> = ({ data }) => {
  const navigate = useNavigate();
  const handleClickDetail = (doctorId: string) => {
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        minHeight: '250px',
        boxShadow: 3,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 4,
          }}
        >
          <Box>
            <Avatar sx={{ width: 56, height: 56 }}>
              {data.avatar != null ? (
                <img
                  src={data.avatar}
                  alt={data.firstName}
                  width={'100%'}
                  height={'100%'}
                />
              ) : (
                <PersonRoundedIcon sx={{ width: '75%', height: '75%' }} />
              )}
            </Avatar>
          </Box>
          <Typography variant="h6" textAlign={'center'} fontWeight={'bold'}>
            Dr. {data.firstName} {data.lastName}
          </Typography>
          <Box>
            <Typography
              variant="body1"
              component="div"
              sx={{ textAlign: 'center' }}
            >
              {data.specialties.map((v, index) => (
                <Chip
                  key={index}
                  label={toSentenceCaseFormat(v)}
                  sx={{ m: '.1rem' }}
                />
              ))}
            </Typography>
          </Box>
        </Box>
        <Box
          textAlign={'center'}
          sx={{
            flexGrow: 1,
          }}
        >
          <Button variant="outlined" onClick={() => handleClickDetail(data.id)}>
            Visit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
