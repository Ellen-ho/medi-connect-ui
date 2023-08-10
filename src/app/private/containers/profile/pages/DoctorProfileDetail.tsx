import { useContext, useState } from 'react';
import { IDoctor } from '../../../../../types/Doctors';
import { GenderType, MedicalSpecialtyType } from '../../../../../types/Share';
import { AuthContext } from '../../../../../context/AuthContext';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useFieldArray, useForm } from 'react-hook-form';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import useSWR, { mutate } from 'swr';
import toast from 'react-hot-toast';
import {
  editDoctorProfile,
  getDoctorProfile,
} from '../../../../../services/DoctorServices';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { ProfileDetailWrapper } from './ProfileDetail.styled';
import DataLoading from '../../../../../components/signs/DataLoading';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MultipleSelectChip from '../../../../../components/form/MultipleSelectChip';

dayjs.extend(utc);
dayjs.extend(timezone);

const defaultDoctor: IDoctor = {
  avatar: null,
  firstName: '',
  lastName: '',
  gender: GenderType.MALE,
  aboutMe: '',
  languagesSpoken: [],
  specialties: [MedicalSpecialtyType.INTERNAL_MEDICINE],
  careerStartDate: '',
  officePracticalLocation: {
    line1: '',
    line2: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: '',
    countryCode: '',
  },
  education: [],
  awards: null,
  affiliations: null,
};

const DoctorProfileDetail: React.FC = () => {
  const { state } = useContext(AuthContext);
  const [profile, setProfile] = useState<IDoctor>(defaultDoctor);

  function generateFallbackAvatar(alt: string) {
    const initials = alt.substring(0, 1).toUpperCase();
    return (
      <Avatar sx={{ bgcolor: deepOrange[500] }} alt={alt}>
        {initials}
      </Avatar>
    );
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IDoctor>({
    values: profile,
  });

  const onEditProfile = async (data: IDoctor) => {
    console.log(data);
    const payload = {
      ...data,
      careerStartDate: dayjs(data.careerStartDate).tz('Asia/Taipei').format(),
      avatar: 'https://i.pravatar.cc/200',
    };
    await editDoctorProfile(payload);
    await mutate();
    toast.success('Profile updated successfully!');
  };

  const { isLoading, mutate } = useSWR(
    'getDoctorProfile',
    () => getDoctorProfile(state.doctorId as string),
    {
      onSuccess: (data) => {
        const profile = {
          ...data,
          careerStartDate: dayjs(data.careerStartDate)
            .tz('Asia/Taipei')
            .format('YYYY-MM-DD'),
        };

        const { createdAt, updatedAt, id, ...newProfile } = profile;

        setProfile(newProfile);
      },
    },
  );

  return (
    <>
      <PrimaryPageTop pageTitle="Profile" />
      <PrimaryPageContent>
        <ProfileDetailWrapper>
          {isLoading ? (
            <DataLoading />
          ) : profile == null ? (
            <Typography variant="h5" component="div">
              No profile found
            </Typography>
          ) : (
            <FormWrapper onSubmit={handleSubmit(onEditProfile)}>
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
                  <EditableRowItem label={'Avatar'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('avatar')}
                    />
                  </EditableRowItem>
                  <EditableRowItem label={'First Name'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('firstName')}
                    />
                  </EditableRowItem>
                  <EditableRowItem label={'Last Name'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('lastName')}
                    />
                  </EditableRowItem>
                  <EditableRowItem label={'Gender'}>
                    <TextField
                      select
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.gender}
                      helperText={<>{errors.gender?.message}</>}
                      value={profile.gender}
                      {...register('gender')}
                    >
                      <MenuItem key={'male'} value={'MALE'}>
                        Male
                      </MenuItem>
                      <MenuItem key={'femal'} value={'FEMALE'}>
                        Female
                      </MenuItem>
                    </TextField>
                  </EditableRowItem>
                  <EditableRowItem label={'About Me'} height={'9rem'}>
                    <TextField
                      multiline
                      rows={4}
                      variant="filled"
                      {...register('aboutMe')}
                    />
                  </EditableRowItem>
                  <EditableRowItem label={'Languages Spoken'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('languagesSpoken')}
                    />
                  </EditableRowItem>
                  <EditableRowItem label={'Specialties'}>
                    <MultipleSelectChip
                      names={Object.values(MedicalSpecialtyType)}
                      {...register('specialties')}
                    />
                  </EditableRowItem>
                  <EditableRowItem label={'Career Start Date'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      type="date"
                      {...register('careerStartDate')}
                    />
                  </EditableRowItem>
                  <EditableRowItem label={'Office Practical Location Line 1'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.line1')}
                    />
                  </EditableRowItem>

                  <EditableRowItem label={'Office Practical Location Line 2'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.line2')}
                    />
                  </EditableRowItem>

                  <EditableRowItem label={'City'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.city')}
                    />
                  </EditableRowItem>

                  <EditableRowItem label={'State / Province'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.stateProvince')}
                    />
                  </EditableRowItem>

                  <EditableRowItem label={'Postal Code'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.postalCode')}
                    />
                  </EditableRowItem>

                  <EditableRowItem label={'Country'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.country')}
                    />
                  </EditableRowItem>

                  <EditableRowItem label={'Country Code'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.countryCode')}
                    />
                  </EditableRowItem>
                  <EditableRowItem label={'Education'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('education')}
                    />
                  </EditableRowItem>
                  <EditableRowItem label={'Awards'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('awards')}
                    />
                  </EditableRowItem>
                  <EditableRowItem label={'Affiliations'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('affiliations')}
                    />
                  </EditableRowItem>
                </CardContent>
              </Card>

              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </FormWrapper>
          )}
        </ProfileDetailWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default DoctorProfileDetail;

interface IEditableRowItemProps {
  label: string;
  children?: React.ReactNode;
  height?: string;
}
const EditableRowItem: React.FC<IEditableRowItemProps> = ({
  label,
  children,
  height = '3.5rem',
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height,
        }}
      >
        <Box color="text.primary">{label}</Box>
        <Box color="text.secondary">{children}</Box>
      </Box>
      <Divider />
    </>
  );
};
