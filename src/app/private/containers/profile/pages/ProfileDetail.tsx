import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import TextField from '@mui/material/TextField';
import { ProfileDetailWrapper } from './ProfileDetail.styled';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import useSWR from 'swr';
import {
  createPatientProfile,
  editPatientProfile,
  getPatientProfile,
} from '../../../../../services/PatientService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FmdBadOutlinedIcon from '@mui/icons-material/FmdBadOutlined';
import { useContext, useState } from 'react';
import {
  FamilyDiagnosisType,
  IPatient,
  MedicineFrequencyType,
  MedicineTimeType,
  MedicineUnitType,
  PersonalDiagnosisType,
} from '../../../../../types/Patients';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import DataLoading from '../../../../../components/signs/DataLoading';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { AuthContext } from '../../../../../context/AuthContext';
import BasicCard from '../../../../../components/card/BasicCard';
import toast from 'react-hot-toast';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { GenderType } from '../../../../../types/Share';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSearchParams } from 'react-router-dom';
import RowItem from '../../../../../components/form/RowItem';
import ImageAvatar from '../../../../../components/avatar/ImageAvatar';
import AvatarUploadDialog from '../components/AvatarUploadDialog';

dayjs.extend(utc);
dayjs.extend(timezone);

const defaultPatient: IPatient = {
  avatar: null,
  firstName: '',
  lastName: '',
  birthDate: '',
  gender: GenderType.MALE,
  heightValueCm: 0,
  allergy: {
    food: null,
    other: null,
    medicine: null,
  },
  familyHistory: null,
  medicalHistory: null,
  medicineUsage: null,
};

