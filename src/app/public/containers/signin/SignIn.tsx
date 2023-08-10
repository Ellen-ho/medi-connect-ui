import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { loginUser } from '../../../../services/UserService';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PrimaryPageContent from '../../../layout/PrimaryPageContent';
import { BottomAreaWrapper, SignInWrapper } from './SignIn.styled';
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { FormWrapper } from '../../../../components/form/Index.styled';
import PersonPinIcon from '@mui/icons-material/PersonPin';

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
        },
        patientId: response.patientId,
        doctorId: response.doctorId,
      },
    });
    navigate('/');
  };

  const handleFacebookLogin = async () => {
    window.open(`http://localhost:10000/api/auth/facebook`, '_self');
    // try {
    //   const response = await fetch('http://localhost:10000/api/auth/facebook', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Request failed with status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   if (data.url) {
    //     window.location.href = data.url; // Redirect to the URL from the response
    //   } else {
    //     console.error('No URL provided in the response.');
    //   }
    // } catch (error) {
    //   console.error('Error fetching Facebook login URL:', error);
    // }
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
              <PersonPinIcon sx={{ fontSize: 50, color: '#777' }} />
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

              <Button type="submit" variant="contained" color="primary">
                Sign In
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFacebookLogin}
              >
                Sign In with Facebook
              </Button>
              <BottomAreaWrapper>
                <Link href="/signup">Sign Up</Link>
              </BottomAreaWrapper>
            </FormWrapper>
          </CardContent>
        </Card>
        {/* <form onSubmit={handleSubmit(onSignIn)}>
          <input type="email" placeholder="Email" {...register('email')} />
          <p>{errors.email?.message}</p>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
          <input type="submit" />
        </form> */}
      </SignInWrapper>
    </PrimaryPageContent>
  );
};

export default SignIn;
