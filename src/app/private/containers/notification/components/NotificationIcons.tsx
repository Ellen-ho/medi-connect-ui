import { NotificationType } from '../../../../../types/Notifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import CancelIcon from '@mui/icons-material/Cancel';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';

interface INotificationIconsProps {
  notificationType: NotificationType;
}

const NotificationIcons: React.FC<INotificationIconsProps> = ({
  notificationType,
}) => {
  const getCorrespondingIcon = (key: NotificationType) => {
    switch (key) {
      case NotificationType.UPCOMING_APPOINTMENT:
      case NotificationType.CANCEL_APPOINTMENT:
      case NotificationType.CREATE_APPOINTMENT:
        return <CalendarMonthIcon />;
      case NotificationType.HEALTH_GOAL_NOTIFICATION:
        return <SportsScoreIcon />;
      case NotificationType.CANCEL_OVERTIME_PENDING_GOAL:
        return <CancelIcon />;
      case NotificationType.GET_ANSWER_NOTIFICATION:
        return <QuestionAnswerIcon />;
      case NotificationType.THANK_YOU_NOTIFICATION:
        return <VolunteerActivismIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return <>{getCorrespondingIcon(notificationType)}</>;
};

export default NotificationIcons;
