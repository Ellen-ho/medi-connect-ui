import React, { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DatesSetArg, EventSourceInput } from '@fullcalendar/core';
import dayjs from 'dayjs';
import { getCurrentMonthDateRange } from '../../../../../utils/getCurrentMonthDateRange';
import { Box } from '@mui/material';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

interface IFullCalendarEvent {
  id: string;
  start: string;
  end: string;
  allDay: boolean;
}

interface ICommonRecord {
  id: string;
  date: string;
  [key: string]: any;
}

const getCalendarEventFormat = (
  input: ICommonRecord[],
): IFullCalendarEvent[] => {
  return input.map((item) => {
    return {
      id: item.id,
      start: item.date,
      end: dayjs(item.date).add(30, 'minute').toString(),
      allDay: false,
    };
  });
};

interface IRecordCalendarProps {
  validStartDate?: string;
  validEndDate?: string;
  events: ICommonRecord[];
  eventClickCallback: (eventId: string) => void;
  dateRangeChangeCallback: (startDate: string, endDate: string) => void;
}

const RecordCalendar: React.FC<IRecordCalendarProps> = ({
  events = [],
  eventClickCallback,
  dateRangeChangeCallback,
}) => {
  const fullCalendarEvents: EventSourceInput = useMemo(() => {
    return getCalendarEventFormat(events);
  }, [events]);

  const handleDatesSet = (dateInfo: DatesSetArg) => {
    const today = dayjs();
    const currentStartDate = dayjs(dateInfo.start)
      .startOf('month')
      .format('YYYY-MM-DD');
    let currentEndDate = dayjs(dateInfo.end)
      .subtract(1, 'day')
      .endOf('month')
      .format('YYYY-MM-DD');

    if (dayjs(currentEndDate).isAfter(today)) {
      currentEndDate = today.format('YYYY-MM-DD');
    }

    dateRangeChangeCallback(currentStartDate, currentEndDate);
  };

  return (
    <>
      <Box marginBottom={'1rem'}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <SquareRoundedIcon sx={{ color: '#4d86d2' }} /> Click to see record
          details
        </Box>
      </Box>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        initialDate={new Date()}
        validRange={{
          end: new Date(),
        }}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        events={fullCalendarEvents}
        eventClick={(info) => {
          eventClickCallback(info.event.id);
        }}
        datesSet={handleDatesSet}
      />
    </>
  );
};

export default RecordCalendar;
