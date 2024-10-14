import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventSourceInput } from '@fullcalendar/core';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { CalendarWrapper } from './RecordCalendar.styled';

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
  return input.map((item) => ({
    id: item.id,
    start: item.date,
    end: dayjs(item.date).add(30, 'minute').toString(),
    allDay: false,
  }));
};

interface IRecordCalendarProps {
  events: ICommonRecord[];
  eventClickCallback: (eventId: string) => void;
  onDateChange: (date: Date) => void;
  currentDate: Date;
}

const RecordCalendar: React.FC<IRecordCalendarProps> = ({
  events = [],
  eventClickCallback,
  onDateChange,
  currentDate,
}) => {
  const calendarRef = useRef<FullCalendar>(null);
  const eventsRef = useRef(events);
  const currentDateRef = useRef(currentDate);

  const fullCalendarEvents: EventSourceInput = useMemo(() => {
    if (events.length === 0) {
      return [];
    }
    return getCalendarEventFormat(events);
  }, [events]);

  const handleDatesSet = useCallback(
    (arg: any) => {
      const newDate = arg.view.currentStart;
      if (
        newDate.getMonth() !== currentDateRef.current.getMonth() ||
        newDate.getFullYear() !== currentDateRef.current.getFullYear()
      ) {
        onDateChange(newDate);
      }
    },
    [onDateChange],
  );

  const handleEventClick = useCallback(
    (info: any) => {
      eventClickCallback(info.event.id);
    },
    [eventClickCallback],
  );

  useLayoutEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();

      if (currentDate.getTime() !== currentDateRef.current.getTime()) {
        calendarApi.gotoDate(currentDate);
        currentDateRef.current = currentDate;
      }

      if (events !== eventsRef.current) {
        calendarApi.removeAllEvents();
        calendarApi.addEventSource(fullCalendarEvents);
        eventsRef.current = events;
      }
    }
  }, [currentDate, events, fullCalendarEvents]);

  return (
    <>
      <Box marginBottom={'1rem'}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <SquareRoundedIcon sx={{ color: '#4d86d2' }} /> Click to see record
          details
        </Box>
      </Box>
      <CalendarWrapper>
        <FullCalendar
          ref={calendarRef}
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
          eventClick={handleEventClick}
          datesSet={handleDatesSet}
          initialDate={currentDate}
          height="auto"
        />
      </CalendarWrapper>
    </>
  );
};

export default React.memo(RecordCalendar);
