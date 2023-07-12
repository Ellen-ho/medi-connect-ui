import { IconButton } from '@mui/material';
import { SecondaryPageTopWrapper } from './SecondaryPageTop.styled';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ISecondaryPageTopWrapperProps {
  leftElement?: React.ReactNode;
}
const SecondaryPageTop: React.FC<ISecondaryPageTopWrapperProps> = ({
  leftElement,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <SecondaryPageTopWrapper>
      <IconButton aria-label="back" onClick={handleBack} size="small">
        <ArrowBackIcon />
      </IconButton>
      {leftElement}
    </SecondaryPageTopWrapper>
  );
};

export default SecondaryPageTop;
