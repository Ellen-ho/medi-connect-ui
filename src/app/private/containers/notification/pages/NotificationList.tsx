import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import useSWR from 'swr';
import {
  deleteAllNotifications,
  getNotificationDetails,
  getNotificationList,
  readAllNotifications,
} from '../../../../../services/NotificationService';
import React, { useContext } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import NoDataFound from '../../../../../components/signs/NoDataFound';
import { NotificationContext } from '../../../../../context/NotificationContext';
import NotificationIcons from '../components/NotificationIcons';
import { useNavigate } from 'react-router-dom';
import { NotificationType } from '../../../../../types/Notifications';

const NotificationList: React.FC = () => {
  const { state, dispatch } = useContext(NotificationContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const navigate = useNavigate();
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElNav(null);
  };
  const { data, mutate } = useSWR('getNotifications', () =>
    getNotificationList({
      query: {
        limit: 10,
        page: 1,
      },
    }),
  );

  const resetUnreadNotification = () => {
    dispatch({
      type: 'UPDATE_NOTIFICATION',
      payload: {
        hasUnread: false,
      },
    });
  };

  const handleReadAll = async () => {
    handleCloseMenu();
    await readAllNotifications();
    mutate();

    resetUnreadNotification();
  };

  const handleDeleteAll = async () => {
    handleCloseMenu();
    await deleteAllNotifications();
    mutate();

    resetUnreadNotification();
  };

  const handleClickNotification = async (
    notificationId: string,
    notificationType: NotificationType,
    referenceId: string | null,
  ) => {
    if (!referenceId) {
      return;
    }
    await getNotificationDetails({ notificationId });
    mutate();
    switch (notificationType) {
      case NotificationType.UPCOMING_APPOINTMENT:
      case NotificationType.CANCEL_APPOINTMENT:
      case NotificationType.CREATE_APPOINTMENT:
      case NotificationType.CANCEL_OVERTIME_PENDING_GOAL:
        navigate(`/appointment/${referenceId}`);
        break;
      case NotificationType.HEALTH_GOAL_NOTIFICATION:
        navigate(`/health-goal/${referenceId}`);
        break;
      case NotificationType.GET_ANSWER_NOTIFICATION:
        navigate(`/question/${referenceId}`);
        break;
      case NotificationType.THANK_YOU_NOTIFICATION:
      case NotificationType.AGREED_NOTIFICATION:
        // navigate(`/question/${referenceId}`);
        alert('Not implemented');
        break;
    }
  };

  return (
    <>
      <PrimaryPageTop pageTitle={'Notification'} />
      <PrimaryPageContent>
        <CommonWrapper>
          <Card>
            <CardContent>
              <Box textAlign={'right'}>
                <IconButton onClick={handleOpenMenu}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleReadAll}>
                    <Typography textAlign="center">Read All</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleDeleteAll}>
                    <Typography textAlign="center">Delete All</Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                }}
              >
                {data?.data && data?.data.length > 0 ? (
                  data?.data.map((notification) => (
                    <>
                      <ListItemButton
                        key={notification.id}
                        onClick={() =>
                          handleClickNotification(
                            notification.id,
                            notification.notificationType,
                            notification.referenceId,
                          )
                        }
                        sx={{
                          backgroundColor: notification.isRead
                            ? '#fff'
                            : '#e0f5ff',
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <NotificationIcons
                              notificationType={notification.notificationType}
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={notification.title}
                          secondary={`${dateFormatter(
                            notification.createdAt.toString(),
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
            </CardContent>
          </Card>
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default NotificationList;
