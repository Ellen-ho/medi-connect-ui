import { Route, Routes, useNavigate } from 'react-router-dom';
import RecordList from './pages/RecordList';
import CreateRecord from './pages/CreateRecord';
import RecordHome from './pages/RecordHome';

const Record: React.FC = () => {
  return (
    <Routes>
      <Route element={<RecordHome />} path="/" />
      <Route element={<CreateRecord />} path="/:typeId/new" />
      <Route element={<RecordList />} path="/:typeId" />
    </Routes>
  );
};

export default Record;
