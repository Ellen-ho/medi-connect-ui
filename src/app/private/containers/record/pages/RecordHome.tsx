import { Button } from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useEffect, useState } from 'react';
import RecordEntrance from '../components/RecordEntrance';
import { recordCategories } from '../types/Record.type';
import { RecordHomeWrapper } from './RecordHome.styled';

const RecordHome: React.FC = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const handleNewQuestion = () => {
    navigate('/record/new');
  };

  useEffect(() => {
    const fetchData = async () => {
      // const { data, pagination } = await getQuestions({
      //   query: {
      //     page: 1,
      //     limit: 10,
      //   },
      // });
      // setQuestions(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <PrimaryPageTop pageTitle="Records" />
      <PrimaryPageContent>
        <RecordHomeWrapper>
          {recordCategories.map((category) => (
            <RecordEntrance
              key={category.urlPath}
              title={category.name}
              subtitle={category.subtitle}
              onClick={() => navigate(`/record/${category.urlPath}`)}
            />
          ))}
        </RecordHomeWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default RecordHome;
