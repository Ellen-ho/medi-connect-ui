import { Button, Pagination, Typography } from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useContext, useState } from 'react';
import { getRecordCategory } from '../helpers/getRecordCategory';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { getRecords } from '../../../../../services/RecordService';
import { AuthContext } from '../../../../../context/AuthContext';
import useSWR from 'swr';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import dayjs from 'dayjs';

const RecordList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { state } = useContext(AuthContext);
  const { typeId } = useParams();
  const isDoctor = state.doctorId != null;
  const recordCategory = getRecordCategory(typeId as string);
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');

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

  const getValidDateRange = () => {
    const today = dayjs();
    let start = today.startOf('month');
    let end = today.endOf('month').add(1, 'day');

    const validStartDate = start.format('YYYY-MM-DD');
    const validEndDate = end.format('YYYY-MM-DD');

    return {
      validStartDate,
      validEndDate,
    };
  };
  const { validStartDate, validEndDate } = getValidDateRange();

  const { data } = useSWR('getRecords', () =>
    getRecords({
      urlPath: typeId as string,
      query: {
        targetPatientId: (targetPatientId || state.patientId) as string,
        limit: 10,
        page: page,
      },
    }),
  );

  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  // 在這裡處理點擊日期的事件
  const handleDateClick = (info: any) => {
    const selectedDate = dayjs(info.date).format('YYYY-MM-DD');

    // 在 recordsData 中查找與所選日期對應的記錄
    const selectedRecord = data?.recordsData.find(() => {
      switch (recordCategory?.name) {
        case 'bloodPressure':
          return (
            dayjs(recordCategory?.formSchema.bloodPressureDate).format(
              'YYYY-MM-DD',
            ) === selectedDate
          );
        case 'bloodSugar':
          return (
            dayjs(recordCategory?.formSchema.bloodSugarDate).format(
              'YYYY-MM-DD',
            ) === selectedDate
          );
        case 'glycatedHemoglobin':
          return (
            dayjs(recordCategory?.formSchema.glycatedHemoglobinDate).format(
              'YYYY-MM-DD',
            ) === selectedDate
          );
        case 'weight':
          return (
            dayjs(recordCategory?.formSchema.weightDate).format(
              'YYYY-MM-DD',
            ) === selectedDate
          );
        default:
          return false;
      }
    });

    // 如果找到相應的記錄，則設置 selectedRecordId 為該記錄的 recordId
    if (selectedRecord) {
      setSelectedRecordId(selectedRecordId);
    }
    if (selectedRecordId !== null) {
      handleClickRecord(selectedRecordId);
    }
  };

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
          <FullCalendar
            initialDate={validStartDate}
            validRange={{
              start: validStartDate,
              end: validEndDate,
            }}
            plugins={[timeGridPlugin, dayGridPlugin]}
            editable={true}
            initialView="dayGridMonth"
            timeZone="local"
            headerToolbar={{
              left: 'prev',
              center: 'title',
              right: 'next',
            }}
            dateClick={(info) => {
              handleDateClick(info);
            }}
          />
          {/* {data?.recordsData && data.recordsData.length > 0 ? (
              data.recordsData.map((record: unknown) => (
                <RecordItem
                  record={record}
                  recordCategory={recordCategory}
                  onClick={handleClickRecord}
                />
              ))
            ) : (
              <NoDataFound />
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <Pagination
                count={data?.pagination.totalPage || 1}
                page={page}
                onChange={(event, page) => {
                  setPage(page);
                }}
              />
            </div>
          </CommonWrapper>
        </PrimaryPageContent>
      ) : (
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: 'center' }}
        >
          Invalid record category!
        </Typography>
      )}
    </>
  );
}; */}
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default RecordList;
