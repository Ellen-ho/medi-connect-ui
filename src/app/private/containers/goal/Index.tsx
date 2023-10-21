import { Route, Routes } from 'react-router-dom';
import HealthGoalList from './pages/HealthGoalList';
import HealthGoalDetail from './pages/HealthGoalDetail';
import HealthGoalChart from './pages/HealthGoalChart';

const HealthGoal: React.FC = () => {
  return (
    <Routes>
      <Route element={<HealthGoalChart />} path="/:id/data-analysis" />
      <Route element={<HealthGoalDetail />} path="/:id" />
      <Route element={<HealthGoalList />} path="/" />
    </Routes>
  );
};

export default HealthGoal;
