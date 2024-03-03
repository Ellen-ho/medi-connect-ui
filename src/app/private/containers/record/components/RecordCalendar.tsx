import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DatesSetArg, EventSourceInput } from '@fullcalendar/core';
import { EventImpl } from '@fullcalendar/core/internal';
import dayjs from 'dayjs';

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
  const fullCalendarEvents: EventSourceInput = getCalendarEventFormat(events);

  // This handler will be triggered when perv/next button being clicked
  const handleDatesSet = (dateInfo: DatesSetArg) => {
    console.log({
      startStr: dayjs(dateInfo.startStr).format('YYYY-MM-DD'),
      endStr: dayjs(dateInfo.endStr).format('YYYY-MM-DD'),
    });
    dateRangeChangeCallback(
      dayjs(dateInfo.startStr).format('YYYY-MM-DD'),
      dayjs(dateInfo.endStr).format('YYYY-MM-DD'),
    );
  };

  return (
    <>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        initialDate={new Date()}
        // validRange={{
        //   start: validStartDate,
        //   end: validEndDate,
        // }}
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
