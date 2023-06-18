import { Button, IconButton } from '@mui/material';
import { SecondaryPageTopWrapper } from './SecondaryPageTop.styled';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
      <IconButton aria-label="back" onClick={handleBack}>
        <ArrowBackIosIcon />
      </IconButton>
      {leftElement}
    </SecondaryPageTopWrapper>
  );
};

export default SecondaryPageTop;
