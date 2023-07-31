import { Route, Routes } from 'react-router-dom';
import DoctorList from './pages/DoctorList';
import DoctorDetail from './pages/DoctorDetail';

const Doctors: React.FC = () => {
  return (
    <Routes>
      <Route element={<DoctorDetail />} path="/:doctorId" />
      <Route element={<DoctorList />} path="/" />
    </Routes>
  );
};

export default Doctors;
