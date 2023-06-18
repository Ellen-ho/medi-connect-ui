import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../../../services/UserService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserRoleType } from '../../../../types/Users';

interface ISignUpFormInputs {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    displayName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  })
  .required();

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormInputs>({
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (data: ISignUpFormInputs) => {
    const payload = {
      displayName: data.displayName,
      email: data.email,
      password: data.password,
      role: UserRoleType.PATIENT,
    };

    const response = await signupUser(payload);
    navigate('/signin');
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <input
        type="displayName"
        placeholder="DisplayName"
        {...register('displayName')}
      />
      <p>{errors.displayName?.message}</p>
      <input type="email" placeholder="Email" {...register('email')} />
      <p>{errors.email?.message}</p>
      <input type="password" placeholder="Password" {...register('password')} />
      <p>{errors.password?.message}</p>
      <input
        type="password"
        placeholder="Confirm Password"
        {...register('confirmPassword')}
      />
      <p>{errors.confirmPassword?.message}</p>
      <input type="submit" />
    </form>
  );
};

export default SignUp;
