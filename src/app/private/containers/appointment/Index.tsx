import { Route, Routes, useNavigate } from 'react-router-dom';
import AppointmentList from './pages/AppointmentList';
import CreateAppointment from './pages/CreateAppointment';

const Appointment: React.FC = () => {
  return (
    <Routes>
      <Route element={<CreateAppointment />} path="/:doctorId" />
      <Route element={<AppointmentList />} path="/" />
    </Routes>
  );
};

export default Appointment;
