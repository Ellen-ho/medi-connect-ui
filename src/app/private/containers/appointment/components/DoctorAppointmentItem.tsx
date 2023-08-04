import React from 'react';
import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IDoctorConsultAppointmentDatas } from '../../../../../services/ConsultationService';
import { dateFormatter } from '../../../../../utils/dateFormatter';

interface DoctorAppointmentItemProps {
  item: IDoctorConsultAppointmentDatas;
  onOpenDetail: (item: IDoctorConsultAppointmentDatas) => void;
}

const DoctorAppointmentItem: React.FC<DoctorAppointmentItemProps> = ({
  item,
  onOpenDetail,
}) => {
  return (
    <>
      <ListItemButton onClick={() => onOpenDetail(item)}>
        <ListItemAvatar>
          <Avatar>
            <CalendarMonthIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`Patient: ${item.patient.firstName} ${item.patient.lastName}`}
          secondary={`Datetime: ${dateFormatter(
            item.doctorTimeSlot.startAt.toString(),
          )} ~ ${dateFormatter(item.doctorTimeSlot.endAt.toString())}`}
        />
      </ListItemButton>
      <Divider />
    </>
  );
};

export default DoctorAppointmentItem;
