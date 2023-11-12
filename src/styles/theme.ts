import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: '@fontsource/source-code-pro',
    allVariants: {
      color: '#314674',
    },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          boxShadow:
            '1px 0px 0px -1px rgba(0,0,0,0.2), 1px 1px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow:
            '0px 0px 0px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 0px 0px rgba(0,0,0,0.12)',
        },
      },
    },
  },
});
