import { Route, Routes } from 'react-router-dom';
import DoctorList from './pages/DoctorList';

const Doctors: React.FC = () => {
  return (
    <Routes>
      <Route element={<DoctorList />} path="/" />
    </Routes>
  );
};

export default Doctors;
