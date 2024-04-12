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
import EventBusyIcon from '@mui/icons-material/EventBusy';

const UpcomingAppointment: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useSWR('getPatientConsultAppointments', () =>
    getPatientConsultAppointments({
      query: {
        onlyUpcoming: true,
      },
    }),
  );

  const upcomingAppointment = data?.upcomingAppointments[0];

  const handleViewAppointment = () => {
    navigate('/appointment');
  };

  if (!upcomingAppointment) {
    return (
      <BasicCard title={'Upcoming Appointments'}>
        <NoDataFound
          icon={<EventBusyIcon />}
          label="You currently have no upcoming appointments."
        ></NoDataFound>
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