const ProfileDetail: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const hasProfile = state.hasProfile;
  const [profile, setProfile] = useState<IPatient>(defaultPatient);
  const [isAvatarUploadDialogOpen, setAvatarUploadDialogOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPatient>({
    values: profile,
  });

  const {
    fields: medicalHistoryFields,
    append: medicalHistoryAppend,
    remove: medicalHistoryRemove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'medicalHistory', // unique name for your Field Array
  });

  const {
    fields: familyHistoryFields,
    append: familyHistoryAppend,
    remove: familyHistoryRemove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'familyHistory', // unique name for your Field Array
  });

  const {
    fields: medicineUsageFields,
    append: medicineUsageAppend,
    remove: medicineUsageRemove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'medicineUsage', // unique name for your Field Array
  });

  const onEditProfile = async (data: IPatient) => {
    const payload = {
      ...data,
      birthDate: dayjs(data.birthDate).tz('Asia/Taipei').format(),
    };

    let response;
    if (hasProfile) {
      response = await editPatientProfile(payload);
    } else {
      response = await createPatientProfile(payload);
    }

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: {
        avatar: response.avatar,
        patientId: response.id,
        doctorId: null,
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
    state.patientId ? 'getPatientProfile' : null,
    () =>
      getPatientProfile({
        query: {
          targetPatientId: state.patientId as string,
        },
      }),
    {
      onSuccess: (data) => {
        const profile = {
          ...data,
          birthDate: dayjs(data.birthDate)
            .tz('Asia/Taipei')
            .format('YYYY-MM-DD'),
        };
        /**
         * The createdAt, updatedAt, and id properties are assigned to their own variables using object destructuring.
         * The remaining properties of the profile object are assigned to a new object called newProfile using the spread operator.
         */
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
              <BasicCard
                startTitleAdornment={
                  <AccountCircleIcon sx={{ marginRight: '.5rem' }} />
                }
                title={'Personal'}
              >
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
                <RowItem label={'Birth Date'}>
                  <TextField
                    size="small"
                    variant="outlined"
                    type="date"
                    {...register('birthDate')}
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
                <RowItem label={'Height'}>
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">cm</InputAdornment>
                      ),
                    }}
                    size="small"
                    variant="outlined"
                    type="number"
                    {...register('heightValueCm')}
                  />
                </RowItem>
              </BasicCard>
              <BasicCard
                startTitleAdornment={
                  <FmdBadOutlinedIcon sx={{ marginRight: '.5rem' }} />
                }
                title={'Allergy'}
              >
                <RowItem label={'Medicine'}>
                  <TextField
                    size="small"
                    variant="outlined"
                    {...register('allergy.medicine')}
                  />
                </RowItem>
                <RowItem label={'Food'}>
                  <TextField
                    size="small"
                    variant="outlined"
                    {...register('allergy.food')}
                  />
                </RowItem>
                <RowItem label={'Other'}>
                  <TextField
                    size="small"
                    variant="outlined"
                    {...register('allergy.other')}
                  />
                </RowItem>
              </BasicCard>
              {/* Medical History */}
              <BasicCard
                startTitleAdornment={
                  <MedicalInformationIcon sx={{ marginRight: '.5rem' }} />
                }
                title={'Medical History'}
                titleRightElement={
                  <Tooltip title={'Add new item'} placement="top">
                    <IconButton>
                      <AddCircleOutlineIcon
                        onClick={() =>
                          medicalHistoryAppend({
                            diagnosis: PersonalDiagnosisType.OTHER,
                            diagnosisDetails: '',
                          })
                        }
                      />
                    </IconButton>
                  </Tooltip>
                }
              >
                <>
                  {medicalHistoryFields &&
                    medicalHistoryFields.map((history, index) => (
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
                          <Controller
                            name={`medicalHistory.${index}.diagnosis`}
                            control={control}
                            defaultValue={history.diagnosis}
                            render={({ field }) => (
                              <TextField
                                select
                                label={'Diagnosis'}
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                error={
                                  !!errors.medicalHistory?.[index]?.diagnosis
                                }
                                helperText={
                                  <>
                                    {
                                      errors.medicalHistory?.[index]?.diagnosis
                                        ?.message
                                    }
                                  </>
                                }
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                              >
                                {Object.values(PersonalDiagnosisType).map(
                                  (diagnosis) => (
                                    <MenuItem key={diagnosis} value={diagnosis}>
                                      {diagnosis}
                                    </MenuItem>
                                  ),
                                )}
                              </TextField>
                            )}
                          />
                          <TextField
                            label={'Details'}
                            size="small"
                            variant="outlined"
                            {...register(
                              `medicalHistory.${index}.diagnosisDetails`,
                            )}
                          />
                          <Tooltip title={'Delete the item'} placement="top">
                            <IconButton color={'error'}>
                              <DeleteForeverIcon
                                onClick={() => medicalHistoryRemove(index)}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </RowItem>
                    ))}
                </>
              </BasicCard>

              <BasicCard
                startTitleAdornment={
                  <GroupOutlinedIcon sx={{ marginRight: '.5rem' }} />
                }
                title={'Family History'}
                titleRightElement={
                  <Tooltip title={'Add new item'} placement="top">
                    <IconButton>
                      <AddCircleOutlineIcon
                        onClick={() =>
                          familyHistoryAppend({
                            diagnosis: FamilyDiagnosisType.OTHER,
                            diagnosisDetails: '',
                            relationship: '',
                          })
                        }
                      />
                    </IconButton>
                  </Tooltip>
                }
              >
                <>
                  {familyHistoryFields &&
                    familyHistoryFields.map((history, index) => (
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
                          <Controller
                            name={`familyHistory.${index}.diagnosis`}
                            control={control}
                            defaultValue={history.diagnosis}
                            render={({ field }) => (
                              <TextField
                                select
                                label={'Diagnosis'}
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                error={
                                  !!errors.familyHistory?.[index]?.diagnosis
                                }
                                helperText={
                                  <>
                                    {
                                      errors.familyHistory?.[index]?.diagnosis
                                        ?.message
                                    }
                                  </>
                                }
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                              >
                                {Object.values(FamilyDiagnosisType).map(
                                  (diagnosis) => (
                                    <MenuItem key={diagnosis} value={diagnosis}>
                                      {diagnosis}
                                    </MenuItem>
                                  ),
                                )}
                              </TextField>
                            )}
                          />

                          <TextField
                            label={'Details'}
                            size="small"
                            variant="outlined"
                            {...register(
                              `familyHistory.${index}.diagnosisDetails`,
                            )}
                          />
                          <TextField
                            label={'Relationship'}
                            size="small"
                            variant="outlined"
                            {...register(`familyHistory.${index}.relationship`)}
                          />
                          <Tooltip title={'Delete the item'} placement="top">
                            <IconButton color={'error'}>
                              <DeleteForeverIcon
                                onClick={() => familyHistoryRemove(index)}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </RowItem>
                    ))}
                </>
              </BasicCard>

              <BasicCard
                startTitleAdornment={
                  <VaccinesIcon sx={{ marginRight: '.5rem' }} />
                }
                title={'Medicince Usage'}
                titleRightElement={
                  <Tooltip title={'Add new item'} placement="top">
                    <IconButton>
                      <AddCircleOutlineIcon
                        onClick={() =>
                          medicineUsageAppend({
                            medicineName: '',
                            medicineDosage: 0,
                            medicineUnit: MedicineUnitType.MILLIGRAM,
                            medicineTime: MedicineTimeType.OTHER,
                            medicineFrequency: MedicineFrequencyType.OTHER,
                          })
                        }
                      />
                    </IconButton>
                  </Tooltip>
                }
              >
                <>
                  {medicineUsageFields &&
                    medicineUsageFields.map((usage, index) => (
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
                            label={'Medicine Name'}
                            size="small"
                            variant="outlined"
                            {...register(`medicineUsage.${index}.medicineName`)}
                          />
                          <TextField
                            label={'Medicine Dosage'}
                            size="small"
                            variant="outlined"
                            {...register(
                              `medicineUsage.${index}.medicineDosage`,
                            )}
                          />
                          <Controller
                            name={`medicineUsage.${index}.medicineUnit`}
                            control={control}
                            defaultValue={usage.medicineUnit}
                            render={({ field }) => (
                              <TextField
                                select
                                label={'Medicine Unit'}
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                error={
                                  !!errors.medicineUsage?.[index]?.medicineUnit
                                }
                                helperText={
                                  <>
                                    {
                                      errors.medicineUsage?.[index]
                                        ?.medicineUnit?.message
                                    }
                                  </>
                                }
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                              >
                                {Object.values(MedicineUnitType).map((unit) => (
                                  <MenuItem key={unit} value={unit}>
                                    {unit}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          />

                          <Controller
                            name={`medicineUsage.${index}.medicineTime`}
                            control={control}
                            defaultValue={usage.medicineTime}
                            render={({ field }) => (
                              <TextField
                                select
                                label={'Medicine Time'}
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                error={
                                  !!errors.medicineUsage?.[index]?.medicineTime
                                }
                                helperText={
                                  <>
                                    {
                                      errors.medicineUsage?.[index]
                                        ?.medicineTime?.message
                                    }
                                  </>
                                }
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                              >
                                {Object.values(MedicineTimeType).map((time) => (
                                  <MenuItem key={time} value={time}>
                                    {time}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          />

                          <Controller
                            name={`medicineUsage.${index}.medicineFrequency`}
                            control={control}
                            defaultValue={usage.medicineFrequency}
                            render={({ field }) => (
                              <TextField
                                select
                                label={'Medicine Frequency'}
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                error={
                                  !!errors.medicineUsage?.[index]
                                    ?.medicineFrequency
                                }
                                helperText={
                                  <>
                                    {
                                      errors.medicineUsage?.[index]
                                        ?.medicineFrequency?.message
                                    }
                                  </>
                                }
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                              >
                                {Object.values(MedicineFrequencyType).map(
                                  (frequency) => (
                                    <MenuItem key={frequency} value={frequency}>
                                      {frequency}
                                    </MenuItem>
                                  ),
                                )}
                              </TextField>
                            )}
                          />

                          <Tooltip title={'Delete the item'} placement="top">
                            <IconButton color={'error'}>
                              <DeleteForeverIcon
                                onClick={() => medicineUsageRemove(index)}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </RowItem>
                    ))}
                </>
              </BasicCard>

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

export default ProfileDetail;
