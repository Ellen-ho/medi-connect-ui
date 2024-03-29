import styled from '@emotion/styled';
import { mq } from '../../../../../styles/media-query';

export const CreateQuestionWrapper = styled.div`
  ${mq({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '> *': {
      width: ['100%', '100%', '70%'],
    },
  })}
`;
