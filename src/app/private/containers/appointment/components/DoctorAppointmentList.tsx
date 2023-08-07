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
  Tooltip,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  IDoctorConsultAppointmentDatas,
  getDoctorConsultAppointments,
} from '../../../../../services/ConsultationService';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import BasicCard from '../../../../../components/card/BasicCard';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import RowItem from '../../../../../components/form/RowItem';
import useSWR from 'swr';
import ClearIcon from '@mui/icons-material/Clear';
import toast from 'react-hot-toast';
import { getPatientProfile } from '../../../../../services/PatientService';
import { useNavigate } from 'react-router-dom';
import { ConsultAppointmentStatusType } from '../../../../../types/Consultations';

interface IDoctorAppointmentListProps {}

const DoctorAppointmentList: React.FC<IDoctorAppointmentListProps> = () => {
  const navigate = useNavigate();
  const [detailDialogOpen, setDetailDialogOpen] = useState<boolean>(false);
  const [selectedDetail, setSelectedDetail] =
    useState<IDoctorConsultAppointmentDatas | null>(null);

  const handleOpenDetailDialog = (detail: IDoctorConsultAppointmentDatas) => {
    setSelectedDetail(detail);
    setDetailDialogOpen(true);
  };

  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false);
    setSelectedDetail(null);
  };

  const handleViewPatientProfile = async (targetPatientId: string) => {
    navigate(`/profile/view?targetPatientId=${targetPatientId}`);
  };

  const handleViewPatientRecords = async (patientId: string) => {
    navigate(`/record?targetPatientId=${patientId}`);
  };

  const { data } = useSWR('getDoctorConsultAppointments', () =>
    getDoctorConsultAppointments(),
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
                    primary={`${item.patient.firstName} ${item.patient.lastName}`}
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
                <ListItemButton onClick={() => handleOpenDetailDialog(item)}>
                  <ListItemAvatar>
                    <Avatar>
                      <CalendarMonthIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.patient.firstName} ${item.patient.lastName}`}
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
                <ListItemButton onClick={() => handleOpenDetailDialog(item)}>
                  <ListItemAvatar>
                    <Avatar>
                      <CalendarMonthIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.patient.firstName} ${item.patient.lastName}`}
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
              <RowItem label={'Appointment No.'}>
                {selectedDetail.appointmentId}
              </RowItem>

              <RowItem
                label={'Patient Name'}
              >{`${selectedDetail.patient.firstName} ${selectedDetail.patient.lastName}`}</RowItem>

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
            {selectedDetail.status === ConsultAppointmentStatusType.UPCOMING ? (
              <Button
                variant="contained"
                onClick={() =>
                  handleViewPatientProfile(selectedDetail?.patient?.id)
                }
              >
                View Patient Profile
              </Button>
            ) : (
              <Tooltip title="Cannot view patient profile">
                <span>
                  <Button variant="contained" disabled>
                    View Patient Profile
                  </Button>
                </span>
              </Tooltip>
            )}
            {selectedDetail.status === ConsultAppointmentStatusType.UPCOMING ? (
              <Button
                variant="contained"
                onClick={() =>
                  handleViewPatientRecords(selectedDetail?.patient?.id)
                }
              >
                View Patient Records
              </Button>
            ) : (
              <Tooltip title="Cannot view patient records">
                <span>
                  <Button variant="contained" disabled>
                    View Patient Records
                  </Button>
                </span>
              </Tooltip>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default DoctorAppointmentList;
