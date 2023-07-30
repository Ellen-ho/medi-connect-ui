import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { ProfileDetailWrapper } from './ProfileDetail.styled';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Icon,
  IconButton,
  InputAdornment,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import useSWR from 'swr';
import {
  editPatientProfile,
  getPatientProfile,
} from '../../../../../services/PatientService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FmdBadOutlinedIcon from '@mui/icons-material/FmdBadOutlined';
import { useContext, useState } from 'react';
import { IPatient, PersonalDiagnosisType } from '../../../../../types/Patients';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import DataLoading from '../../../../../components/signs/DataLoading';
import { useFieldArray, useForm } from 'react-hook-form';
import { AuthContext } from '../../../../../context/AuthContext';
import BasicCard from '../../../../../components/card/BasicCard';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import toast from 'react-hot-toast';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { GenderType } from '../../../../../types/Share';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

dayjs.extend(utc);
dayjs.extend(timezone);

// const schema = yup
//   .object({
//     content: yup.string().required(),
//     medicalSpecialty: yup.string().required(),
//   })
//   .required();

const defautPatient: IPatient = {
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
  medicinceUsage: null,
};

const ProfileDetail: React.FC = () => {
  const { state } = useContext(AuthContext);
  const [profile, setProfile] = useState<IPatient>(defautPatient);

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
  } = useForm<IPatient>({
    values: profile,
  });
  // {resolver: yupResolver(schema),}

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
    fields: medicinceUsageyFields,
    append: medicinceUsageAppend,
    remove: medicinceUsageRemove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'medicinceUsage', // unique name for your Field Array
  });

  const onEditProfile = async (data: IPatient) => {
    console.log(data);
    const payload = {
      ...data,
      birthDate: dayjs(data.birthDate).tz('Asia/Taipei').format(),
      avatar: 'https://i.pravatar.cc/200',
    };
    await editPatientProfile(payload);
    await mutate();
    toast.success('Profile updated successfully!');
  };

  const { isLoading, mutate } = useSWR(
    'getPatientProfile',
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
              {/* <BasicCard
                startTitleAdornment={<SentimentSatisfiedAltIcon />}
                title={'Avatar'}
              >
                <CardContent>
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <IconButton>
                      <Avatar
                        src={profile.avatar ?? undefined}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        sx={{ width: 56, height: 56 }}
                      >
                        R
                      </Avatar>
                    </IconButton>
                  </label>
                </CardContent>
              </BasicCard> */}
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
                  <EditableRowItem label={'Birth Date'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      type="date"
                      {...register('birthDate')}
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
                  <EditableRowItem label={'Height'}>
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
                  </EditableRowItem>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
                  >
                    <FmdBadOutlinedIcon /> Allergy
                  </Typography>
                  <EditableRowItem label={'Medicine'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('allergy.medicine')}
                    />
                  </EditableRowItem>
                  <EditableRowItem label={'Food'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('allergy.food')}
                    />
                  </EditableRowItem>
                  <EditableRowItem label={'Other'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      {...register('allergy.other')}
                    />
                  </EditableRowItem>
                </CardContent>
              </Card>
              {/* Medical History */}
              <BasicCard
                startTitleAdornment={
                  <MedicalInformationIcon sx={{ marginRight: '.5rem' }} />
                }
                title={'Medical History'}
                titleLeftElement={
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
                      <EditableRowItem label={`#${index + 1}`}>
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
                            select
                            label={'Diagnosis'}
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.gender}
                            helperText={<>{errors.gender?.message}</>}
                            value={history.diagnosis}
                            {...register(`medicalHistory.${index}.diagnosis`)}
                          >
                            {Object.values(PersonalDiagnosisType).map(
                              (diagnosis) => (
                                <MenuItem key={diagnosis} value={diagnosis}>
                                  {diagnosis}
                                </MenuItem>
                              ),
                            )}
                          </TextField>
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
                      </EditableRowItem>
                    ))}
                </>
              </BasicCard>

              <Card>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
                  >
                    <GroupOutlinedIcon /> Family History
                  </Typography>
                  {profile.familyHistory &&
                    profile.familyHistory.map((familyHistory, index) => (
                      <Box key={index}>
                        <EditableRowItem label={`#${index + 1}`}>
                          <Box sx={{ textAlign: 'right' }}>
                            {familyHistory.relationship} <br />
                            {familyHistory.diagnosis},{' '}
                            {familyHistory.diagnosisDetails}
                          </Box>
                        </EditableRowItem>
                        <Divider />
                      </Box>
                    ))}
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
                  >
                    <VaccinesIcon /> Medicine Usage
                  </Typography>
                  {profile.medicinceUsage &&
                    profile.medicinceUsage.map((usage, index) => (
                      <Box key={index}>
                        <EditableRowItem label={`#${index + 1}`}>
                          <Box sx={{ textAlign: 'right' }}>
                            {usage.medicineName} <br />
                            {usage.medicineTime}, {usage.medicineUnit},{' '}
                            {usage.medicineDosage}, {usage.medicineFrequency}
                          </Box>
                        </EditableRowItem>
                        <Divider />
                      </Box>
                    ))}
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

export default ProfileDetail;

interface IEditableRowItemProps {
  label: string;
  children?: React.ReactNode;
}
const EditableRowItem: React.FC<IEditableRowItemProps> = ({
  label,
  children,
}) => {
  return (
    <>
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
      <Divider />
    </>
  );
};
