import { Route, Routes } from 'react-router-dom';
import HealthGoalList from './pages/HealthGoalList';

const HealthGoal: React.FC = () => {
  return (
    <Routes>
      <Route element={<HealthGoalList />} path="/" />
    </Routes>
  );
};

export default HealthGoal;
