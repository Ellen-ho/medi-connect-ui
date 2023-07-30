import styled from '@emotion/styled';
import { mq } from '../../../../../styles/media-query';

export const DoctorListWrapper = styled.div`
  ${mq({
    display: 'flex',
    flexDirection: ['column', 'column', 'row'],
    alignItems: 'top',
    gap: '1rem',
    '> *': {
      width: ['100%', '50%', '50%'],
    },
  })}
`;
