import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { loginUser } from '../../../../services/AuthService';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface ISignInFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ISignInFormInputs) => {
    console.log(data);
    const payload = {
      email: data.email,
      password: data.password,
    };
    loginUser(payload)
      .then((response) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="Email" {...register('email')} />
      <p>{errors.email?.message}</p>
      <input type="password" placeholder="Password" {...register('password')} />
      <p>{errors.password?.message}</p>
      <input type="submit" />
    </form>
  );
};

export default SignIn;
