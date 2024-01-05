import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { AuthContext } from '../../../../../context/AuthContext';
import PatientAppointmentList from '../components/PatientAppointmentList';
import DoctorAppointmentList from '../components/DoctorAppointmentList';

const AppointmentList: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const navigate = useNavigate();

  const handleClickEditTimeSlot = () => {
    navigate('/appointment/time-slot');
  };

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <PrimaryPageTop
          pageTitle="Appointment"
          rightElement={
            isDoctor && (
              <Button onClick={handleClickEditTimeSlot} variant="contained">
                Edit Time Slot
              </Button>
            )
          }
        />
        {isDoctor ? <DoctorAppointmentList /> : <PatientAppointmentList />}
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default AppointmentList;
