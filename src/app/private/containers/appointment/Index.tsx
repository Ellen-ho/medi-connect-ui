import { Route, Routes } from 'react-router-dom';
import AppointmentList from './pages/AppointmentList';
import EditDoctorTimeSlot from './pages/EditDoctorTimeSlot';

const Appointment: React.FC = () => {
  return (
    <Routes>
      <Route element={<EditDoctorTimeSlot />} path="/time-slot" />
      <Route element={<AppointmentList />} path="/" />
    </Routes>
  );
};

export default Appointment;
