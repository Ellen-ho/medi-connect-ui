import { Route, Routes } from 'react-router-dom';
import QuestionList from './pages/QuestionList';
import CreateQuestion from './pages/CreateQuestion';
import QuestionDetail from './pages/QuestionDetail';

const Question: React.FC = () => {
  return (
    <Routes>
      <Route element={<QuestionDetail />} path="/:questionId" />
      <Route element={<CreateQuestion />} path="/new" />
      <Route element={<QuestionList />} path="/" />
    </Routes>
  );
};

export default Question;
