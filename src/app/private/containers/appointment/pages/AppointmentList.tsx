import {
  Avatar,
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
import { useEffect, useState } from 'react';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import {
  getPatientConsultAppointments,
  IGetPatientConsultAppointmentsResponse,
  IPatientConsultAppointmentDatas,
} from '../../../../../services/ConsultationService';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import BasicCard from '../../../../../components/card/BasicCard';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RowItem from '../../../../../components/form/RowItem';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import ClearIcon from '@mui/icons-material/Clear';

const AppointmentList: React.FC = () => {
  const navigate = useNavigate();
  const [detailDialogOpen, setDetailDialogOpen] = useState<boolean>(false);
  const [selectedDetail, setSelectedDetail] =
    useState<IPatientConsultAppointmentDatas | null>(null);
  const [appointments, setAppointments] =
    useState<IGetPatientConsultAppointmentsResponse>({
      upcomingAppointments: [],
      completedAppointments: [],
      canceledAppointments: [],
    });

  const handleOpenDetailDialog = (detail: IPatientConsultAppointmentDatas) => {
    setSelectedDetail(detail);
    setDetailDialogOpen(true);
  };

  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false);
    setSelectedDetail(null);
  };

  const handleClickNewAppointment = () => {
    navigate('/appointment/new');
  };

  const handleClickAppointment = (appointmentId: string) => {
    navigate(`/appointment/${appointmentId}`);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    console.log(`Cancel appointment with ID: ${appointmentId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: IGetPatientConsultAppointmentsResponse =
          await getPatientConsultAppointments();

        setAppointments(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PrimaryPageTop
        pageTitle="Appointment"
        // rightElement={
        //   <Button onClick={handleClickNewAppointment} variant="contained">
        //     Create Appointment
        //   </Button>
        // }
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
              {appointments.upcomingAppointments.length > 0 ? (
                appointments.upcomingAppointments.map((item) => (
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
              {appointments.completedAppointments.length > 0 ? (
                appointments.completedAppointments.map((item) => (
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
              {appointments.canceledAppointments.length > 0 ? (
                appointments.canceledAppointments.map((item) => (
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
          <DialogTitle>{'Appointment Details'}
            <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDetailDialog}
            aria-label="close"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
              <ClearIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <RowItem label={'Appointment No.'}>
                {selectedDetail.appointmentId}
              </RowItem>
              <Divider />
              <RowItem
                label={'Doctor Name'}
              >{`Dr. ${selectedDetail.doctor.firstName} ${selectedDetail.doctor.lastName}`}</RowItem>
              <Divider />
              <RowItem label={'Datetime'}>{`${dateFormatter(
                selectedDetail.doctorTimeSlot.startAt.toString(),
              )} ~ ${dateFormatter(
                selectedDetail.doctorTimeSlot.endAt.toString(),
              )}`}</RowItem>
              <Divider />
              <RowItem label={'Status'}>{selectedDetail.status}</RowItem>
              <Divider />
              <RowItem label={'Meeting Link'}>
                {selectedDetail.meetingLink ? (
                  <Link href={selectedDetail.meetingLink}>
                    {selectedDetail.meetingLink}
                  </Link>
                ) : (
                  '--'
                )}
              </RowItem>
              <Divider />
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
