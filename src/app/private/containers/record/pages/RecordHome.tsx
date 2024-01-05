import { Button } from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useContext, useEffect, useState } from 'react';
import RecordEntrance from '../components/RecordEntrance';
import { recordCategories } from '../types/Record.type';
import { RecordHomeWrapper } from './RecordHome.styled';
import { getRecord, getRecords } from '../../../../../services/RecordService';
import { AuthContext } from '../../../../../context/AuthContext';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';

const RecordHome: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');

  const handleNewQuestion = () => {
    navigate('/record/new');
  };

  return (
    <>
      <PrimaryPageContent>
        <CommonWrapper>
          <PrimaryPageTop pageTitle="Records" />
          {recordCategories.map((category) => (
            <RecordEntrance
              key={category.urlPath}
              title={category.name}
              subtitle={category.subtitle}
              onClick={() =>
                navigate({
                  pathname: `/record/${category.urlPath}`,
                  search: isDoctor ? `?targetPatientId=${targetPatientId}` : '',
                })
              }
            />
          ))}
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default RecordHome;
