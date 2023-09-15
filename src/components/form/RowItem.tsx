import { Box, Divider, SxProps, Theme } from '@mui/material';

interface IRowItemProps {
  label: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}
const RowItem: React.FC<IRowItemProps> = ({ label, children, sx = {} }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row', // breakpoint: 600px
          },
          justifyContent: {
            xs: 'flex-start',
            sm: 'space-between',
          },
          alignItems: {
            xs: 'stretch',
            sm: 'center',
          },
          minHeight: '3rem',
          padding: '.5rem 0',
          ...sx,
        }}
      >
        <Box
          color="text.primary"
          sx={{
            mb: {
              xs: '.5rem',
              sm: 0,
            },
          }}
        >
          {label}
        </Box>
        <Box
          color="text.secondary"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '.5rem',
            flexBasis: '45%',
          }}
        >
          {children}
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default RowItem;
