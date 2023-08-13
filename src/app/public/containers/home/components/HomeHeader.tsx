import { Typography } from '@mui/material';

interface IHomeHeaderProps {
  title: string;
  subtitle: string;
}

const HomeHeader: React.FC<IHomeHeaderProps> = ({ title, subtitle }) => {
  return (
    <header>
      <Typography
        variant="h3"
        sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' } }}
        gutterBottom
      >
        {title}
      </Typography>
      <Typography variant="h5" sx={{ fontSize: { xs: '1rem' } }}>
        {subtitle}
      </Typography>
    </header>
  );
};

export default HomeHeader;
