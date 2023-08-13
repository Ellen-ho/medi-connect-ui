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
  Pagination,
  Tooltip,
  Typography,
} from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import useSWR from 'swr';
import {
  deleteAllNotifications,
  deleteNotification,
  getNotificationDetails,
  getNotificationList,
  readAllNotifications,
} from '../../../../../services/NotificationService';
import React, { useContext, useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import NoDataFound from '../../../../../components/signs/NoDataFound';
import { NotificationContext } from '../../../../../context/NotificationContext';
import NotificationIcons from '../components/NotificationIcons';
import { useNavigate } from 'react-router-dom';
import { NotificationType } from '../../../../../types/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';

const NotificationList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
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
  const { data, mutate } = useSWR(`getNotifications?q=${page}`, () =>
    getNotificationList({
      query: {
        limit: 10,
        page: page,
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

  const handleDeleteNotification = async (notificationId: string) => {
    await deleteNotification({ notificationId });
    await mutate();
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
        navigate('/appointment');
        break;
      case NotificationType.HEALTH_GOAL_NOTIFICATION:
        navigate(`/health-goal/${referenceId}`);
        break;
      case NotificationType.GET_ANSWER_NOTIFICATION:
        navigate(`/question/${referenceId}`);
        break;
      case NotificationType.THANK_YOU_NOTIFICATION:
      case NotificationType.AGREED_NOTIFICATION:
      case NotificationType.APPRECIATION_BE_CANCELED_NOTIFICATION:
      case NotificationType.AGREED_BE_CANCELED_NOTIFICATION:
        navigate(`/question/answer/${referenceId}`);
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
                      <Box
                        key={notification.id}
                        display="flex"
                        alignItems="center"
                      >
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
                        <Tooltip title={'Delete'} placement="top">
                          <IconButton
                            color={'warning'}
                            onClick={() =>
                              handleDeleteNotification(notification.id)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Divider />
                      </Box>
                    </>
                  ))
                ) : (
                  <NoDataFound />
                )}
              </List>
            </CardContent>
          </Card>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Pagination
              count={data?.pagination.totalPage || 1}
              page={page}
              onChange={(event, page) => {
                setPage(page);
              }}
            />
          </div>
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default NotificationList;
