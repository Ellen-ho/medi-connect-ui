import { Button } from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useContext, useState } from 'react';
import { getRecordCategory } from '../helpers/getRecordCategory';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { getRecords } from '../../../../../services/RecordService';
import { AuthContext } from '../../../../../context/AuthContext';
import useSWR from 'swr';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import RecordCalendar from '../components/RecordCalendar';
import { getCurrentMonthDateRange } from '../../../../../utils/getCurrentMonthDateRange';
import NoDataFound from '../../../../../components/signs/NoDataFound';

const RecordList: React.FC = () => {
  const { state } = useContext(AuthContext);
  const { typeId } = useParams();
  const isDoctor = state.doctorId != null;
  const recordCategory = getRecordCategory(typeId as string);
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');

  const { currentStartDate, currentEndDate } = getCurrentMonthDateRange(
    new Date(),
  );
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: currentStartDate,
    endDate: currentEndDate,
  });

  const navigate = useNavigate();

  const handleNewRecord = () => {
    navigate(`/record/${recordCategory?.urlPath}/new`);
  };

  const handleClickRecord = (recordId: string) => {
    navigate({
      pathname: `/record/${recordCategory?.urlPath}/${recordId}`,
      search: isDoctor ? `?targetPatientId=${targetPatientId}` : '',
    });
  };

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    if (startDate !== dateRange.startDate || endDate !== dateRange.endDate) {
      setDateRange({
        startDate,
        endDate,
      });
    }
  };

  const queryKey = JSON.stringify({
    targetPatientId: targetPatientId || state.patientId,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  const { data } = useSWR(
    queryKey,
    () =>
      getRecords({
        urlPath: typeId as string,
        query: {
          targetPatientId: (targetPatientId || state.patientId) as string,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
      }),
    {
      dedupingInterval: 5000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const recordData = data?.recordsData;

  return (
    <>
      <PrimaryPageContent>
        <CommonWrapper>
          <SecondaryPageTop
            onBack={() =>
              navigate({
                pathname: '/record',
                search: targetPatientId
                  ? `?targetPatientId=${targetPatientId}`
                  : '',
              })
            }
            rightElement={
              !isDoctor && (
                <Button onClick={handleNewRecord} variant="contained">
                  Add Record
                </Button>
              )
            }
          />
          {recordData ? (
            <RecordCalendar
              events={recordData}
              eventClickCallback={handleClickRecord}
              dateRangeChangeCallback={handleDateRangeChange}
            />
          ) : (
            <NoDataFound />
          )}
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default RecordList;
