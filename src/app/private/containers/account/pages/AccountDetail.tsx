import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { IAccount } from '../../../../../types/Users';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Box, Button, Card, CardContent, Divider, TextField, Typography } from '@mui/material';
import { AccountDetailWrapper } from './AccountDetail.styled';
import DataLoading from '../../../../../components/signs/DataLoading';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import { editUserAccount, getUserAccount } from '../../../../../services/UserService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AccountDetail: React.FC = () => {
   const [account, setAccount] = useState<IAccount | null>();

   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAccount>();

  const onEditAccount = async (data: IAccount) => {
    await editUserAccount(data);
  };

  const { isLoading } = useSWR('getUserAccount', () => getUserAccount(), {
    onSuccess: (data) => {
      setAccount({
      displayName: data.displayName,
      email: data.email,
      password: '', 
      confirmPassword: '', 
    });
  },
});

  return (
    <>
      <PrimaryPageTop pageTitle="Account" />
      <PrimaryPageContent>
        <AccountDetailWrapper>
          {isLoading ? (
            <DataLoading />
          ) : account == null ? (
            <Typography variant="h5" component="div">
              No Account found
            </Typography>
          ) : (
            <FormWrapper onSubmit={handleSubmit(onEditAccount)}>
              <Card>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
                  ><AccountCircleIcon /> Personal
                  </Typography>
                  <EditableRowItem label={'Display Name'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      value={account.displayName ?? '--'}
                      {...register('displayName')}
                    />
                  </EditableRowItem>
                  <Divider />
                  <EditableRowItem label={'Email'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      value={account.email ?? '--'}
                      {...register('email')}
                    />
                  </EditableRowItem>
                  <Divider />
                  <EditableRowItem label={'PassWord'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      value={account.password ?? '--'}
                      {...register('password')}
                    />
                  </EditableRowItem>
                  <Divider />
                  </CardContent>
              </Card>

              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </FormWrapper>
          )}
           </AccountDetailWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default AccountDetail;

interface IEditableRowItemProps {
  label: string;
  children?: React.ReactNode;
}
const EditableRowItem: React.FC<IEditableRowItemProps> = ({
  label,
  children,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '3.5rem',
      }}
    >
      <Box color="text.primary">{label}</Box>
      <Box color="text.secondary">{children}</Box>
    </Box>
  );
};
