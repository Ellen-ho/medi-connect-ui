import dayjs from 'dayjs';

export const getCurrentMonthDateRange = () => {
  const today = dayjs();
  let start = today.startOf('month');
  let end = today.endOf('month');

  const currentStartDate = start.format('YYYY-MM-DD');
  const currentEndDate = end.format('YYYY-MM-DD');

  return {
    currentStartDate,
    currentEndDate,
  };
};
