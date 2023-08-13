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
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: '3rem',
          padding: '.5rem 0',
          ...sx,
        }}
      >
        <Box color="text.primary">{label}</Box>
        <Box
          color="text.secondary"
          sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}
        >
          {children}
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default RowItem;
