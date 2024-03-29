import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../../../../context/AuthContext';
import BasicCard from '../../../../../components/card/BasicCard';
import { Box, Button, Typography } from '@mui/material';
import timeSlotUrl from '/src/assets/time_slot.png';

const PresentTimeSlot: React.FC = () => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleViewTimeSlot = () => {
    navigate('/appointment/time-slot');
  };

  return (
    <BasicCard>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'stretch',
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <img src={timeSlotUrl} alt="" width="60" height="60" />
        </Box>
        <Box sx={{ flex: 9 }}>
          <Typography variant="body1" sx={{ mb: '.3rem' }}>
            Build Your Time Slot!
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
        <Button size="small" onClick={handleViewTimeSlot}>
          View More
        </Button>
      </Box>
    </BasicCard>
  );
};

export default PresentTimeSlot;
