import React, { useState } from 'react';
import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  List,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  IPatientConsultAppointmentDatas,
  cancelConsultAppointment,
  getPatientConsultAppointments,
} from '../../../../../services/ConsultationService';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import BasicCard from '../../../../../components/card/BasicCard';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import RowItem from '../../../../../components/form/RowItem';
import useSWR from 'swr';
import ClearIcon from '@mui/icons-material/Clear';
import toast from 'react-hot-toast';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { TimeSlotType } from '../../../../../types/Share';

interface IPatientAppointmentListProps {
  timeSlotType: TimeSlotType;
}

const PatientAppointmentList: React.FC<IPatientAppointmentListProps> = ({
  timeSlotType,
}) => {
  const [detailDialogOpen, setDetailDialogOpen] = useState<boolean>(false);
  const [selectedDetail, setSelectedDetail] =
    useState<IPatientConsultAppointmentDatas | null>(null);

  const handleOpenDetailDialog = (detail: IPatientConsultAppointmentDatas) => {
    setSelectedDetail(detail);
    setDetailDialogOpen(true);
  };

  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false);
    setSelectedDetail(null);
  };

  const handleCancelAppointment = async (consultAppointmentId: string) => {
    await cancelConsultAppointment({ consultAppointmentId });
    setDetailDialogOpen(false);
    mutate();
    toast.success('Cancel appointment successfully');
  };

  const { data, mutate } = useSWR(
    `getPatientConsultAppointmentstype=${timeSlotType}`,
    () => getPatientConsultAppointments({ query: { type: timeSlotType } }),
  );

  return (
    <>
      <BasicCard title={'Upcoming'}>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
          }}
        >
          {data?.upcomingAppointments &&
          data?.upcomingAppointments.length > 0 ? (
            data.upcomingAppointments.map((item) => (
              <>
                <ListItemButton onClick={() => handleOpenDetailDialog(item)}>
                  <ListItemAvatar>
                    <Avatar>
                      <CalendarMonthIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Dr. ${item.doctor.firstName} ${item.doctor.lastName}`}
                    secondary={`Datetime: ${dateFormatter(
                      item.doctorTimeSlot.startAt.toString(),
                    )} ~ ${dateFormatter(
                      item.doctorTimeSlot.endAt.toString(),
                    )}`}
                  />
                </ListItemButton>
                <Divider />
              </>
            ))
          ) : (
            <NoDataFound
              icon={<EventBusyIcon />}
              label="You currently have no upcoming appointments."
            ></NoDataFound>
          )}
        </List>
      </BasicCard>
      <BasicCard title={'Completed'}>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
          }}
        >
          {data?.completedAppointments &&
          data?.completedAppointments.length > 0 ? (
            data.completedAppointments.map((item) => (
              <>
                <ListItemButton onClick={() => handleOpenDetailDialog(item)}>
                  <ListItemAvatar>
                    <Avatar>
                      <CalendarMonthIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Dr. ${item.doctor.firstName} ${item.doctor.lastName}`}
                    secondary={`Datetime: ${dateFormatter(
                      item.doctorTimeSlot.startAt.toString(),
                    )} ~ ${dateFormatter(
                      item.doctorTimeSlot.endAt.toString(),
                    )}`}
                  />
                </ListItemButton>
                <Divider />
              </>
            ))
          ) : (
            <NoDataFound
              icon={<EventBusyIcon />}
              label="You currently have no completed appointments."
            ></NoDataFound>
          )}
        </List>
      </BasicCard>
      <BasicCard title={'Cancel'}>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
          }}
        >
          {data?.canceledAppointments &&
          data?.canceledAppointments.length > 0 ? (
            data.canceledAppointments.map((item) => (
              <>
                <ListItemButton onClick={() => handleOpenDetailDialog(item)}>
                  <ListItemAvatar>
                    <Avatar>
                      <CalendarMonthIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Dr. ${item.doctor.firstName} ${item.doctor.lastName}`}
                    secondary={`Datetime: ${dateFormatter(
                      item.doctorTimeSlot.startAt.toString(),
                    )} ~ ${dateFormatter(
                      item.doctorTimeSlot.endAt.toString(),
                    )}`}
                  />
                </ListItemButton>
                <Divider />
              </>
            ))
          ) : (
            <NoDataFound
              icon={<EventBusyIcon />}
              label="You currently have no canceled appointments."
            ></NoDataFound>
          )}
        </List>
      </BasicCard>
      {selectedDetail && (
        <Dialog
          open={detailDialogOpen}
          onClose={handleCloseDetailDialog}
          fullWidth={true}
          maxWidth={'md'}
        >
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>{'Appointment Details'}</Box>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseDetailDialog}
              aria-label="close"
            >
              <ClearIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              <RowItem
                label={'Doctor Name'}
              >{`Dr. ${selectedDetail.doctor.firstName} ${selectedDetail.doctor.lastName}`}</RowItem>

              <RowItem label={'Datetime'}>{`${dateFormatter(
                selectedDetail.doctorTimeSlot.startAt.toString(),
              )} ~ ${dateFormatter(
                selectedDetail.doctorTimeSlot.endAt.toString(),
              )}`}</RowItem>

              <RowItem label={'Status'}>{selectedDetail.status}</RowItem>
              {timeSlotType === 'ONLINE' && (
                <RowItem label={'Meeting Link'}>
                  {selectedDetail.meetingLink ? (
                    <Link href={selectedDetail.meetingLink}>
                      {selectedDetail.meetingLink}
                    </Link>
                  ) : (
                    '--'
                  )}
                </RowItem>
              )}
              <RowItem label={'Type'}>{timeSlotType}</RowItem>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            {selectedDetail.cancelAvailability && (
              <Button
                variant="contained"
                onClick={() =>
                  handleCancelAppointment(selectedDetail.appointmentId)
                }
              >
                Cancel This Appointment
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default PatientAppointmentList;
