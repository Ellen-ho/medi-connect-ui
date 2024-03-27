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
import { dateFormatter } from '../../../../../utils/dateFormatter';
import { getUnitForField } from '../helpers/getRecordCategory';

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
      <PrimaryPageContent>
        <CommonWrapper>
          <SecondaryPageTop />
          <BasicCard title={'Record Detail'}>
            {data?.data &&
              Object.entries(data.data).map(([key, value]) => {
                const dateRelatedFields = [
                  'createdAt',
                  'Date',
                  'foodTime',
                  'sleepTime',
                  'wakeUpTime',
                ];
                const isDateRelatedField = dateRelatedFields.some((field) =>
                  key.includes(field),
                );
                const unit =
                  typeId !== undefined
                    ? getUnitForField(typeId, key)
                    : undefined;
                console.log(unit);
                if (key === 'id' || key === 'updatedAt') {
                  return null;
                }
                return (
                  <RowItem label={camelToTitleCase(key)} key={key}>
                    {isDateRelatedField
                      ? dateFormatter(value)
                      : `${value}${unit ? unit : ''}`}
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
