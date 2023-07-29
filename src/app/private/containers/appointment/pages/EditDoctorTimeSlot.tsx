import { useContext } from 'react';
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
import { Alert } from '@mui/material';

const getValidDateRange = () => {
  // default date range can be edited 28th of the month to 28th of next month
  const today = dayjs();
  let start = today.add(1, 'month').startOf('month');
  let end = today.add(1, 'month').endOf('month');

  if (today.date() > 28) {
    start = today.add(2, 'month').startOf('month');
    end = today.add(2, 'month').endOf('month');
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
  const doctorId = state.doctorId!;

  const { validStartDate, validEndDate } = getValidDateRange();

  const handleEditTimeSlot = async (
    timeSlotId: string,
    startAt: string,
    endAt: string,
  ) => {
    await editDoctorTimeSlot({ id: timeSlotId, startAt, endAt });
    await mutate();
  };

  const handleCreateTimeSlot = async (startAt: string, endAt: string) => {
    await createDoctorTimeSlot({ startAt, endAt });
    await mutate();
  };

  const handleCancelTimeSlot = async (id: string) => {
    await cancelDoctorTimeSlot({ id });
    await mutate();
  };

  const { data, mutate } = useSWR('getDoctorTimeSlots', () => {
    const query = {
      startTime: dayjs(validStartDate).toISOString(),
      endTime: dayjs(validEndDate).toISOString(),
    };
    return getDoctorTimeSlots({ doctorId, query });
  });

  return (
    <>
      <SecondaryPageTop />
      <PrimaryPageContent>
        <BasicCard title={'Appointment Time Slot Management'}>
          <Alert severity="info" sx={{ marginBottom: '1rem' }}>
            The valid start and end dates for scheduling appointments based on
            the current date. If today is before the 28th of the month, the
            valid start date is the 1st day of the next month, and the valid end
            date is the end of the next month. If today is after the 28th of the
            month, the valid start date is the 1st day of the next next month,
            and the valid end date is the end of the next next month.
          </Alert>
          <EditDoctorTimeSlotCalendar
            validStartDate={validStartDate}
            validEndDate={validEndDate}
            events={data?.timeSlots || []}
            eventEditCallback={handleEditTimeSlot}
            eventCreateCallback={handleCreateTimeSlot}
            eventCancelCallback={handleCancelTimeSlot}
          />
        </BasicCard>
      </PrimaryPageContent>
    </>
  );
};

export default EditDoctorTimeSlot;
