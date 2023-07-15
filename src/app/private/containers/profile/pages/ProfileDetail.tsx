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
import { useState } from 'react';
import { IPatient } from '../../../../../types/Patients';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import DataLoading from '../../../../../components/signs/DataLoading';
import { useForm } from 'react-hook-form';

// const schema = yup
//   .object({
//     content: yup.string().required(),
//     medicalSpecialty: yup.string().required(),
//   })
//   .required();

const ProfileDetail: React.FC = () => {
  const [profile, setProfile] = useState<IPatient | null>();

  const generateFallbackAvatar = (alt: string) => {
    const initials = alt.substring(0, 1).toUpperCase();
    return (
      <Avatar sx={{ bgcolor: deepOrange[500] }} alt={alt}>
        {initials}
      </Avatar>
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPatient>();
  // {resolver: yupResolver(schema),}

  const onEditProfile = async (data: IPatient) => {
    await editPatientProfile(data);
  };

  const { isLoading } = useSWR('getPatientProfile', () => getPatientProfile(), {
    onSuccess: (data) => {
      setProfile(data);
    },
  });
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

                  <EditableRowItem label={'First Name'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      value={profile.firstName ?? '--'}
                      {...register('firstName')}
                    />
                  </EditableRowItem>
                  <Divider />
                  <EditableRowItem label={'Last Name'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      value={profile.lastName ?? '--'}
                      {...register('lastName')}
                    />
                  </EditableRowItem>
                  <Divider />
                  {/* TODO */}
                  {/* 
                    "avatar": null,
                    "birthDate": "1995-12-30T16:00:00.000Z",
                    "gender": "MALE",
                    heightValueCm
                    */}
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
                      value={profile.allergy.medicine ?? '--'}
                    />
                  </EditableRowItem>
                  <Divider />
                  <EditableRowItem label={'Food'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      value={profile.allergy.food ?? '--'}
                    />
                  </EditableRowItem>
                  <Divider />
                  <EditableRowItem label={'Other'}>
                    <TextField
                      size="small"
                      variant="outlined"
                      value={profile.allergy.other ?? '--'}
                    />
                  </EditableRowItem>
                  <Divider />
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
                    <MedicalInformationIcon /> Medical History
                  </Typography>
                  {profile.medicalHistory &&
                    profile.medicalHistory.map((history, index) => (
                      <>
                        <EditableRowItem label={`#${index + 1}`}>
                          {history.diagnosis}, {history.diagnosisDetails}
                        </EditableRowItem>
                        <Divider />
                      </>
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
                    <GroupOutlinedIcon /> Family History
                  </Typography>
                  {profile.familyHistory &&
                    profile.familyHistory.map((familyHistory, index) => (
                      <>
                        <EditableRowItem label={`#${index + 1}`}>
                          <Box sx={{ textAlign: 'right' }}>
                            {familyHistory.relationship} <br />
                            {familyHistory.diagnosis},{' '}
                            {familyHistory.diagnosisDetails}
                          </Box>
                        </EditableRowItem>
                        <Divider />
                      </>
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
                      <>
                        <EditableRowItem label={`#${index + 1}`}>
                          <Box sx={{ textAlign: 'right' }}>
                            {usage.medicineName} <br />
                            {usage.medicineTime}, {usage.medicineUnit},{' '}
                            {usage.medicineDosage}, {usage.medicineFrequency}
                          </Box>
                        </EditableRowItem>
                        <Divider />
                      </>
                    ))}
                </CardContent>
              </Card>

              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </FormWrapper>
          )}

          {/* <Card>
            <CardContent>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}
              >
                R
              </Avatar>
              {generateFallbackAvatar('Remy Sharp')}
              
            </CardContent>
          </Card> */}
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
/**
 * {
    "id": "3acb3290-088a-4fe4-8e57-d112522a11b8",
    "avatar": null,
    "firstName": "eric",
    "lastName": "Wang",
    "birthDate": "1995-12-30T16:00:00.000Z",
    "gender": "MALE",
    "medicalHistory": [
        {
            "diagnosis": "HYPERTENSION",
            "diagnosisDetails": "High blood pressure"
        },
        {
            "diagnosis": "DIABETES",
            "diagnosisDetails": "Type 2 diabetes"
        }
    ],
    "allergy": {
        "food": null,
        "other": null,
        "medicine": "Penicillin"
    },
    "familyHistory": [
        {
            "diagnosis": "HYPERTENSION",
            "relationship": "Father",
            "diagnosisDetails": "High blood pressure"
        },
        {
            "diagnosis": "DIABETES",
            "relationship": "Mother",
            "diagnosisDetails": "Type 2 diabetes"
        }
    ],
    "heightValueCm": "180.00",
    "medicinceUsage": [
        {
            "medicineName": "Aspirin",
            "medicineTime": "BEFORE_MEAL",
            "medicineUnit": "MILLIGRAM",
            "medicineDosage": 100,
            "medicineFrequency": "ONCE_DAILY"
        },
        {
            "medicineName": "Insulin",
            "medicineTime": "AFTER_MEAL",
            "medicineUnit": "MILLILITER",
            "medicineDosage": 20,
            "medicineFrequency": "THREE_TIMES_A_DAY"
        }
    ],
    "createdAt": "2023-06-22T12:52:41.511Z",
    "updatedAt": "2023-06-22T12:52:41.511Z"
}
 */
