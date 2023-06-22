import { Route, Routes, useNavigate } from 'react-router-dom';
import AppointmentList from './pages/appointmentList';

const Appointment: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppointmentList />} path="/" />
    </Routes>
  );
};

export default Appointment;
