import { useNavigate } from 'react-router-dom';
import BasicCard from '../../../../../components/card/BasicCard';
import useSWR from 'swr';
import { getPatientConsultAppointments } from '../../../../../services/ConsultationService';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Skeleton,
  Typography,
} from '@mui/material';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const UpcomingAppointment: React.FC = () => {
  const navigate = useNavigate();

  // const { data, isLoading } = useSWR('getPatientConsultAppointments', () =>
  //   getPatientConsultAppointments(),
  // );

  const upcomingAppointment = {
    appointmentId: 'dca8d139-863c-4f77-ac07-63655272b2a3',
    patientId: '4910c664-b7bb-4088-b413-8210abfed654',
    status: 'UPCOMING',
    doctorTimeSlot: {
      startAt: '2023-11-20T01:00:00.000Z',
      endAt: '2023-11-20T01:30:00.000Z',
    },
    doctor: {
      firstName: 'Jim',
      lastName: 'Williams',
      specialties: ['OPHTHALMOLOGY'],
      avatar: 'https://i.imgur.com/GEkMq5X.png', // new
    },
    meetingLink: null,
    cancelAvailability: true,
  };

  const handleViewAppointment = () => {
    navigate('/appointment');
  };

  // if (isLoading) {
  //   return (
  //     <BasicCard title={''}>
  //       <Skeleton />
  //       <Skeleton />
  //       <Skeleton />
  //     </BasicCard>
  //   );
  // }

  if (!upcomingAppointment) {
    return (
      <BasicCard title={'Upcoming Appointments'}>
        <NoDataFound />
      </BasicCard>
    );
  }

  return (
    <BasicCard title={'Upcoming Appointments'}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <Avatar sx={{ width: 100, height: 100, border: '1px solid #888' }}>
            {upcomingAppointment.doctor.avatar !== null ? (
              <img
                src={upcomingAppointment.doctor.avatar}
                width={100}
                height={100}
              />
            ) : (
              <PersonRoundedIcon sx={{ width: '75%', height: '75%' }} />
            )}
          </Avatar>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pl: '2rem',
            flex: 11,
          }}
        >
          <Typography variant="h6" fontWeight={'bold'}>
            Dr. {upcomingAppointment.doctor.firstName}{' '}
            {upcomingAppointment.doctor.lastName}
          </Typography>
          <Divider sx={{ my: '10px' }} />
          <Typography variant="body1">
            {`${dateFormatter(
              upcomingAppointment.doctorTimeSlot.startAt.toString(),
            )} ~ ${dateFormatter(
              upcomingAppointment.doctorTimeSlot.endAt.toString(),
            )}`}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
        <Button size="large" onClick={handleViewAppointment}>
          View More
        </Button>
      </Box>
    </BasicCard>
  );
};

export default UpcomingAppointment;
