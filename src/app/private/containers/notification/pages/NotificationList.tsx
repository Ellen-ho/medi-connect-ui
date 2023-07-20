import { Avatar, Button, Card, CardContent, Divider, List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import PrimaryPageTop from "../../../../layout/PrimaryPageTop";
import PrimaryPageContent from "../../../../layout/PrimaryPageContent";
import { CommonWrapper } from "../../../../layout/CommonWrapper.styled";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { dateFormatter } from "../../../../../utils/dateFormatter";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { getNotificationList } from "../../../../../services/NotificationService";
import React from "react";

const NotificationList: React.FC = () => {
  const navigate = useNavigate();
  const { data, error } = useSWR('getNotifications', () =>
    getNotificationList({
      query: {
        limit: 10,
        page: 1,
      },
    }),
  );

  const handleClickReadNotification = () => {
    navigate('/notification/read-all');
  };

  const handleClickNotification = (notificationId: string) => {
    navigate(`/notification/${notificationId}`);
  };

  return (
    <>
      <PrimaryPageContent>
        <CommonWrapper>
          <Card>
            <CardContent>
             <List
  sx={{
    width: '100%',
    bgcolor: 'background.paper',
  }}
>
  {data?.data ? (
    data?.data.map((notification) => (
      <>
        <ListItemButton
        key={notification.id}
          onClick={() => handleClickNotification(notification.id)}
        >
          <ListItemAvatar>
            <Avatar>
              <CircleNotificationsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={notification.content}
            // secondary={`Created at ${dateFormatter(notification.createdAt)}`}
          />
        </ListItemButton>
        <Divider />
      </>
    ))
  ) : (
    <p>No notification</p>
  )}
</List>
            </CardContent>
          </Card>
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default NotificationList;