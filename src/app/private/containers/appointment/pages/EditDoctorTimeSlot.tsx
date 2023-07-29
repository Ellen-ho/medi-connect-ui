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

const EditDoctorTimeSlot: React.FC = () => {
  const { state } = useContext(AuthContext);
  const doctorId = state.doctorId!;
  // default date range can be edited 28th of the month to 28th of next month
  const startTime = dayjs().date(28).format('YYYY-MM-DD');
  const endTime = dayjs()
    .month(dayjs().month() + 3)
    .date(28)
    .format('YYYY-MM-DD');

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
      startTime,
      endTime,
    };
    return getDoctorTimeSlots({ doctorId, query });
  });

  return (
    <>
      <SecondaryPageTop />
      <PrimaryPageContent>
        <BasicCard title={'Appointment Time Slot Management'}>
          <EditDoctorTimeSlotCalendar
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
