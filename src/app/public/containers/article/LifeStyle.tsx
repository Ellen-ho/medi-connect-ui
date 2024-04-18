import React from 'react';
import { Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Section from '../../../../components/section/Section';

const LifestyleData: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
        <IconButton onClick={() => navigate('/')} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <Section
          title="Exercise"
          content={[
            'Importance: Regular physical activity is crucial for maintaining overall health and reducing the risk of many chronic diseases.',
            'Intensity, Duration, and Type: The intensity and duration of exercise affect cardiovascular health and calorie burn, while the type of activity can influence different aspects of physical and mental health.',
          ]}
        />
        <Section
          title="Sleep"
          content={[
            'Importance: Sleep is essential for physical and mental recovery, affecting overall health, cognitive function, and emotional stability.',
            'Duration and Quality: The length and quality of sleep both play roles in heart health, weight management, and mental health. Poor sleep can lead to serious health issues, including increased stress, obesity, and hypertension.',
          ]}
        />
        <Section
          title="Diet"
          content={[
            'Importance: Eating a balanced diet is fundamental for health, influencing energy levels, weight control, and the risk of many diseases.',
            'Content, Timing, and Quantity: The nutritional content of food, timing of meals, and portion sizes can significantly affect metabolic health, weight, and energy levels.',
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default LifestyleData;
