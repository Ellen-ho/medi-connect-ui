import {
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
  CardActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MedicalSpecialtyType } from '../../../../../types/Share';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 9,
          }}
        >
          <Box>
            <Avatar
              alt={data.firstName}
              src={data.avatar}
              sx={{ width: 56, height: 56 }}
            >
              {data.avatar ? (
                ''
              ) : (
                <PersonRoundedIcon sx={{ width: '75%', height: '75%' }} />
              )}
            </Avatar>
          </Box>
          <Typography variant="h6" textAlign={'center'} fontWeight={'bold'}>
            Dr. {data.firstName} {data.lastName}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            {data.specialties.map((v) => toSentenceCaseFormat(v)).join(', ')}
          </Typography>{' '}
          <Box textAlign={'center'}>
            <IconButton></IconButton>
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
