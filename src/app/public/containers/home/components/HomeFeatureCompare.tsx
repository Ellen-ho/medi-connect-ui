import React from 'react';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

type FeatureProps = {
  feature: string;
  mediConnect: JSX.Element;
  handwrittenHealthRecords: JSX.Element;
  primaryCareClinics: JSX.Element;
  inaccurateMedicalInformationOnSocialMedia: JSX.Element;
};
const FeatureRow = styled(Grid)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1, 0),
}));

const FeatureCheck = styled(CheckIcon)({
  color: 'green',
});

const FeatureCross = styled(CloseIcon)({
  color: 'red',
});

const features: FeatureProps[] = [
  {
    feature: 'Integrating Vital Physiological Tests with Lifestyle Logs',
    mediConnect: <FeatureCheck />,
    handwrittenHealthRecords: <FeatureCross />,
    primaryCareClinics: <></>,
    inaccurateMedicalInformationOnSocialMedia: <></>,
  },
  {
    feature:
      'Beyond Clinic Limits, Physicians Gain Comprehensive Insight into Your Health',
    mediConnect: <FeatureCheck />,
    handwrittenHealthRecords: <></>,
    primaryCareClinics: <FeatureCross />,
    inaccurateMedicalInformationOnSocialMedia: <></>,
  },
  {
    feature: 'Professional specialists are available to answer your inquiries.',
    mediConnect: <FeatureCheck />,
    handwrittenHealthRecords: <></>,
    primaryCareClinics: <></>,
    inaccurateMedicalInformationOnSocialMedia: <FeatureCross />,
  },
];

const HomeFeatureCompare: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">
          We Empower Your Health Journey Effectively
        </Typography>
      </Grid>
      <FeatureRow container>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          Medi Connect
        </Grid>
        <Grid item xs={2}>
          Hand Written Health Records
        </Grid>
        <Grid item xs={2}>
          PrimaryCare Clinics
        </Grid>
        <Grid item xs={2}>
          Inaccurate Medical Information On Social Media
        </Grid>
      </FeatureRow>
      {features.map((feature) => (
        <FeatureRow container key={feature.feature}>
          <Grid item xs={3}>
            <Typography>{feature.feature}</Typography>
          </Grid>
          <Grid item xs={3}>
            {feature.mediConnect}
          </Grid>
          <Grid item xs={2}>
            {feature.handwrittenHealthRecords}
          </Grid>
          <Grid item xs={2}>
            {feature.primaryCareClinics}
          </Grid>
          <Grid item xs={2}>
            {feature.inaccurateMedicalInformationOnSocialMedia}
          </Grid>
        </FeatureRow>
      ))}
    </Grid>
  );
};

export default HomeFeatureCompare;
