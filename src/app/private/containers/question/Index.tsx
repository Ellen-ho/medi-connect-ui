import { Route, Routes, useNavigate } from 'react-router-dom';
import QuestionList from './pages/QuestionList';
import CreateQuestion from './pages/CreateQuestion';

const Question: React.FC = () => {
  return (
    <Routes>
      <Route element={<QuestionList />} path="/" />
      <Route element={<CreateQuestion />} path="/new" />
    </Routes>
  );
};

export default Question;
