import { Route, Routes } from 'react-router-dom';
import QuestionList from './pages/QuestionList';
import CreateQuestion from './pages/CreateQuestion';

const Question: React.FC = () => {
  return (
    <Routes>
      <Route index element={<QuestionList />} />
      <Route path="new" element={<CreateQuestion />} />
    </Routes>
  );
};

export default Question;
