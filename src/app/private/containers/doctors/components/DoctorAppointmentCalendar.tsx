import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventSourceInput } from '@fullcalendar/core';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { EventImpl } from '@fullcalendar/core/internal';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { IDoctorTimeSlot } from '../../../../../services/ConsultationService';

interface IFullCalendarEvent {
  id: string;
  start: string;
  end: string;
  allDay: boolean;
  title: string;
  color: string;
}

const getCalendarEventFormat = (
  input: IDoctorTimeSlot[],
): IFullCalendarEvent[] => {
  return input.map((item) => {
    return {
      id: item.id,
      start: item.startAt,
      end: item.endAt,
      allDay: false,
      title: item.isAvailable ? 'Open' : 'Not Available',
      color: item.isAvailable ? '#26A69A' : '#FFAB91',
      extendedProps: {
        isAvailable: item.isAvailable,
      },
    };
  });
};

interface IDoctorAppointmentCalendarProps {
  events: IDoctorTimeSlot[];
  doctorName: string;
  eventClickCallback: (eventId: string) => void;
}

const DoctorAppointmentCalendar: React.FC<IDoctorAppointmentCalendarProps> = ({
  events = [],
  doctorName,
  eventClickCallback,
}) => {
  const fullCalendarEvents: EventSourceInput = getCalendarEventFormat(events);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventImpl | null>(null);

  const handleClickOpen = () => {
    setConfirmDialogOpen(true);
  };

  const handleClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirm = () => {
    eventClickCallback(currentEvent?.id as string);
    setConfirmDialogOpen(false);
    handleClose();
  };

  return (
    <>
      <Box marginBottom={'1rem'}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <SquareRoundedIcon sx={{ color: '#26A69A' }} /> Open
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <SquareRoundedIcon sx={{ color: '#FFAB91' }} /> Not Available
        </Box>
      </Box>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay', // user can switch between the two
        }}
        events={fullCalendarEvents}
        eventClick={(info) => {
          if (!info.event.extendedProps.isAvailable) return;
          setCurrentEvent(info.event);
          handleClickOpen();
        }}
      />
      <Dialog open={isConfirmDialogOpen} onClose={handleClose}>
        <DialogTitle>{'Make Appointment Confirmation'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to book appointment of this time slot? <br />- Doctor:
            Dr. {doctorName} <br />- Date time:{' '}
            {dateFormatter(currentEvent?.startStr as string)} ~{' '}
            {dateFormatter(currentEvent?.endStr as string)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DoctorAppointmentCalendar;
