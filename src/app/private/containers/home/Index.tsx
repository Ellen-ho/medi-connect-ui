import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { UserRoleType } from '../../../../types/Users';
import DoctorHome from './pages/DoctorHome';
import PatientHome from './pages/PatientHome';

const PersonalHome: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.currentUser?.role === UserRoleType.DOCTOR;

  return <>{isDoctor ? <DoctorHome /> : <PatientHome />}</>;
};

export default PersonalHome;
