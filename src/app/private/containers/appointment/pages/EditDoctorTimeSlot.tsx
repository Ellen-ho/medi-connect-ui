import { useContext } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import dayjs from 'dayjs';
import useSWR from 'swr';
import {
  editDoctorTimeSlot,
  getDoctorTimeSlots,
} from '../../../../../services/ConsultationService';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';

const EditDoctorTimeSlot: React.FC = () => {
  const { state } = useContext(AuthContext);
  const doctorId = state.doctorId!;
  // default date range can be edited 28th of the month to 28th of next month
  const startTime = dayjs().date(28).format('YYYY-MM-DD');
  const endTime = dayjs()
    .month(dayjs().month() + 1)
    .date(28)
    .format('YYYY-MM-DD');

  const handleEditTimeSlot = async (
    timeSlotId: string,
    startAt: Date,
    endAt: Date,
  ) => {
    await editDoctorTimeSlot({ id: timeSlotId, startAt, endAt });
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
      <PrimaryPageContent>{JSON.stringify(data)}</PrimaryPageContent>
    </>
  );
};

export default EditDoctorTimeSlot;
