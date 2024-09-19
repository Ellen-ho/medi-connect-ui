import { useContext } from 'react';
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
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { FormWrapper } from '../../../../components/form/Index.styled';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FacebookIcon from '../../../../assets/FacebookIcon';
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

const SignIn: React.FC = () => {
  const APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
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
          avatar: response.user.avatar,
        },
        patientId: response.patientId,
        doctorId: response.doctorId,
        hasProfile: response.hasProfile,
      },
    });
  };

  const handleFacebookLogin = async () => {
    window.open(`${APP_SERVER_URL}/api/auth/facebook`, '_self');
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
              User Sign In
            </Typography>
            <FormWrapper onSubmit={handleSubmit(onSignIn)}>
              <TextField
                label="Email"
                type="email"
                size="small"
                defaultValue="john@gmail.com"
                {...register('email')}
                error={!!errors.email}
                helperText={<>{errors.email?.message}</>}
              />

              <TextField
                label="Password"
                type="password"
                size="small"
                defaultValue="12345678"
                {...register('password')}
                error={!!errors.password}
                helperText={<>{errors.password?.message}</>}
              />
              <ButtonAreaWrapper>
                <Button type="submit" variant="contained" color="primary">
                  Sign In
                </Button>
              </ButtonAreaWrapper>
              <Divider>Or</Divider>
              <ButtonAreaWrapper>
                <Button
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '99em',
                  }}
                  variant="outlined"
                  color="primary"
                  onClick={handleFacebookLogin}
                >
                  <Box
                    sx={{ width: '30px', height: '30px', marginRight: '5px' }}
                  >
                    <FacebookIcon />
                  </Box>{' '}
                  Sign In with Facebook
                </Button>
              </ButtonAreaWrapper>

              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Button variant="text" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
                <Button variant="text" onClick={() => navigate('/input-email')}>
                  Forgot Password
                </Button>
              </Grid>
              {/* <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={handleDoctorSignInCLick}
                  sx={{ borderRadius: '10px' }}
                  variant="outlined"
                  startIcon={<MedicalInformationIcon />}
                >
                  Are you doctor?
                </Button>
              </Box> */}
            </FormWrapper>
          </CardContent>
        </Card>
      </SignInWrapper>
    </PrimaryPageContent>
  );
};

export default SignIn;
