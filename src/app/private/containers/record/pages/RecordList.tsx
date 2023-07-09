import { Button, Typography } from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useEffect, useState } from 'react';
import { getRecordCategory } from '../helpers/getRecordCategory';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { getRecords } from '../../../../../services/RecordService';
import { RecordListWrapper } from './RecordList.styled';

const RecordList: React.FC = () => {
  const { typeId } = useParams();
  const recordCategory = getRecordCategory(typeId as string);
  const [records, setRecords] = useState<unknown[]>([]);

  const navigate = useNavigate();

  const handleNewQuestion = () => {
    navigate(`/record/${recordCategory?.urlPath}/new`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { recordsData, pagination } = await getRecords({
        urlPath: typeId as string,
        query: {
          targetPatientId: '3acb3290-088a-4fe4-8e57-d112522a11b8',
          page: 1,
          limit: 10,
        },
      });
      setRecords(recordsData);
    };

    fetchData();
  }, []);

  return (
    <>
      {recordCategory ? (
        <>
          <SecondaryPageTop
            leftElement={
              <Button onClick={handleNewQuestion} variant="contained">
                Add Record
              </Button>
            }
          />
          <PrimaryPageContent>
            <RecordListWrapper>
              {/* TODO: add style and pagination */}
              {records &&
                records.map((record: unknown) => (
                  <div>{JSON.stringify(record)}</div>
                ))}
            </RecordListWrapper>
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
