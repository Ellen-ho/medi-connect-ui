import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { AuthContext } from '../../../../../context/AuthContext';
import PatientAppointmentList from '../components/PatientAppointmentList';
import DoctorAppointmentList from '../components/DoctorAppointmentList';
import { TimeSlotType } from '../../../../../types/Share';

const AppointmentList: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const [timeSlotType, setTimeSlotType] = useState(TimeSlotType.ONLINE);
  const navigate = useNavigate();

  const handleTimeSlotTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    value: TimeSlotType | null,
  ) => {
    if (value !== null && value !== timeSlotType) {
      setTimeSlotType(value);
    }
  };

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <PrimaryPageTop
          pageTitle="Appointment"
          rightElement={
            <Box sx={{ display: 'flex', justifyContent: 'end', mb: '15px' }}>
              <ToggleButtonGroup
                size="small"
                color="primary"
                value={timeSlotType}
                exclusive
                onChange={handleTimeSlotTypeChange}
                sx={{
                  border: '1px solid',
                  borderColor: 'secondary.dark',
                  '& .MuiToggleButton-root': {
                    border: 'none',
                    '&.Mui-selected': {
                      zIndex: 1,
                      border: '1.8px solid',
                      borderColor: 'secondary.dark',
                      bgcolor: 'secondary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'secondary.light',
                        color: 'black',
                      },
                    },
                  },
                }}
              >
                <ToggleButton value={TimeSlotType.ONLINE}>Online</ToggleButton>
                <ToggleButton value={TimeSlotType.CLINIC}>Clinic</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          }
        />
        {isDoctor ? (
          <DoctorAppointmentList timeSlotType={timeSlotType} />
        ) : (
          <PatientAppointmentList timeSlotType={timeSlotType} />
        )}
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default AppointmentList;
