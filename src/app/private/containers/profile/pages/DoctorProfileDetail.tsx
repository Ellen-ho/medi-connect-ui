import { useContext, useState } from 'react';
import { IDoctor } from '../../../../../types/Doctors';
import { GenderType, MedicalSpecialtyType } from '../../../../../types/Share';
import { AuthContext } from '../../../../../context/AuthContext';
import {
  Button,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import useSWR from 'swr';
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
import RowItem from '../../../../../components/form/RowItem';
import AvatarUploadDialog from '../components/AvatarUploadDialog';
import ImageAvatar from '../../../../../components/avatar/ImageAvatar';

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
  const { state, dispatch } = useContext(AuthContext);
  const [profile, setProfile] = useState<IDoctor>(defaultDoctor);
  const [isAvatarUploadDialogOpen, setAvatarUploadDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IDoctor>({
    values: profile,
  });

  const onEditProfile = async (data: IDoctor) => {
    const payload = {
      ...data,
      careerStartDate: dayjs(data.careerStartDate).tz('Asia/Taipei').format(),
    };
    const response = await editDoctorProfile(payload);
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: {
        avatar: response.avatar,
      },
    });
    await mutate();
    toast.success('Profile updated successfully!');
  };

  const handleImageUpload = (imageUrl: string) => {
    setProfile((prev) => ({ ...prev, avatar: imageUrl }));
    setAvatarUploadDialogOpen(false);
  };

  const handleOpenAvatarUploadDialog = () => {
    setAvatarUploadDialogOpen(true);
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
                  <RowItem label="Avatar">
                    <input type="hidden" {...register('avatar')} />{' '}
                    <IconButton onClick={handleOpenAvatarUploadDialog}>
                      <ImageAvatar
                        imageUrl={profile.avatar}
                        sx={{
                          width: 50,
                          height: 50,
                        }}
                      />
                    </IconButton>
                    {/* Hidden input to hold the imageUrl */}
                    {/* <ImageUploadComponent onImageUpload={handleImageUpload} /> */}
                  </RowItem>
                  <RowItem label={'First Name'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('firstName')}
                    />
                  </RowItem>
                  <RowItem label={'Last Name'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('lastName')}
                    />
                  </RowItem>
                  <RowItem label={'Gender'}>
                    <Controller
                      name="gender"
                      control={control}
                      defaultValue={profile.gender}
                      render={({ field }) => (
                        <TextField
                          select
                          size="small"
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.gender}
                          helperText={<>{errors.gender?.message}</>}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <MenuItem key={'male'} value={'MALE'}>
                            Male
                          </MenuItem>
                          <MenuItem key={'female'} value={'FEMALE'}>
                            Female
                          </MenuItem>
                        </TextField>
                      )}
                    />
                  </RowItem>

                  <RowItem label={'About Me'} sx={{ height: '9rem' }}>
                    <TextField
                      multiline
                      rows={4}
                      variant="filled"
                      {...register('aboutMe')}
                    />
                  </RowItem>
                  <RowItem label={'Languages Spoken'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('languagesSpoken')}
                    />
                  </RowItem>
                  <RowItem label={'Specialties'}>
                    <MultipleSelectChip
                      names={Object.values(MedicalSpecialtyType)}
                      {...register('specialties')}
                    />
                  </RowItem>
                  <RowItem label={'Career Start Date'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      type="date"
                      {...register('careerStartDate')}
                    />
                  </RowItem>
                  <RowItem label={'Office Practical Location Line 1'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.line1')}
                    />
                  </RowItem>

                  <RowItem label={'Office Practical Location Line 2'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.line2')}
                    />
                  </RowItem>

                  <RowItem label={'City'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.city')}
                    />
                  </RowItem>

                  <RowItem label={'State / Province'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.stateProvince')}
                    />
                  </RowItem>

                  <RowItem label={'Postal Code'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.postalCode')}
                    />
                  </RowItem>

                  <RowItem label={'Country'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.country')}
                    />
                  </RowItem>

                  <RowItem label={'Country Code'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('officePracticalLocation.countryCode')}
                    />
                  </RowItem>
                  <RowItem label={'Education'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('education')}
                    />
                  </RowItem>
                  <RowItem label={'Awards'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('awards')}
                    />
                  </RowItem>
                  <RowItem label={'Affiliations'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('affiliations')}
                    />
                  </RowItem>
                </CardContent>
              </Card>

              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </FormWrapper>
          )}
        </ProfileDetailWrapper>
      </PrimaryPageContent>
      <AvatarUploadDialog
        isOpen={isAvatarUploadDialogOpen}
        onClose={() => setAvatarUploadDialogOpen(false)}
        imageUrl={profile.avatar}
        onImageUpload={handleImageUpload}
      />
    </>
  );
};

export default DoctorProfileDetail;
