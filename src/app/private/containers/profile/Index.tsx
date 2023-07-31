import { Route, Routes } from 'react-router-dom';
import ProfileDetail from './pages/ProfileDetail';
import DoctorProfileDetail from '../doctors/pages/DoctorProfileDetail';

const Profile: React.FC = () => {
  return (
    <Routes>
      <Route element={<ProfileDetail />} path="/" />
    </Routes>
  );
};

export default Profile;
