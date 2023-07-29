import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventSourceInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { EventImpl } from '@fullcalendar/core/internal';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import { IDoctorTimeSlot } from '../../../../../services/ConsultationService';
import RowItem from '../../../../../components/form/RowItem';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import dayjs from 'dayjs';

interface IEditDoctorTimeSlotInputs {
  id: string;
  startAt: string;
  endAt: string;
}

interface IFullCalendarEvent {
  id: string;
  start: string;
  end: string;
  allDay: boolean;
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
      extendedProps: {
        isAvailable: item.isAvailable,
      },
    };
  });
};

const isCreateEvent = (id: string) => id === 'CREATE_TIME_SLOT';

interface IEditDoctorTimeSlotCalendarProps {
  events: IDoctorTimeSlot[];
  eventEditCallback: (eventId: string, startAt: string, endAt: string) => void;
  eventCreateCallback: (startAt: string, endAt: string) => void;
  eventCancelCallback?: (eventId: string) => void;
  refresh: () => void;
}

const EditDoctorTimeSlotCalendar: React.FC<
  IEditDoctorTimeSlotCalendarProps
> = ({
  events = [],
  eventEditCallback,
  eventCreateCallback,
  eventCancelCallback,
  refresh,
}) => {
  const fullCalendarEvents: EventSourceInput = getCalendarEventFormat(events);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<IEditDoctorTimeSlotInputs>({
    id: '',
    startAt: '',
    endAt: '',
  });

  const handleClickOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDialogSave = (data: IEditDoctorTimeSlotInputs) => {
    if (isCreateEvent(currentEvent.id)) {
      eventCreateCallback(data.startAt, data.endAt);
    } else {
      eventEditCallback(currentEvent?.id as string, data.startAt, data.endAt);
    }
    handleEditDialogClose();
    refresh();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditDoctorTimeSlotInputs>({
    // resolver: yupResolver(
    //   yup
    //     .object({
    //       startAt: yup.string().required(),
    //       endAt: yup
    //         .string()
    //         .required()
    //         .min(yup.ref('startAt'), 'End time must be later than start time'),
    //     })
    //     .required(),
    // ),
    // defaultValues: currentEvent,
    values: currentEvent,
  });

  /**
   * Add new event and store it to DB
   * Click on existing event and can edit it and store it to DB
   * Delete event and remove it from DB
   */
  return (
    <>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        editable={true}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay', // user can switch between the two
        }}
        events={fullCalendarEvents}
        eventClick={(info) => {
          setCurrentEvent({
            id: info.event.id,
            startAt: dayjs(info.event.startStr).format('YYYY-MM-DDTHH:mm'),
            endAt: dayjs(info.event.endStr).format('YYYY-MM-DDTHH:mm'),
          });
          handleClickOpen();
        }}
        // when click on a date of calendar, create a new event
        dateClick={(info) => {
          setCurrentEvent({
            id: 'CREATE_TIME_SLOT',
            startAt: dayjs(info.dateStr).format('YYYY-MM-DDTHH:mm'),
            endAt: dayjs(info.dateStr)
              .add(30, 'minute')
              .format('YYYY-MM-DDTHH:mm'),
          });
          handleClickOpen();
        }}
      />
      <Dialog
        fullWidth
        maxWidth={'md'}
        open={isEditDialogOpen}
        onClose={handleEditDialogClose}
      >
        <FormWrapper onSubmit={handleSubmit(handleEditDialogSave)}>
          <DialogTitle>
            {isCreateEvent(currentEvent.id) ? 'Create' : 'Edit'} Time Slot
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <RowItem label={'Start At'}>
                <TextField
                  size="small"
                  variant="outlined"
                  type="datetime-local"
                  // value={currentEvent?.startAt}
                  {...register('startAt')}
                  error={!!errors.startAt}
                  helperText={<>{errors.startAt?.message}</>}
                />
              </RowItem>
              <RowItem label={'End At'}>
                <TextField
                  size="small"
                  variant="outlined"
                  type="datetime-local"
                  // value={currentEvent?.endAt}
                  {...register('endAt')}
                  error={!!errors.endAt}
                  helperText={<>{errors.endAt?.message}</>}
                />
              </RowItem>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Save</Button>
          </DialogActions>
        </FormWrapper>
      </Dialog>
    </>
  );
};

export default EditDoctorTimeSlotCalendar;
