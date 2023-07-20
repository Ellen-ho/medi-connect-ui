import { Box } from '@mui/material';

interface IEditableRowItemProps {
  label: string;
  children?: React.ReactNode;
}
const RowItem: React.FC<IEditableRowItemProps> = ({ label, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '3rem',
        padding: '.5rem 0',
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
  );
};

export default RowItem;