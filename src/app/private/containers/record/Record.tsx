import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';

const Record: React.FC = () => {
  const context = useContext(AuthContext);

  return (
    <>
      <div>Record</div>
      {context?.state.isLoggedIn ? `isLogin` : `isLogout`} <br />
    </>
  );
};

export default Record;
