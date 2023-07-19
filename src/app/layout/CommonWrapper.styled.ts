import styled from '@emotion/styled';
import { mq } from '../../styles/media-query';

export const CommonWrapper = styled.div`
  ${mq({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    '> *': {
      width: ['100%', '100%', '70%'],
    },
  })}
`;
