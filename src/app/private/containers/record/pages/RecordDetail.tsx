import { useParams, useSearchParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useContext } from 'react';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { getRecord } from '../../../../../services/RecordService';
import { AuthContext } from '../../../../../context/AuthContext';
import useSWR from 'swr';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import BasicCard from '../../../../../components/card/BasicCard';
import RowItem from '../../../../../components/form/RowItem';
import { camelToTitleCase } from '../../../../../utils/camelToTitleCase';
import ClearIcon from '@mui/icons-material/Clear';
import { dateFormatter } from '../../../../../utils/dateFormatter';

const RecordDetail: React.FC = () => {
  const { state } = useContext(AuthContext);
  const { typeId, recordId } = useParams();
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');

  const { data, error } = useSWR('getRecord', () =>
    getRecord({
      urlPath: typeId as string,
      recordId: recordId as string,
      query: {
        targetPatientId: (targetPatientId || state.patientId) as string,
      },
    }),
  );

  return (
    <>
      <SecondaryPageTop />
      <PrimaryPageContent>
        <CommonWrapper>
          <BasicCard title={'Record Detail'}>
            {data?.data &&
              Object.entries(data.data).map(([key, value]) => {
                const dateRelatedFields = [
                  'createdAt',
                  'updatedAt',
                  'Date',
                  'foodTime',
                  'sleepTime',
                  'wakeUpTime',
                ];
                const isDateRelatedField = dateRelatedFields.some((field) =>
                  key.includes(field),
                );
                return (
                  <RowItem label={camelToTitleCase(key)}>
                    {isDateRelatedField ? dateFormatter(value) : value}
                  </RowItem>
                );
              })}
          </BasicCard>
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default RecordDetail;
