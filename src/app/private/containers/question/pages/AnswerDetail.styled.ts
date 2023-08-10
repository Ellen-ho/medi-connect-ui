import styled from '@emotion/styled';
import { mq } from '../../../../../styles/media-query';

export const AnswerDetailWrapper = styled.div`
  ${mq({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    '> *': {
      width: ['100%', '100%', '70%'],
    },
  })}
`;
