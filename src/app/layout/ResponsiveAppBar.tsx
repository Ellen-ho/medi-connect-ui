import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useSWR from 'swr';
import { getNotificationHints } from '../../services/NotificationService';
import { Badge, Chip } from '@mui/material';
import { NotificationContext } from '../../context/NotificationContext';
import { UserRoleType } from '../../types/Users';
import ImageAvatar from '../../components/avatar/ImageAvatar';
import NestedMenu from '../public/containers/home/components/NestMenu';

const topPages = [
  { title: 'Doctors', link: 'doctor', permission: [UserRoleType.PATIENT] },
  {
    title: 'Answer',
    link: '/question/answer',
    permission: [UserRoleType.DOCTOR],
  },
  {
    title: 'Question',
    link: 'question',
    permission: [UserRoleType.PATIENT, UserRoleType.DOCTOR],
  },
  {
    title: 'Appointment',
    link: 'appointment',
    permission: [UserRoleType.PATIENT, UserRoleType.DOCTOR],
  },
  {
    title: 'Timetable',
    link: 'appointment/time-slot',
    permission: [UserRoleType.DOCTOR],
  },
  { title: 'Record', link: 'record', permission: [UserRoleType.PATIENT] },
  { title: 'Goal', link: 'health-goal', permission: [UserRoleType.PATIENT] },
];

const dropMenuePages = [
  {
    title: 'Account',
    link: 'account',
    permission: [UserRoleType.PATIENT, UserRoleType.DOCTOR],
  },
  { title: 'Profile', link: 'profile', permission: [UserRoleType.PATIENT] },
  {
    title: 'Profile',
    link: 'profile/doctor',
    permission: [UserRoleType.DOCTOR],
  },
];

const ResponsiveAppBar: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const currentUserRole = state.currentUser?.role as UserRoleType;
  const avatar = state.currentUser?.avatar;
  const isLoggedIn = state.isLoggedIn;
  const { state: notificationState, dispatch: notificationDispatch } =
    useContext(NotificationContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOut = () => {
    handleCloseNavMenu();
    dispatch({
      type: 'LOG_OUT',
    });
    navigate('/');
  };

  const handlePageClick = (link: string) => {
    navigate(link);
    handleCloseNavMenu();
  };

  const handleNotificationClick = async () => {
    notificationDispatch({
      type: 'UPDATE_NOTIFICATION',
      payload: {
        hasUnread: false,
      },
    });
    navigate('/notification');
  };

  useSWR(
    isLoggedIn ? 'getNotificationHints' : null,
    () => getNotificationHints(),
    {
      onSuccess: (data) => {
        notificationDispatch({
          type: 'UPDATE_NOTIFICATION',
          payload: {
            hasUnread: data.hasUnReadNotification,
          },
        });
      },
    },
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            <HealthAndSafetyIcon
              onClick={() => navigate(isLoggedIn ? '/home' : '/')}
              sx={{
                mr: 1,
              }}
            />

            <Typography
              variant="h6"
              noWrap
              component="a"
              href={isLoggedIn ? '/home' : '/'}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Medi Connect
            </Typography>
            {currentUserRole === UserRoleType.DOCTOR && (
              <Chip
                label="Doctor"
                variant="outlined"
                size="small"
                sx={{ color: '#fff' }}
              />
            )}
          </Box>

          <Box sx={{ display: { py: 2 } }}>
            {isLoggedIn ? (
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {topPages.map((page) => {
                    if (page.permission.includes(currentUserRole)) {
                      return (
                        <Button
                          key={page.title}
                          onClick={() => handlePageClick(page.link)}
                          sx={{ color: 'white' }}
                        >
                          {page.title}
                        </Button>
                      );
                    }
                  })}
                </Box>
                <IconButton
                  sx={{ color: 'white' }}
                  onClick={handleNotificationClick}
                >
                  <Badge
                    color="warning"
                    variant="dot"
                    overlap="circular"
                    invisible={!notificationState.hasUnread}
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton sx={{ color: 'white' }} onClick={handleOpenNavMenu}>
                  <ImageAvatar
                    imageUrl={avatar}
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                    }}
                  />
                  <MenuIcon sx={{ display: { xs: 'flex', md: 'none' } }} />
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
                  onClose={handleCloseNavMenu}
                >
                  {dropMenuePages.map((page) => {
                    if (page.permission.includes(currentUserRole)) {
                      return (
                        <MenuItem
                          key={page.title}
                          onClick={() => handlePageClick(page.link)}
                        >
                          <Typography textAlign="center">
                            {page.title}
                          </Typography>
                        </MenuItem>
                      );
                    }
                  })}
                  <Box
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {topPages.map((page) => {
                      if (page.permission.includes(currentUserRole)) {
                        return (
                          <MenuItem
                            key={page.title}
                            onClick={() => handlePageClick(page.link)}
                          >
                            <Typography textAlign="center">
                              {page.title}
                            </Typography>
                          </MenuItem>
                        );
                      }
                    })}
                  </Box>
                  <MenuItem onClick={handleSignOut}>
                    <Typography textAlign="center">Sign Out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <NestedMenu />
                <Button
                  variant="outlined"
                  onClick={() => handlePageClick('/signin')}
                  sx={{ color: 'white', borderColor: 'white' }}
                >
                  Sign In
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
