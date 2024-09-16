import { Box } from '@mui/material';
import AppFooter from './AppFooter';
import MainContent from './MainContent.styled';
import ResponsiveAppBar from './ResponsiveAppBar';

interface IHomeLandingLayoutProps {
  children: React.ReactNode;
}
const HomeLandingLayout: React.FC<IHomeLandingLayoutProps> = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ mb: '3rem' }}>
        <MainContent padding={'0'}>{children}</MainContent>
      </Box>
      <AppFooter />
    </>
  );
};

export default HomeLandingLayout;
