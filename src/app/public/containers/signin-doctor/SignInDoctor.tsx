import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { loginUser } from '../../../../services/UserService';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PrimaryPageContent from '../../../layout/PrimaryPageContent';
import { SignInWrapper } from './SignIn.styled';
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { FormWrapper } from '../../../../components/form/Index.styled';
import { ButtonAreaWrapper } from '../../../layout/CommonWrapper.styled';

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

const SignInDoctor: React.FC = () => {
  const APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'jim@gmail.com',
      password: '12345678',
    },
  });

  const onSignIn = async (data: ISignInFormInputs) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    const response = await loginUser(payload);
    dispatch({
      type: 'LOG_IN',
      payload: {
        token: response.token,
        currentUser: {
          id: response.user.id,
          displayName: response.user.displayName,
          role: response.user.role,
          avatar: response.user.avatar,
        },
        patientId: response.patientId,
        doctorId: response.doctorId,
        hasProfile: response.hasProfile,
      },
    });
  };

  return (
    <PrimaryPageContent>
      <SignInWrapper>
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
              Doctor Sign In
            </Typography>
            <FormWrapper onSubmit={handleSubmit(onSignIn)}>
              <TextField
                label="Email"
                type="email"
                size="small"
                {...register('email')}
                error={!!errors.email}
                helperText={<>{errors.email?.message}</>}
              />
              <TextField
                label="Password"
                type="password"
                size="small"
                {...register('password')}
                error={!!errors.password}
                helperText={<>{errors.password?.message}</>}
              />
              <ButtonAreaWrapper>
                <Button type="submit" variant="contained" color="primary">
                  Sign In
                </Button>
                <Button
                  variant="text"
                  onClick={() => navigate('/signup-doctor')}
                >
                  Sign Up
                </Button>
              </ButtonAreaWrapper>
            </FormWrapper>
          </CardContent>
        </Card>
      </SignInWrapper>
    </PrimaryPageContent>
  );
};

export default SignInDoctor;
