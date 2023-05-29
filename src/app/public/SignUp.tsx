import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../services/AuthService';

interface SignUpRequest {
  displayName: string;
  email: string;
  password: string;
  role: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const handleSignUp = async (data: SignUpRequest) => {
    try {
      const response = await signupUser(data);
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={() =>
          handleSignUp({
            displayName: 'doctor2',
            email: 'doctor2@gmail.com',
            password: 'doctor2',
            role: 'DOCTOR',
          })
        }
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
