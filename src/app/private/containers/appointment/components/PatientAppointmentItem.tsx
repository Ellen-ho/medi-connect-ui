import React from 'react';
import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IPatientConsultAppointmentDatas } from '../../../../../services/ConsultationService';
import { dateFormatter } from '../../../../../utils/dateFormatter';

interface PatientAppointmentItemProps {
  item: IPatientConsultAppointmentDatas;
  onOpenDetail: (item: IPatientConsultAppointmentDatas) => void;
}

const PatientAppointmentItem: React.FC<PatientAppointmentItemProps> = ({
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
          primary={`Dr. ${item.doctor.firstName} ${item.doctor.lastName}`}
          secondary={`Datetime: ${dateFormatter(
            item.doctorTimeSlot.startAt.toString(),
          )} ~ ${dateFormatter(item.doctorTimeSlot.endAt.toString())}`}
        />
      </ListItemButton>
      <Divider />
    </>
  );
};

export default PatientAppointmentItem;
