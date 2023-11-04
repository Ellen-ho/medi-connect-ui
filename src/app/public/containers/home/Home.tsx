import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import React from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ServiceEntrance from './components/ServiceEntrance';
import HomeHeader from './components/HomeHeader';
import { UserRoleType } from '../../../../types/Users';
import HomeLanding from './components/HomeLanding';

const Home: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.currentUser?.role === UserRoleType.DOCTOR;
  const isLoggedIn = state.isLoggedIn;
  const hasProfile = state.hasProfile;
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  const toProfile = () => {
    const path = isDoctor ? '/profile/doctor' : '/profile';
    navigate(path);
  };

  const currentYear = new Date().getFullYear();

  return <>{isLoggedIn ? <>Sign In Home</> : <HomeLanding />}</>;
};

export default Home;

/**
 * Before Sign In
 * - Landing looks page (slogan and ads)
 * - Sign Up CTA
 * - turn 4 features into sections with slogan and ads
 * 3650 × 1060
 * After Sign In
 * - Key Statistics
 * - Latest events: appointments, health goals
 */
