import { useNavigate } from 'react-router-dom';
import BasicCard from '../../../../../components/card/BasicCard';
import useSWR from 'swr';
import { getDoctorConsultAppointments } from '../../../../../services/ConsultationService';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Skeleton,
  Typography,
} from '@mui/material';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { TimeSlotType } from '../../../../../types/Share';

const DoctorUpcomingAppointment: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useSWR('getDoctorConsultAppointments', () =>
    getDoctorConsultAppointments({
      query: {
        onlyUpcoming: true,
      },
    }),
  );

  const upcomingAppointments = data?.upcomingAppointments.slice(0, 3);

  const handleViewAppointment = () => {
    navigate('/appointment');
  };

  if (!upcomingAppointments || upcomingAppointments.length === 0) {
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
      {upcomingAppointments.map((appointment) => (
        <Box key={appointment.appointmentId} sx={{ mb: 2 }}>
          {' '}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
              {appointment.patient.avatar ? (
                <img
                  src={appointment.patient.avatar}
                  alt={`${appointment.patient.firstName} ${appointment.patient.lastName}`}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <PersonRoundedIcon />
              )}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight={'bold'}>
                {appointment.patient.firstName} {appointment.patient.lastName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
              >
                <span>
                  {`${dateFormatter(
                    appointment.doctorTimeSlot.startAt,
                  )} ~ ${dateFormatter(appointment.doctorTimeSlot.endAt)}`}
                </span>
                <Chip
                  size="small"
                  label={appointment.doctorTimeSlot.type}
                  color={
                    appointment.doctorTimeSlot.type === TimeSlotType.CLINIC
                      ? 'primary'
                      : 'success'
                  }
                  variant="outlined"
                />
              </Typography>
            </Box>
          </Box>
          <Divider />
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
        <Button size="large" onClick={handleViewAppointment}>
          View More
        </Button>
      </Box>
    </BasicCard>
  );
};

export default DoctorUpcomingAppointment;
