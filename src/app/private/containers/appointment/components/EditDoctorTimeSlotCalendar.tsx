import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventSourceInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { EventImpl } from '@fullcalendar/core/internal';
import { IDoctorTimeSlot } from '../../../../../services/ConsultationService';
import RowItem from '../../../../../components/form/RowItem';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import * as dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';

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
  eventCancelCallback: (eventId: string) => void;
}

const EditDoctorTimeSlotCalendar: React.FC<
  IEditDoctorTimeSlotCalendarProps
> = ({
  events = [],
  eventEditCallback,
  eventCreateCallback,
  eventCancelCallback,
}) => {
  const fullCalendarEvents: EventSourceInput = getCalendarEventFormat(events);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
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

  const handleEditDialogSave = async (data: IEditDoctorTimeSlotInputs) => {
    if (isCreateEvent(currentEvent.id)) {
      await eventCreateCallback(
        dayjs(data.startAt).toISOString(),
        dayjs(data.endAt).toISOString(),
      );
    } else {
      await eventEditCallback(
        currentEvent.id as string,
        data.startAt,
        data.endAt,
      );
    }
    handleEditDialogClose();
  };

  const handleCancel = async () => {
    await eventCancelCallback(currentEvent.id);
    handleEditDialogClose();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
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
   * TODO: fix the validation
   * - any slot must me 30 minutes
   * - utc time zone conert
   * - refresh when any changes happen
   * - fetch data based on the calendar display date range
   */

  return (
    <>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        editable={true}
        initialView="dayGridMonth"
        timeZone="local"
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
          <DialogTitle
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <>{isCreateEvent(currentEvent.id) ? 'Create' : 'Edit'} Time Slot</>
            {!isCreateEvent(currentEvent.id) && (
              <Tooltip title={'Delete'}>
                <IconButton color="error" onClick={handleCancel}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
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
            <Button
              type="submit"
              disabled={!isCreateEvent(currentEvent.id) && !isDirty}
            >
              Save
            </Button>
          </DialogActions>
        </FormWrapper>
      </Dialog>
    </>
  );
};

export default EditDoctorTimeSlotCalendar;
