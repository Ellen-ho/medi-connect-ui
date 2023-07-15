import React, { ReactNode } from 'react';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { NoDataFoundStyled } from './NoDataFound.styled';

interface INoDataFound {
  label?: string;
  children?: ReactNode;
}

const NoDataFound: React.FC<INoDataFound> = ({ label, children = '' }) => {
  return (
    <NoDataFoundStyled>
      <InfoTwoToneIcon fontSize="small" />{' '}
      <span>{label || 'There is no data found.'}</span>
      {children}
    </NoDataFoundStyled>
  );
};

export default NoDataFound;
