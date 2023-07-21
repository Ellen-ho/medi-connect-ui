import * as dayjs from 'dayjs';

export const dateFormatter = (
  date: string,
  format: string = 'MMM D, YYYY h:mm A',
) => {
  return dayjs(date).format(format);
};
