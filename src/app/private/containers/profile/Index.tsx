import { Route, Routes } from 'react-router-dom';
import ProfileDetail from './pages/ProfileDetail';
import DoctorProfileDetail from './pages/DoctorProfileDetail';
import ReadonlyProfileDetail from './pages/ReadonlyProfileDetail';

const Profile: React.FC = () => {
  return (
    <Routes>
      <Route element={<DoctorProfileDetail />} path="/doctor" />
      <Route element={<ReadonlyProfileDetail />} path="/view" />
      <Route element={<ProfileDetail />} path="/" />
    </Routes>
  );
};

export default Profile;
