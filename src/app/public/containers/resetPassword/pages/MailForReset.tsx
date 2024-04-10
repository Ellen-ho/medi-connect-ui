import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import { createPasswordChangeMail } from '../../../../../services/UserService';
import { MailForResetWrapper } from './MailForReset.styles';
import { useState } from 'react';
import { ButtonAreaWrapper } from '../../../../layout/CommonWrapper.styled';

interface IMailForResetFormInputs {
  email: string;
}

const schema = yup
  .object({
    email: yup.string().required(),
  })
  .required();

const MailForReset: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMailForResetFormInputs>({
    resolver: yupResolver(schema),
  });
  const [userEmail, setUserEmail] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [lastClickTime, setLastClickTime] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleResendEmail = async () => {
    setIsButtonDisabled(true);
    const currentTime = new Date().getTime();
    setLastClickTime(currentTime);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);

    await onSendEmail({ email: userEmail });
  };

  const onSendEmail = async (data: IMailForResetFormInputs) => {
    const payload = {
      email: data.email,
    };

    const response = await createPasswordChangeMail(payload); //要打後端api跟到resend頁
    if (response.success) {
      setIsSent(true);
      setUserEmail(data.email);
      setErrorMessage('');
    }
    if (response.error) {
      setErrorMessage(response.error);
    }
  };

  return (
    <PrimaryPageContent>
      <MailForResetWrapper>
        {isSent ? (
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Check your email
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Check your email You'll receive a link in the email you supplied
                that will enable you to reset your account password.
              </Typography>
              <Typography variant="h6" sx={{ mb: 3 }}>
                {userEmail}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                If you don't see the email, check other places it might be, like
                your junk, spam, social, or other folders.
              </Typography>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <ButtonAreaWrapper>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleResendEmail}
                    disabled={isButtonDisabled}
                  >
                    Resend
                  </Button>
                </ButtonAreaWrapper>
              </CardActions>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align="center"
              >
                Enter your email
              </Typography>
              <FormWrapper onSubmit={handleSubmit(onSendEmail)}>
                <TextField
                  label="email"
                  type="email"
                  size="small"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={<>{errors.email?.message}</>}
                />
                <ButtonAreaWrapper>
                  <Button type="submit" variant="contained" color="primary">
                    Next
                  </Button>
                </ButtonAreaWrapper>
              </FormWrapper>
            </CardContent>
          </Card>
        )}
      </MailForResetWrapper>
    </PrimaryPageContent>
  );
};

export default MailForReset;
