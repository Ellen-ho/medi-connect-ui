import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import HomeHeader from '../components/HomeHeader';
import questionUrl from '/src/assets/home_icon_question.png';
import recodUrl from '/src/assets/home_icon_record.png';
import goalUrl from '/src/assets/home_icon_goal.png';
import consultUrl from '/src/assets/home_icon_consult.png';
import HomeJoin from '../components/HomeJoin';
import HomeFaq from '../components/HomeFaq';
import { mq } from '../../../../../styles/media-query';

const homeFeatureList = [
  {
    title: 'Get Your Health Questions Answered',
    description:
      'You can ask medical questions and receive answers from our experienced doctors, providing quick and reliable medical advice.',
    icon: questionUrl,
  },
  {
    title: 'Streamline Your Health Records',
    description:
      'We help you organize and manage your medical records in a systematic and efficient manner, reducing the hassle of dealing with paper documents.',

    icon: recodUrl,
  },
  {
    title: 'Achieve Your Health Ambitions',
    description:
      'Our professional medical team will oversee your health data records and set personalized health goals for you, with guidance tailored to your specific needs.',

    icon: goalUrl,
  },
  {
    title: 'Consult with Trusted Medical Professionals',
    description:
      'You can schedule online consultations with doctors outside of limited physical clinic hours, ensuring you receive expert medical care and advice.',

    icon: consultUrl,
  },
];

const HomeLanding: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          mb: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            width: '100%',
            gap: '30px',
          }}
        >
          <HomeHeader />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={mq({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: '30px',
                width: ['90%', '90%', '70%'],
              })}
            >
              {homeFeatureList.map(({ title, description, icon }) => (
                <HomeFeatureIntro
                  title={title}
                  description={description}
                  icon={icon}
                />
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={mq({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: '30px',
                width: ['90%', '90%', '70%'],
              })}
            >
              <HomeJoin />
              <HomeFaq />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
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
    <Card
      sx={{
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
      }}
    >
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
          }}
        ></Box>
      </CardContent>
    </Card>
  );
};
