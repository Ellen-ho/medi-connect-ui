import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { loginUser } from '../../../../services/AuthService';

interface SignInRequest {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (data: SignInRequest) => {
    try {
      const response = await loginUser(data);
      dispatch({
        type: 'LOG_IN',
        payload: {
          token: response.token,
          currentUser: {
            id: response.user.id,
            displayName: response.user.displayName,
            role: response.user.role,
          },
        },
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={() =>
          handleLogin({ email: 'doctor1@mail.com', password: 'doctor1' })
        }
      >
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
