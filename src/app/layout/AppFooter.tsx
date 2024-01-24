import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        textAlign: 'center',
        backgroundColor: 'transparent',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Copyright © {currentYear} Medi Connect
      </Typography>
    </Box>
  );
}

export default AppFooter;
