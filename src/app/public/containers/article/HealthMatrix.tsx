import React from 'react';
import { Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Section from '../../../../components/section/Section';

const HealthMatrixData: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
        <IconButton onClick={() => navigate('/')} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <Section
          title="Blood Pressure"
          content={[
            'Importance: Blood pressure is crucial for health as it measures the force of blood against artery walls and can indicate risks for heart disease and stroke.',
            'Systolic and Diastolic Pressures: Systolic pressure (the top number) indicates how much pressure your blood exerts against artery walls when the heart beats, while diastolic pressure (the bottom number) measures this pressure between beats. Both readings are essential for assessing cardiovascular health risks.',
          ]}
        />
        <Section
          title="Blood Sugar"
          content={[
            'Importance: Blood sugar levels are vital indicators of metabolic health, influencing the risk of diabetes, heart disease, and other metabolic syndromes.',
            'Fasting Blood Sugar and Glycated Hemoglobin (HbA1c): Fasting blood sugar tests your glucose levels after an overnight fast, which can help detect diabetes and prediabetes. HbA1c provides an average blood sugar level over the past three months, showing how well your body manages blood glucose over time.',
          ]}
        />
        <Section
          title="Body Weight"
          content={[
            'Importance: Body weight impacts numerous health aspects, including risks for heart disease, diabetes, and joint problems.',
            'Body Mass Index (BMI): BMI is a ratio of your weight to height. It is a common measure to classify underweight, normal weight, overweight, and obesity, which are critical indicators of overall health risks.',
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default HealthMatrixData;
