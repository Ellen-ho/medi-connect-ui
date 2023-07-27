import { Route, Routes, useNavigate } from 'react-router-dom';
import AppointmentList from './pages/AppointmentList';

const Appointment: React.FC = () => {
  return (
    <Routes>
      {/* <Route element={<EditDoctorTimeSlot />} path="/time-slot" /> */}
      <Route element={<AppointmentList />} path="/" />
    </Routes>
  );
};

export default Appointment;
