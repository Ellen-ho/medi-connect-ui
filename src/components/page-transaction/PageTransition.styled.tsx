import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const PageTransitionWrapper = styled.div<{ isTransitioning: boolean }>`
  position: relative;

  ${(props) =>
    props.isTransitioning &&
    css`
      opacity: 0;
      transition: opacity 0.3s ease-out;
    `}
`;
