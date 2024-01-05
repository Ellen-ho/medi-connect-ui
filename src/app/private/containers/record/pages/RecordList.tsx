import { Button, Pagination, Typography } from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useContext, useState } from 'react';
import { getRecordCategory } from '../helpers/getRecordCategory';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { getRecords } from '../../../../../services/RecordService';
import { RecordListWrapper } from './RecordList.styled';
import RecordItem from '../components/RecordItem';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import { AuthContext } from '../../../../../context/AuthContext';
import useSWR, { mutate } from 'swr';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';

const RecordList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { state } = useContext(AuthContext);
  const { typeId } = useParams();
  const isDoctor = state.doctorId != null;
  const recordCategory = getRecordCategory(typeId as string);
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');

  const navigate = useNavigate();

  const handleNewQuestion = () => {
    navigate(`/record/${recordCategory?.urlPath}/new`);
  };

  const handleClickRecord = (recordId: string) => {
    navigate({
      pathname: `/record/${recordCategory?.urlPath}/${recordId}`,
      search: isDoctor ? `?targetPatientId=${targetPatientId}` : '',
    });
  };

  const { data, error } = useSWR(`getRecords?q=${page}`, () =>
    getRecords({
      urlPath: typeId as string,
      query: {
        targetPatientId: (targetPatientId || state.patientId) as string,
        limit: 10,
        page: page,
      },
    }),
  );

  return (
    <>
      {recordCategory ? (
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
                  <Button onClick={handleNewQuestion} variant="contained">
                    Add Record
                  </Button>
                )
              }
            />
            {data?.recordsData && data.recordsData.length > 0 ? (
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
};

export default RecordList;
