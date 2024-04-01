import { createTheme } from '@mui/material';

export const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: purple[500],
  //   },
  //   secondary: {
  //     main: green[500],
  //   },
  //   error: {
  //     main: green[500],
  //   },

  //   warning: {
  //     main: green[500],
  //   },
  //   info: {
  //     main: green[500],
  //   },
  //   success: {
  //     main: green[500],
  //   },
  // },
  typography: {
    fontFamily: '@fontsource/source-code-pro',
    allVariants: {
      color: '#314674',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '99em',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow:
            '1px 0px 0px -1px rgba(0,0,0,0.1), 1px 1px 0px 0px rgba(0,0,0,0.1), 0px 0px 0px 0px rgba(0,0,0,0.1)',
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
