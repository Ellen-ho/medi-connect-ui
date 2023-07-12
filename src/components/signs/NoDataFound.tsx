import React, { ReactNode } from 'react';

import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import styled from '@emotion/styled';
import { NoDataFoundStyled } from './NoDataFound.styled';

type TNodataFound = {
  label?: string;
  children?: ReactNode;
};

const NoDataFound: React.FC<TNodataFound> = ({ label, children = '' }) => {
  return (
    <NoDataFoundStyled>
      <InfoTwoToneIcon fontSize="small" />{' '}
      <span>{label || 'There is no data found.'}</span>
      {children}
    </NoDataFoundStyled>
  );
};

export default NoDataFound;
