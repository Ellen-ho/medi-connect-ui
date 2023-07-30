import { Box, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface IGoalCompareItemProps {
  label: string;
  leftItem?: string | number | React.ReactNode;
  rightItem?: string | number | React.ReactNode;
  isHeader?: boolean;
}
const GoalCompareItem: React.FC<IGoalCompareItemProps> = ({
  label,
  leftItem = '--',
  rightItem = '--',
  isHeader = false,
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '3rem',
          padding: '.5rem 0',
        }}
      >
        <Box color="text.primary" sx={{ width: '20%', textAlign: 'right' }}>
          {label}
        </Box>
        <Box
          color="#c62828"
          sx={{
            width: '30%',
            textAlign: 'center',
            fontSize: isHeader ? '1rem' : '1.5rem',
          }}
        >
          {leftItem}
        </Box>
        <Box color="text.secondary" sx={{ width: '10%' }}>
          {' '}
          <ArrowForwardIcon sx={{ display: isHeader ? 'none' : 'flex' }} />{' '}
        </Box>
        <Box
          color="#2e7d32"
          sx={{
            width: '30%',
            textAlign: 'center',
            fontSize: isHeader ? '1rem' : '1.5rem',
          }}
        >
          {rightItem}
        </Box>
      </Box>
      <Divider></Divider>
    </>
  );
};

export default GoalCompareItem;
