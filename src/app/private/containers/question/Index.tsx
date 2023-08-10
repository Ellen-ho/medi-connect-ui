import { Route, Routes } from 'react-router-dom';
import QuestionList from './pages/QuestionList';
import CreateQuestion from './pages/CreateQuestion';
import QuestionDetail from './pages/QuestionDetail';
import AnswerDetail from './pages/AnswerDetail';
import AnswerList from './pages/AnswerList';

const Question: React.FC = () => {
  return (
    <Routes>
      <Route element={<QuestionDetail />} path="/:questionId" />
      <Route element={<CreateQuestion />} path="/new" />
      <Route element={<AnswerDetail />} path="/answer/:answerId" />
      <Route element={<AnswerList />} path="/answer" />
      <Route element={<QuestionList />} path="/" />
    </Routes>
  );
};

export default Question;
