import React, { useContext, useState, useCallback, useMemo } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
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

  const [currentDate, setCurrentDate] = useState(new Date());
  const { currentStartDate, currentEndDate } = useMemo(
    () => getCurrentMonthDateRange(currentDate),
    [currentDate],
  );

  const navigate = useNavigate();

  const handleNewRecord = useCallback(() => {
    navigate(`/record/${recordCategory?.urlPath}/new`);
  }, [navigate, recordCategory]);

  const handleClickRecord = useCallback(
    (recordId: string) => {
      navigate({
        pathname: `/record/${recordCategory?.urlPath}/${recordId}`,
        search: isDoctor ? `?targetPatientId=${targetPatientId}` : '',
      });
    },
    [navigate, recordCategory, isDoctor, targetPatientId],
  );

  const handleDateChange = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  const queryKey = useMemo(
    () =>
      JSON.stringify({
        targetPatientId: targetPatientId || state.patientId,
        startDate: currentStartDate,
        endDate: currentEndDate,
      }),
    [targetPatientId, state.patientId, currentStartDate, currentEndDate],
  );

  const { data, error, isValidating } = useSWR(
    queryKey,
    () =>
      getRecords({
        urlPath: typeId as string,
        query: {
          targetPatientId: (targetPatientId || state.patientId) as string,
          startDate: currentStartDate,
          endDate: currentEndDate,
        },
      }),
    {
      dedupingInterval: 5000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
    },
  );

  const recordData = data?.recordsData || [];

  return (
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
        <div
          style={{
            position: 'relative',
            minHeight: '600px',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {error ? (
            <NoDataFound />
          ) : (
            <>
              {isValidating && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.7)',
                    zIndex: 1,
                  }}
                >
                  <CircularProgress />
                </div>
              )}
              <RecordCalendar
                events={recordData}
                eventClickCallback={handleClickRecord}
                onDateChange={handleDateChange}
                currentDate={currentDate}
              />
            </>
          )}
        </div>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default RecordList;
