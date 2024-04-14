import { Routes, Route } from 'react-router-dom';
import HealthMatrixData from './HealthMatrix';
import LifestyleData from './LifeStyle';
import HomeLandingLayout from '../../../layout/HomeLandingLayout';
import { Box } from '@mui/material';

const Article: React.FC = () => {
  return (
    <HomeLandingLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: '1200px' }}>
          <Routes>
            <Route element={<HealthMatrixData />} path="/health-matrix" />
            <Route element={<LifestyleData />} path="/life-style" />
          </Routes>
        </Box>
      </Box>
    </HomeLandingLayout>
  );
};

export default Article;
