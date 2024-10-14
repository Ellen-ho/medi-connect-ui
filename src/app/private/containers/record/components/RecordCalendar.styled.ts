import styled from '@emotion/styled';

export const CalendarWrapper = styled.div`
  .fc-view-harness {
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    opacity: 1;
    transform: translateY(0);
  }

  .fc-view-harness-exit {
    opacity: 0;
    transform: translateY(10px);
  }

  .fc-view-harness-enter {
    opacity: 1;
    transform: translateY(0);
  }

  .fc {
    will-change: opacity, transform;
  }
`;
