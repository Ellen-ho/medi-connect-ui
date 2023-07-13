import { Route, Routes, useNavigate } from 'react-router-dom';
import AppointmentList from './pages/AppointmentList';
import CreateAppointment from './pages/CreateAppointment';

const Appointment: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppointmentList />} path="/" />
      <Route element={<CreateAppointment />} path="/:doctorId" />
    </Routes>
  );
};

export default Appointment;
