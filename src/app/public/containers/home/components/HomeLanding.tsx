import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import HomeHeader from './HomeHeader';
import questionUrl from '/src/assets/home_icon_question.png';
import recodUrl from '/src/assets/home_icon_record.png';
import goalUrl from '/src/assets/home_icon_goal.png';
import consultUrl from '/src/assets/home_icon_consult.png';

const homeFeatureList = [
  {
    title: 'Get Your Health Questions Answered',
    description:
      'This feature allows users to ask medical questions and receive answers from experienced doctors, providing quick and reliable medical advice.',

    icon: questionUrl,
  },
  {
    title: 'Streamline Your Health Records',
    description:
      'This feature helps users organize and manage their medical records in a systematic and efficient manner, reducing the hassle of dealing with paper documents.',

    icon: recodUrl,
  },
  {
    title: 'Achieve Your Health Ambitions',
    description:
      "Users can set and work towards personalized health goals, whether it's weight management, fitness, or disease prevention, with guidance tailored to their specific needs.",

    icon: goalUrl,
  },
  {
    title: 'Consult with Trusted Medical Professionals',
    description:
      'Users have the opportunity to consult with trusted and experienced doctors, ensuring they receive expert medical care and advice.',

    icon: consultUrl,
  },
];

const HomeLanding: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          maxWidth: '1280px',
          gap: '1rem',
        }}
      >
        <HomeHeader />
        <Divider sx={{ my: '1.5rem' }} />
        {homeFeatureList.map(({ title, description, icon }) => (
          <HomeFeatureIntro
            title={title}
            description={description}
            icon={icon}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HomeLanding;

interface IHomeFeatureIntroProps {
  title: string;
  description: string;
  icon: string;
}

const HomeFeatureIntro: React.FC<IHomeFeatureIntroProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          height: '300px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'center',
            width: '70%',
            paddingLeft: '1.5rem',
          }}
        >
          {' '}
          <Typography
            variant="h4"
            sx={{
              marginBottom: '30px',
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color={'text.secondary'}
            sx={{ fontSize: { xs: '1rem' } }}
          >
            {description}
          </Typography>
        </Box>

        <Box
          sx={{
            width: '30%',
            background: `url(${icon}) no-repeat center`,
            backgroundSize: 'contain',
            // height: { xs: '200px', sm: '300px', md: '450px' },
          }}
        ></Box>
      </CardContent>
    </Card>
  );
};
