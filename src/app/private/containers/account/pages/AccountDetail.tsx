import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { IAccount } from '../../../../../types/Users';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useSWR from 'swr';
import {
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { AccountDetailWrapper } from './AccountDetail.styled';
import DataLoading from '../../../../../components/signs/DataLoading';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import {
  editUserAccount,
  getUserAccount,
} from '../../../../../services/UserService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RowItem from '../../../../../components/form/RowItem';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface IAccountForm {
  displayName: string;
  password: string;
  confirmPassword: string;
}

const AccountDetail: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    setValue,
  } = useForm<IAccount>({});

  const { data, isLoading } = useSWR('getUserAccount', () => getUserAccount());

  useEffect(() => {
    if (data) {
      setValue('displayName', data.displayName || '');
    }
  }, [data]);

  const onEditAccount = async (data: IAccountForm) => {
    const payload = {
      displayName: data.displayName,
      password: data.password,
    };
    const response = await editUserAccount(payload);
    if (response) {
      toast.success('Account updated successfully!');
    }
  };

  return (
    <>
      <PrimaryPageTop pageTitle="Account" />
      <PrimaryPageContent>
        <AccountDetailWrapper>
          {isLoading ? (
            <DataLoading />
          ) : data == null ? (
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
                  >
                    <AccountCircleIcon /> Personal
                  </Typography>
                  <RowItem label={'Email'}>{data.email}</RowItem>
                  <RowItem label={'Display Name'}>
                    <Controller
                      name="displayName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          size="small"
                          variant="outlined"
                          value={field.value}
                          error={!!errors.displayName}
                          helperText={<>{errors.displayName?.message}</>}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      )}
                    />
                  </RowItem>
                  <RowItem label={'Password'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder="Enter new password"
                      type="password"
                      {...register('password')}
                    />
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder="Confirm new password"
                      type="password"
                      {...register('confirmPassword')}
                    />
                  </RowItem>
                </CardContent>
              </Card>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isDirty}
              >
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
