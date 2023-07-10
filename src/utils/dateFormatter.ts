import * as dayjs from 'dayjs';

export const dateFormatter = (date: string) => {
  return dayjs(date).format('MMM D, YYYY h:mm A');
};
