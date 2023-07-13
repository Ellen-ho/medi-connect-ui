import React, { useContext } from 'react';
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
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { AuthContext } from '../../context/AuthContext';

const topPages = [
  { title: 'Doctors', link: 'doctors' },
  { title: 'Question', link: 'question' },
  { title: 'Appointment', link: 'appointment' },
  { title: 'Record', link: 'record' },
];

const dropMenuePages = [
  { title: 'Account', link: 'account' },
  { title: 'Profile', link: 'profile' },
];

const ResponsiveAppBar: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOut = () => {
    dispatch({
      type: 'LOG_OUT',
    });
    navigate('/signin');
  };

  const handlePageClick = (link: string) => {
    navigate(link);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HealthAndSafetyIcon
              onClick={() => navigate('/')}
              sx={{
                mr: 1,
              }}
            />

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MEDI CONNECT
            </Typography>
          </Box>

          <Box sx={{ display: { py: 2 } }}>
            {state.isLoggedIn ? (
              <>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {topPages.map((page) => (
                    <Button
                      key={page.title}
                      onClick={() => handlePageClick(page.link)}
                      sx={{ color: 'white', display: 'block' }}
                    >
                      {page.title}
                    </Button>
                  ))}
                  <IconButton
                    sx={{ color: 'white' }}
                    onClick={handleOpenNavMenu}
                  >
                    <AccountCircleRoundedIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
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
                  {dropMenuePages.map((page) => (
                    <MenuItem
                      key={page.title}
                      onClick={() => handlePageClick(page.link)}
                    >
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  ))}
                  <Box
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {topPages.map((page) => (
                      <MenuItem
                        key={page.title}
                        onClick={() => handlePageClick(page.link)}
                      >
                        <Typography textAlign="center">{page.title}</Typography>
                      </MenuItem>
                    ))}
                    <MenuItem onClick={handleSignOut}>
                      <Typography textAlign="center">Sign Out</Typography>
                    </MenuItem>
                  </Box>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={() => handlePageClick('/signin')}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
