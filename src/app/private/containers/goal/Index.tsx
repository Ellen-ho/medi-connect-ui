import { Route, Routes } from 'react-router-dom';
import HealthGoalList from './pages/HealthGoalList';
import HealthGoalDetail from './pages/HealthGoalDetail';

const HealthGoal: React.FC = () => {
  return (
    <Routes>
      <Route element={<HealthGoalDetail />} path="/:id" />
      <Route element={<HealthGoalList />} path="/" />
    </Routes>
  );
};

export default HealthGoal;
