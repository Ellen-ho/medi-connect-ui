import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import dayjs from 'dayjs';
import useSWR from 'swr';
import {
  cancelDoctorTimeSlot,
  createDoctorTimeSlot,
  editDoctorTimeSlot,
  getDoctorTimeSlots,
} from '../../../../../services/ConsultationService';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import BasicCard from '../../../../../components/card/BasicCard';
import EditDoctorTimeSlotCalendar from '../components/EditDoctorTimeSlotCalendar';
import { Alert, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { TimeSlotType } from '../../../../../types/Share';

const getValidDateRange = () => {
  // default date range can be edited 28th of the month to 28th of next month
  const today = dayjs();
  let start = today.add(1, 'month').startOf('month');
  let end = today.add(1, 'month').endOf('month').add(1, 'day'); // add 1 day to include the end date

  if (today.date() >= 28) {
    start = today.add(2, 'month').startOf('month');
    end = today.add(2, 'month').endOf('month').add(1, 'day'); // add 1 day to include the end date
  }

  const validStartDate = start.format('YYYY-MM-DD');
  const validEndDate = end.format('YYYY-MM-DD');

  return {
    validStartDate,
    validEndDate,
  };
};

const EditDoctorTimeSlot: React.FC = () => {
  const { state } = useContext(AuthContext);
  const [timeSlotType, setTimeSlotType] = useState(TimeSlotType.ONLINE);
  const doctorId = state.doctorId!;

  const { validStartDate, validEndDate } = getValidDateRange();

  const handleEditTimeSlot = async (
    timeSlotId: string,
    startAt: string,
    endAt: string,
    type: TimeSlotType,
  ) => {
    await editDoctorTimeSlot({ id: timeSlotId, startAt, endAt, type });
    await mutate();
  };

  const handleCreateTimeSlot = async (
    startAt: string,
    endAt: string,
    type: TimeSlotType,
  ) => {
    await createDoctorTimeSlot({ startAt, endAt, type });
    await mutate();
  };

  const handleCancelTimeSlot = async (id: string) => {
    await cancelDoctorTimeSlot({ id });
    await mutate();
  };

  const handleTimeSlotTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    value: TimeSlotType | null,
  ) => {
    if (value !== null && value !== timeSlotType) {
      setTimeSlotType(value);
    }
  };

  const { data, mutate } = useSWR(`getDoctorTimeSlots?${timeSlotType}`, () => {
    const query = {
      startTime: dayjs(validStartDate).toISOString(),
      endTime: dayjs(validEndDate).toISOString(),
      type: timeSlotType,
    };
    return getDoctorTimeSlots({ doctorId, query });
  });

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <SecondaryPageTop />
        <BasicCard title={'Appointment Time Slot Management'}>
          <Alert severity="info" sx={{ marginBottom: '1rem' }}>
            The valid start and end dates for scheduling appointments based on
            the current date. If today is before the 28th of the month, the
            valid start date is the 1st day of the next month, and the valid end
            date is the end of the next month. If today is after the 28th of the
            month, the valid start date is the 1st day of the next next month,
            and the valid end date is the end of the next next month.
          </Alert>
          <Box sx={{ display: 'flex', justifyContent: 'end', mb: '15px' }}>
            <ToggleButtonGroup
              size="small"
              color="primary"
              value={timeSlotType}
              exclusive
              onChange={handleTimeSlotTypeChange}
              sx={{
                border: '1px solid', // 为整个组添加外边框
                borderColor: 'secondary.dark',
                '& .MuiToggleButton-root': {
                  border: 'none', // 移除按钮间的边框
                  '&.Mui-selected': {
                    zIndex: 1, // 确保选中的按钮覆盖未选中的按钮边框
                    border: '1.8px solid',
                    borderColor: 'secondary.dark',
                    bgcolor: 'secondary.main',
                    color: 'white',
                    '&:hover': {
                      // 当选中的按钮被悬停时
                      bgcolor: 'secondary.light', // 改变背景颜色为更亮的色调
                      color: 'black', // 文本颜色变为黑色
                    },
                  },
                },
              }}
            >
              <ToggleButton value={TimeSlotType.ONLINE}>Online</ToggleButton>
              <ToggleButton value={TimeSlotType.CLINIC}>Clinic</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <EditDoctorTimeSlotCalendar
            type={timeSlotType}
            validStartDate={validStartDate}
            validEndDate={validEndDate}
            events={data?.timeSlots || []}
            eventEditCallback={handleEditTimeSlot}
            eventCreateCallback={handleCreateTimeSlot}
            eventCancelCallback={handleCancelTimeSlot}
          />
        </BasicCard>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default EditDoctorTimeSlot;
