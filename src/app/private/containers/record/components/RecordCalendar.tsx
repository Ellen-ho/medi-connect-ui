import React, { useCallback, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DatesSetArg, EventSourceInput } from '@fullcalendar/core';
import dayjs from 'dayjs';
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

  const handleDatesSet = useCallback(
    (dateInfo: DatesSetArg) => {
      requestAnimationFrame(() => {
        const currentStartDate = dayjs(dateInfo.startStr).format('YYYY-MM-DD');
        const currentEndDate = dayjs(dateInfo.endStr).format('YYYY-MM-DD');

        dateRangeChangeCallback(currentStartDate, currentEndDate);
      });
    },
    [dateRangeChangeCallback],
  );

  return (
    <>
      <Box marginBottom={'1rem'}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <SquareRoundedIcon sx={{ color: '#4d86d2' }} /> Click to see record
          details
        </Box>
      </Box>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        validRange={{
          start: '2023-01-01',
          end: new Date(),
        }}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth',
        }}
        events={fullCalendarEvents}
        eventClick={(info) => {
          requestAnimationFrame(() => {
            eventClickCallback(info.event.id);
          });
        }}
        datesSet={handleDatesSet}
      />
    </>
  );
};

export default RecordCalendar;
