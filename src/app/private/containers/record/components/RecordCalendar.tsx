import React, { useMemo, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DatesSetArg, EventSourceInput } from '@fullcalendar/core';
import { EventImpl } from '@fullcalendar/core/internal';
import dayjs from 'dayjs';
import { getCurrentMonthDateRange } from '../../../../../utils/getCurrentMonthDateRange';

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

  // This handler will be triggered when perv/next button being clicked
  const handleDatesSet = (dateInfo: DatesSetArg) => {
    const { currentStartDate, currentEndDate } = getCurrentMonthDateRange(
      new Date(dateInfo.view.title),
    );
    dateRangeChangeCallback(currentStartDate, currentEndDate);
  };

  return (
    <>
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
          right: 'dayGridMonth,timeGridWeek', // user can switch between the two
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
