import { useContext, useState } from 'react';
import { IDoctor } from '../../../../../types/Doctors';
import { GenderType } from '../../../../../types/Share';
import { AuthContext } from '../../../../../context/AuthContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import {
  createDoctorProfile,
  editDoctorProfile,
  getDoctorProfile,
} from '../../../../../services/DoctorServices';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import DataLoading from '../../../../../components/signs/DataLoading';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RowItem from '../../../../../components/form/RowItem';
import AvatarUploadDialog from '../components/AvatarUploadDialog';
import ImageAvatar from '../../../../../components/avatar/ImageAvatar';
import BasicCard from '../../../../../components/card/BasicCard';
import TranslateIcon from '@mui/icons-material/Translate';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SchoolIcon from '@mui/icons-material/School';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SpecialtyMultipleSelect from '../components/SpecialtyMultipleSelect';
import {
  ButtonAreaWrapper,
  CommonWrapper,
} from '../../../../layout/CommonWrapper.styled';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface IDoctorForm
  extends Omit<
    IDoctor,
    'languagesSpoken' | 'education' | 'awards' | 'affiliations'
  > {
  languagesSpoken: Array<{ name: string }>;
  education: Array<{ name: string }>;
  awards: Array<{ name: string }>;
  affiliations: Array<{ name: string }>;
}

const defaultDoctor: IDoctorForm = {
  avatar: null,
  firstName: '',
  lastName: '',
  gender: GenderType.MALE,
  aboutMe: '',
  languagesSpoken: [],
  specialties: [],
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
  awards: [],
  affiliations: [],
};

