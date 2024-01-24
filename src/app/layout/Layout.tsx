import AppFooter from './AppFooter';
import MainContent from './MainContent.styled';
import ResponsiveAppBar from './ResponsiveAppBar';

interface ILayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      <MainContent>{children}</MainContent>
      <AppFooter />
    </>
  );
};

export default Layout;
