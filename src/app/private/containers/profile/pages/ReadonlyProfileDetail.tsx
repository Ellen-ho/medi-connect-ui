import React, { useContext, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { GenderType } from '../../../../../types/Share';
import { IPatient } from '../../../../../types/Patients';
import { AuthContext } from '../../../../../context/AuthContext';
import { ProfileDetailWrapper } from './ProfileDetail.styled';
import useSWR from 'swr';
import { getPatientProfile } from '../../../../../services/PatientService';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FmdBadOutlinedIcon from '@mui/icons-material/FmdBadOutlined';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useSearchParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import DataLoading from '../../../../../components/signs/DataLoading';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import BasicCard from '../../../../../components/card/BasicCard';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import RowItem from '../../../../../components/form/RowItem';
import ImageAvatar from '../../../../../components/avatar/ImageAvatar';

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

const ReadonlyProfileDetail: React.FC = () => {
  const { state } = useContext(AuthContext);
  const [profile, setProfile] = useState<IPatient>(defaultPatient);
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');

  const { isLoading, mutate } = useSWR(
    'getPatientProfile',
    () =>
      getPatientProfile({
        query: {
          targetPatientId: targetPatientId as string,
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
        const { createdAt, updatedAt, id, ...newProfile } = profile;
        setProfile(newProfile);
      },
    },
  );

  return (
    <>
      <PrimaryPageTop pageTitle="Patient Profile" />
      <PrimaryPageContent>
        <ProfileDetailWrapper>
          {isLoading ? (
            <DataLoading />
          ) : profile == null ? (
            <Typography variant="h5" component="div">
              No profile found
            </Typography>
          ) : (
            <FormWrapper>
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
                  <Box>
                    <RowItem label="Avatar">
                      <ImageAvatar
                        imageUrl={profile.avatar}
                        sx={{
                          width: 50,
                          height: 50,
                        }}
                      />
                    </RowItem>
                    <RowItem label="First Name">{profile.firstName}</RowItem>
                    <RowItem label="Last Name">{profile.lastName}</RowItem>
                    <RowItem label="Birth Date">{profile.birthDate}</RowItem>
                    <RowItem label="Gender">{profile.gender}</RowItem>
                    <RowItem label="Height">{profile.heightValueCm}</RowItem>
                  </Box>
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
                  <RowItem label="Medicine">
                    {profile.allergy.medicine || '--'}
                  </RowItem>
                  <RowItem label="Food">{profile.allergy.food || '--'}</RowItem>
                  <RowItem label="Other">
                    {profile.allergy.other || '--'}
                  </RowItem>
                </CardContent>
              </Card>
              <BasicCard
                startTitleAdornment={
                  <MedicalInformationIcon sx={{ marginRight: '.5rem' }} />
                }
                title={'Medical History'}
              >
                {profile.medicalHistory !== null ? (
                  <>
                    <RowItem label="Diagnosis">
                      {profile.medicalHistory[0].diagnosis}
                    </RowItem>
                    <RowItem label="Details">
                      {profile.medicalHistory[0].diagnosisDetails}
                    </RowItem>
                  </>
                ) : (
                  <Typography variant="h5">No medical history</Typography>
                )}
              </BasicCard>

              {/* Render family history */}
              <BasicCard
                startTitleAdornment={
                  <GroupOutlinedIcon sx={{ marginRight: '.5rem' }} />
                }
                title={'Family History'}
              >
                {profile.familyHistory !== null ? (
                  <>
                    <RowItem label="Relationship">
                      {profile.familyHistory[0].relationship}
                    </RowItem>
                    <RowItem label="Diagnosis">
                      {profile.familyHistory[0].diagnosis}
                    </RowItem>
                    <RowItem label="Details">
                      {profile.familyHistory[0].diagnosisDetails}
                    </RowItem>
                  </>
                ) : (
                  <Typography variant="h5">No family history</Typography>
                )}
              </BasicCard>

              {/* Render medicine usage */}
              <BasicCard
                startTitleAdornment={
                  <FmdBadOutlinedIcon sx={{ marginRight: '.5rem' }} />
                }
                title={'Medicine Usage'}
              >
                {profile.medicineUsage !== null ? (
                  <>
                    <RowItem label="Medicine Name">
                      {profile.medicineUsage[0].medicineName}
                    </RowItem>
                    <RowItem label="Medicine Dosage">
                      {profile.medicineUsage[0].medicineDosage}
                    </RowItem>
                    <RowItem label="Medicine Unit">
                      {profile.medicineUsage[0].medicineUnit}
                    </RowItem>
                    <RowItem label="Medicine Frequency">
                      {profile.medicineUsage[0].medicineFrequency}
                    </RowItem>
                    <RowItem label="Medicine Time">
                      {profile.medicineUsage[0].medicineTime}
                    </RowItem>
                  </>
                ) : (
                  <Typography variant="h5">No family history</Typography>
                )}
              </BasicCard>
            </FormWrapper>
          )}
        </ProfileDetailWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default ReadonlyProfileDetail;
