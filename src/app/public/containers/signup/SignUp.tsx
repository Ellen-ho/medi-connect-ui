import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../../../services/UserService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PrimaryPageContent from '../../../layout/PrimaryPageContent';
import { BottomAreaWrapper, SignUpWrapper } from './SignUp.styled';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { FormWrapper } from '../../../../components/form/Index.styled';

interface ISignUpFormInputs {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
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
    role: yup.string().required(),
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

  const onSignUp = async (data: ISignUpFormInputs) => {
    const payload = {
      displayName: data.displayName,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    const response = await signupUser(payload);
    navigate('/signin');
  };

  return (
    <PrimaryPageContent>
      <SignUpWrapper>
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            ></Typography>
            <FormWrapper onSubmit={handleSubmit(onSignUp)}>
              <TextField
                label="DisplayName"
                type="displayName"
                size="small"
                {...register('displayName')}
                error={!!errors.displayName}
                helperText={<>{errors.displayName?.message}</>}
              />
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
              <TextField
                label="Confirm Password"
                type="password"
                size="small"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={<>{errors.confirmPassword?.message}</>}
              />
              <FormControl>
                <InputLabel>User Role</InputLabel>
                <Select
                  label="User Role"
                  size="small"
                  {...register('role')}
                  error={!!errors.role}
                  defaultValue=""
                >
                  <MenuItem value="PATIENT">Patient</MenuItem>
                  <MenuItem value="DOCTOR">Doctor</MenuItem>
                </Select>
              </FormControl>

              <Button type="submit" variant="contained" color="primary">
                Sign Up
              </Button>
              <BottomAreaWrapper>
                <Button variant="text" onClick={() => navigate('/signin')}>
                  Sign In
                </Button>
              </BottomAreaWrapper>
            </FormWrapper>
          </CardContent>
        </Card>
      </SignUpWrapper>
    </PrimaryPageContent>
  );
};

export default SignUp;
