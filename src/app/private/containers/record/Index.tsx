import { Route, Routes, useNavigate } from 'react-router-dom';
import RecordList from './pages/RecordList';
import CreateRecord from './pages/CreateRecord';

const Record: React.FC = () => {
  return (
    <Routes>
      <Route element={<RecordList />} path="/" />
      <Route element={<CreateRecord />} path="/new" />
    </Routes>
  );
};

export default Record;
