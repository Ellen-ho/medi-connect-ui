import { Route, Routes } from 'react-router-dom';
import ProfileDetail from './pages/ProfileDetail';
import DoctorProfileDetail from './pages/DoctorProfileDetail';

const Profile: React.FC = () => {
  return (
    <Routes>
      <Route element={<DoctorProfileDetail />} path="/doctor" />
      <Route element={<ProfileDetail />} path="/" />
    </Routes>
  );
};

export default Profile;
