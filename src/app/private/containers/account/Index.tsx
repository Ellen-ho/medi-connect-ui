import { Route, Routes } from 'react-router-dom';
import AccountDetail from './pages/AccountDetail';

const Account: React.FC = () => {
  return (
    <Routes>
      <Route element={<AccountDetail />} path="/" />
    </Routes>
  );
};

export default Account;
