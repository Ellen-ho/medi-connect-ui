import { Typography } from '@mui/material';
import { PrimaryPageTopWrapper } from './PrimaryPageTop.styled';

interface IPrimaryPageTopWrapperProps {
  pageTitle: string;
  leftElement?: React.ReactNode;
}
const PrimaryPageTop: React.FC<IPrimaryPageTopWrapperProps> = ({
  pageTitle,
  leftElement,
}) => {
  return (
    <PrimaryPageTopWrapper>
      <Typography variant="h5">{pageTitle}</Typography>
      {leftElement}
    </PrimaryPageTopWrapper>
  );
};

export default PrimaryPageTop;
