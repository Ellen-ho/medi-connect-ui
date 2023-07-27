import { Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useContext } from 'react';
import { getRecordCategory } from '../helpers/getRecordCategory';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { getRecords } from '../../../../../services/RecordService';
import { RecordListWrapper } from './RecordList.styled';
import RecordItem from '../components/RecordItem';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import { AuthContext } from '../../../../../context/AuthContext';
import useSWR from 'swr';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';

const RecordDetail: React.FC = () => {
  const { state } = useContext(AuthContext);
  const { typeId } = useParams();

  // const navigate = useNavigate();

  // const { data, error } = useSWR('getRecords', () =>
  //   getRecords({
  //     urlPath: typeId as string,
  //     query: {
  //       targetPatientId: state.patientId as string,
  //       page: 1,
  //       limit: 10,
  //     },
  //   }),
  // );

  return (
    <>
      <SecondaryPageTop />
      <PrimaryPageContent>
        <CommonWrapper>Record Details</CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default RecordDetail;
