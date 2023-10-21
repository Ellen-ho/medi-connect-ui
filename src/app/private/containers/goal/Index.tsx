import { Route, Routes } from 'react-router-dom';
import HealthGoalList from './pages/HealthGoalList';
import HealthGoalDetail from './pages/HealthGoalDetail';
import Chart from './pages/Chart';

const HealthGoal: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <Chart
            recordsData={{
              bloodPressure: BloodPressureRecord,
              bloodSugar: BloodSugarRecord,
              glycatedHemoglobin: GlycatedHemoglobinRecord,
              weight: WeightRecord,
            }}
          />
        }
        path="/:id/dataAnalization"
      />
      <Route element={<HealthGoalDetail />} path="/:id" />
      <Route element={<HealthGoalList />} path="/" />
    </Routes>
  );
};

export default HealthGoal;
