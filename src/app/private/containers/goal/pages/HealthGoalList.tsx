import { useContext, useState } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { IGetHealthGoalListResponse, getHealthGoalList } from "../../../../../services/GoalService";
import PrimaryPageTop from "../../../../layout/PrimaryPageTop";
import PrimaryPageContent from "../../../../layout/PrimaryPageContent";
import { CommonWrapper } from "../../../../layout/CommonWrapper.styled";
import { IGoalList, IHealthGoalDetail } from "../../../../../types/Goals";
import { Avatar, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import BasicCard from "../../../../../components/card/BasicCard";
import { dateFormatter } from "../../../../../utils/dateFormatter";
import NoDataFound from "../../../../../components/signs/NoDataFound";
import FlagCircleIcon from '@mui/icons-material/FlagCircle';

const HealthGoalList: React.FC = () => {
  const navigate = useNavigate();
  const [detailDialogOpen, setDetailDialogOpen] = useState<boolean>(false);
  const [selectedDetail, setSelectedDetail] =
    useState<IHealthGoalDetail | null>(null);
   const [goalList, setGoalList] = useState<IGoalList | null>(null)
   

    const handleOpenDetailDialog = (detail: IHealthGoalDetail) => {
    setSelectedDetail(detail);
    setDetailDialogOpen(true);
  };

  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false);
    setSelectedDetail(null);
  };

   return (
    <>
      <PrimaryPageTop
        pageTitle="Health Goal"
         />
      <PrimaryPageContent>
        <CommonWrapper>
          <BasicCard title={'Goal'}>
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
              }}
            >
              {goalList !== null ? (
                goalList?.goalsData.map((data) => (
                  <>
                    {/* <ListItemButton
                      onClick={() => handleOpenDetailDialog(data)}
                    > */}
                      <ListItemAvatar>
                        <Avatar>
                          <FlagCircleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Goal status: ${data.status}`}
                        secondary={`Duration: ${dateFormatter(
                          data.startAt.toString(),
                        )} ~ ${dateFormatter(
                          data.endAt.toString(),
                        )}`}
                      />
                    {/* </ListItemButton>
                    <Divider /> */}
                  </>
                ))
              ) : (
                <NoDataFound />
              )}
            </List>
          </BasicCard>
          <BasicCard title={'Status'}>
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
              }}
            >
              {goalList !== null ? (
                goalList?.goalsData.map((data) => (
                  <>
                    {/* <ListItemButton
                      onClick={() => handleOpenDetailDialog(data)}
                    > */}
                      <ListItemAvatar>
                        <Avatar>
                          <FlagCircleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Status: ${data.status}`}
                      />
                    {/* </ListItemButton>
                    <Divider /> */}
                  </>
                ))
              ) : (
                <NoDataFound />
              )}
            </List>
          </BasicCard>
           </CommonWrapper>
      </PrimaryPageContent>
      {/* {selectedDetail !== null && (
        <Dialog
          open={detailDialogOpen}
          onClose={handleCloseDetailDialog}
          fullWidth={true}
          maxWidth={'md'}
        >
          <DialogTitle>{'HealthGoal Details'}
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
          ></IconButton>
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
      )} */}
    </>
  );
};

export default HealthGoalList;
