import { useParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useContext } from 'react';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { getRecord } from '../../../../../services/RecordService';
import { AuthContext } from '../../../../../context/AuthContext';
import useSWR from 'swr';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import BasicCard from '../../../../../components/card/BasicCard';
import RowItem from '../../../../../components/form/RowItem';

const RecordDetail: React.FC = () => {
  const { state } = useContext(AuthContext);
  const { typeId, recordId } = useParams();

  // const navigate = useNavigate();

  const { data, error } = useSWR('getRecord', () =>
    getRecord({
      urlPath: typeId as string,
      recordId: recordId as string,
      query: {
        targetPatientId: state.patientId as string,
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
              Object.entries(data.data).map(([key, value]) => (
                <RowItem label={key}>{value}</RowItem>
              ))}
          </BasicCard>
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default RecordDetail;
