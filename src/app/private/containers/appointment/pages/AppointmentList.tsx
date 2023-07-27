import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import {
  cancelConsultAppointment,
  getPatientConsultAppointments,
  IPatientConsultAppointmentDatas,
} from '../../../../../services/ConsultationService';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import BasicCard from '../../../../../components/card/BasicCard';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RowItem from '../../../../../components/form/RowItem';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import ClearIcon from '@mui/icons-material/Clear';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../../context/AuthContext';

const AppointmentList: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const navigate = useNavigate();
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
    toast.success('Cancel appointment successfully');
  };

  const handleClickEditTimeSlot = () => {
    navigate('/appointment/time-slot');
  };

  const { data } = useSWR('getPatientConsultAppointments', () =>
    getPatientConsultAppointments(),
  );

  return (
    <>
      <PrimaryPageTop
        pageTitle="Appointment"
        rightElement={
          isDoctor && (
            <Button onClick={handleClickEditTimeSlot} variant="contained">
              Edit Time Slot
            </Button>
          )
        }
      />
      <PrimaryPageContent>
        <CommonWrapper>
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
                    <ListItemButton
                      onClick={() => handleOpenDetailDialog(item)}
                    >
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
                <NoDataFound />
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
                    <ListItemButton
                      onClick={() => handleOpenDetailDialog(item)}
                    >
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
                <NoDataFound />
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
                    <ListItemButton
                      onClick={() => handleOpenDetailDialog(item)}
                    >
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
                <NoDataFound />
              )}
            </List>
          </BasicCard>
        </CommonWrapper>
      </PrimaryPageContent>
      {selectedDetail !== null && (
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
              <RowItem label={'Appointment No.'}>
                {selectedDetail.appointmentId}
              </RowItem>

              <RowItem
                label={'Doctor Name'}
              >{`Dr. ${selectedDetail.doctor.firstName} ${selectedDetail.doctor.lastName}`}</RowItem>

              <RowItem label={'Datetime'}>{`${dateFormatter(
                selectedDetail.doctorTimeSlot.startAt.toString(),
              )} ~ ${dateFormatter(
                selectedDetail.doctorTimeSlot.endAt.toString(),
              )}`}</RowItem>

              <RowItem label={'Status'}>{selectedDetail.status}</RowItem>

              <RowItem label={'Meeting Link'}>
                {selectedDetail.meetingLink ? (
                  <Link href={selectedDetail.meetingLink}>
                    {selectedDetail.meetingLink}
                  </Link>
                ) : (
                  '--'
                )}
              </RowItem>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              disabled={!selectedDetail.cancelAvailability}
              onClick={() =>
                handleCancelAppointment(selectedDetail.appointmentId)
              }
            >
              Cancel This Appointment
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default AppointmentList;
