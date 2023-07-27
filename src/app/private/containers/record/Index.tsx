import { Route, Routes, useNavigate } from 'react-router-dom';
import RecordList from './pages/RecordList';
import CreateRecord from './pages/CreateRecord';
import RecordHome from './pages/RecordHome';
import RecordDetail from './pages/RecordDetail';

const Record: React.FC = () => {
  return (
    <Routes>
      <Route element={<CreateRecord />} path="/:typeId/new" />
      <Route element={<RecordDetail />} path="/:typeId/:recordId" />
      <Route element={<RecordList />} path="/:typeId" />
      <Route element={<RecordHome />} path="/" />
    </Routes>
  );
};

export default Record;
