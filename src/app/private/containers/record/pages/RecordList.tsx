import { Button, Pagination, Typography } from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useContext } from 'react';
import { getRecordCategory } from '../helpers/getRecordCategory';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { getRecords } from '../../../../../services/RecordService';
import { RecordListWrapper } from './RecordList.styled';
import RecordItem from '../components/RecordItem';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import { AuthContext } from '../../../../../context/AuthContext';
import useSWR, { mutate } from 'swr';

const RecordList: React.FC = () => {
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

  const { data, error } = useSWR('getRecords', () =>
    getRecords({
      urlPath: typeId as string,
      query: {
        targetPatientId: (targetPatientId || state.patientId) as string,
        page: 1,
        limit: 10,
      },
    }),
  );

  return (
    <>
      {recordCategory ? (
        <>
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
          <PrimaryPageContent>
            <RecordListWrapper>
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
            </RecordListWrapper>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <Pagination
                count={data?.pagination.totalPage || 1}
                page={data?.pagination.currentPage || 1}
                onChange={(event, page) => {
                  const newPage = page;
                  mutate('getRecords', async () => {
                    const newData = await getRecords({
                      urlPath: typeId as string,
                      query: {
                        targetPatientId: (targetPatientId ||
                          state.patientId) as string,
                        page: newPage,
                        limit: 10,
                      },
                    });
                    return newData;
                  });
                }}
              />
            </div>
          </PrimaryPageContent>
        </>
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