const DoctorProfileDetail: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const hasProfile = state.hasProfile;
  const [profile, setProfile] = useState<IDoctorForm>(defaultDoctor);
  const [isAvatarUploadDialogOpen, setAvatarUploadDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IDoctorForm>({
    values: profile,
  });

  const {
    fields: languagesSpokenFields,
    append: languagesSpokenAppend,
    remove: languagesSpokenRemove,
  } = useFieldArray({
    control,
    name: 'languagesSpoken',
  });

  const {
    fields: educationFields,
    append: educationAppend,
    remove: educationRemove,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const {
    fields: awardsFields,
    append: awardsAppend,
    remove: awardsRemove,
  } = useFieldArray({
    control,
    name: 'awards',
  });

  const {
    fields: affiliationsFields,
    append: affiliationsAppend,
    remove: affiliationsRemove,
  } = useFieldArray({
    control,
    name: 'affiliations',
  });

  const onEditProfile = async (data: IDoctorForm) => {
    const payload = {
      ...data,
      careerStartDate: dayjs(data.careerStartDate).tz('Asia/Taipei').format(),
      languagesSpoken: data.languagesSpoken.map((lang) => lang.name),
      education: data.education.map((education) => education.name),
      awards: data.awards.map((award) => award.name),
      affiliations: data.affiliations.map((affiliation) => affiliation.name),
    };

    let response;
    if (hasProfile) {
      response = await editDoctorProfile(payload);
    } else {
      response = await createDoctorProfile(payload);
    }

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: {
        avatar: response.avatar,
        patientId: null,
        doctorId: response.id,
        hasProfile: true,
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
    state.doctorId ? 'getDoctorProfile' : null,
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

        const profileForForm = {
          ...newProfile,
          languagesSpoken: newProfile.languagesSpoken.map((lang) => ({
            name: lang,
          })),
          education: newProfile.education.map((education) => ({
            name: education,
          })),
          awards:
            newProfile.awards == null
              ? []
              : newProfile.awards.map((award) => ({
                  name: award,
                })),
          affiliations:
            newProfile.affiliations == null
              ? []
              : newProfile.affiliations.map((affiliation) => ({
                  name: affiliation,
                })),
        };

        setProfile(profileForForm);
      },
    },
  );

  return (
    <>
      <PrimaryPageContent>
        <CommonWrapper>
          <PrimaryPageTop pageTitle="Profile" />
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
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <input type="hidden" {...register('avatar')} />{' '}
                      <IconButton
                        onClick={handleOpenAvatarUploadDialog}
                        sx={{
                          width: 50,
                          height: 50,
                        }}
                      >
                        <ImageAvatar
                          imageUrl={profile.avatar}
                          sx={{
                            width: 50,
                            height: 50,
                          }}
                        />
                      </IconButton>
                    </Box>
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
                  <RowItem label={'Specialties'}>
                    <Controller
                      name="specialties"
                      control={control}
                      render={({ field }) => (
                        <SpecialtyMultipleSelect field={field} />
                      )}
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
                </CardContent>
              </Card>

              {/* Languages Spoken */}
              <BasicCard
                startTitleAdornment={
                  <TranslateIcon sx={{ marginRight: '.5rem' }} />
                }
                title={'Languages Spoken'}
                titleRightElement={
                  <Tooltip title={'Add new item'} placement="top">
                    <IconButton>
                      <AddCircleOutlineIcon
                        onClick={() =>
                          languagesSpokenAppend({
                            name: '',
                          })
                        }
                      />
                    </IconButton>
                  </Tooltip>
                }
              >
                <>
                  {languagesSpokenFields &&
                    languagesSpokenFields.map((language, index) => (
                      <RowItem label={`#${index + 1}`}>
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            gap: '.5rem',
                            flexDirection: 'row',
                            alignItems: 'top',
                            py: '1rem',
                          }}
                        >
                          <TextField
                            size="small"
                            variant="outlined"
                            {...register(`languagesSpoken.${index}.name`)}
                            sx={{
                              flexGrow: '1',
                            }}
                          />
                          <Tooltip title={'Delete the item'} placement="top">
                            <IconButton color={'error'}>
                              <DeleteForeverIcon
                                onClick={() => languagesSpokenRemove(index)}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </RowItem>
                    ))}
                </>
              </BasicCard>

              {/* Education */}
              <BasicCard
                startTitleAdornment={
                  <SchoolIcon sx={{ marginRight: '.5rem' }} />
                }
                title={'Education'}
                titleRightElement={
                  <Tooltip title={'Add new item'} placement="top">
                    <IconButton>
                      <AddCircleOutlineIcon
                        onClick={() =>
                          educationAppend({
                            name: '',
                          })
                        }
                      />
                    </IconButton>
                  </Tooltip>
                }
              >
                <>
                  {educationFields &&
                    educationFields.map((education, index) => (
                      <RowItem
                        label={`#${index + 1}`}
                        rightElementSx={{ flexBasis: '90%' }}
                      >
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            gap: '.5rem',
                            flexDirection: 'row',
                            alignItems: 'top',
                            py: '1rem',
                          }}
                        >
                          <TextField
                            size="small"
                            variant="outlined"
                            {...register(`education.${index}.name`)}
                            sx={{
                              flexGrow: '1',
                            }}
                          />
                          <Tooltip title={'Delete the item'} placement="top">
                            <IconButton color={'error'}>
                              <DeleteForeverIcon
                                onClick={() => educationRemove(index)}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </RowItem>
                    ))}
                </>
              </BasicCard>

              {/* awards */}
              <BasicCard
                startTitleAdornment={
                  <MilitaryTechIcon sx={{ marginRight: '.5rem' }} />
                }
                title={'Awards'}
                titleRightElement={
                  <Tooltip title={'Add new item'} placement="top">
                    <IconButton>
                      <AddCircleOutlineIcon
                        onClick={() =>
                          awardsAppend({
                            name: '',
                          })
                        }
                      />
                    </IconButton>
                  </Tooltip>
                }
              >
                <>
                  {awardsFields &&
                    awardsFields.map((award, index) => (
                      <RowItem
                        label={`#${index + 1}`}
                        rightElementSx={{ flexBasis: '90%' }}
                      >
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            gap: '.5rem',
                            flexDirection: 'row',
                            alignItems: 'top',
                            py: '1rem',
                          }}
                        >
                          <TextField
                            size="small"
                            variant="outlined"
                            {...register(`awards.${index}.name`)}
                            sx={{
                              flexGrow: '1',
                            }}
                          />
                          <Tooltip title={'Delete the item'} placement="top">
                            <IconButton color={'error'}>
                              <DeleteForeverIcon
                                onClick={() => awardsRemove(index)}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </RowItem>
                    ))}
                </>
              </BasicCard>

              {/* affiliations */}
              <BasicCard
                startTitleAdornment={
                  <AccountBalanceIcon sx={{ marginRight: '.5rem' }} />
                }
                title={'Affiliations'}
                titleRightElement={
                  <Tooltip title={'Add new item'} placement="top">
                    <IconButton>
                      <AddCircleOutlineIcon
                        onClick={() =>
                          affiliationsAppend({
                            name: '',
                          })
                        }
                      />
                    </IconButton>
                  </Tooltip>
                }
              >
                <>
                  {affiliationsFields &&
                    affiliationsFields.map((affiliation, index) => (
                      <RowItem
                        label={`#${index + 1}`}
                        rightElementSx={{ flexBasis: '90%' }}
                      >
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            gap: '.5rem',
                            flexDirection: 'row',
                            alignItems: 'top',
                            py: '1rem',
                          }}
                        >
                          <TextField
                            size="small"
                            variant="outlined"
                            {...register(`affiliations.${index}.name`)}
                            sx={{
                              flexGrow: '1',
                            }}
                          />
                          <Tooltip title={'Delete the item'} placement="top">
                            <IconButton color={'error'}>
                              <DeleteForeverIcon
                                onClick={() => affiliationsRemove(index)}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </RowItem>
                    ))}
                </>
              </BasicCard>

              <ButtonAreaWrapper>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </ButtonAreaWrapper>
            </FormWrapper>
          )}
        </CommonWrapper>
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
