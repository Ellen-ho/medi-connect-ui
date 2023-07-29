import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const dateFormatter = (
  date: string,
  format: string = 'MMM D, YYYY h:mm A',
) => {
  return dayjs(date).tz('Asia/Taipei').format(format);
};
