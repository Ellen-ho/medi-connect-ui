import { Button, Typography } from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useContext, useEffect, useState } from 'react';
import { getRecordCategory } from '../helpers/getRecordCategory';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { getRecords } from '../../../../../services/RecordService';
import { RecordListWrapper } from './RecordList.styled';
import RecordItem from '../components/RecordItem';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import { AuthContext } from '../../../../../context/AuthContext';

const RecordList: React.FC = () => {
  const { state } = useContext(AuthContext);
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
          targetPatientId: state.patientId as string,
          page: 0,
          limit: 100,
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
              {records && records.length > 0 ? (
                records.map((record: unknown) => (
                  <RecordItem record={record} recordCategory={recordCategory} />
                ))
              ) : (
                <NoDataFound />
              )}
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
