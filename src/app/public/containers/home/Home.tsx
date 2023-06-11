import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';

const Home: React.FC = () => {
  const context = useContext(AuthContext);

  return (
    <>
      <div>Home</div>
      {context?.state.isLoggedIn ? `isLogin` : `isLogout`} <br />
      <Link to={'/signin'}>Sign In</Link>
      <Link to={'/signup'}>Sign Up</Link>
    </>
  );
};

export default Home;
