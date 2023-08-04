import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../../../context/AuthContext';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import BasicCard from '../../../../../components/card/BasicCard';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import useSWR from 'swr';
import { getAnswerDetails } from '../../../../../services/QuestionService';
import { AnswerDetailWrapper } from './AnswerDetail.styled';

const AnswerDetail: React.FC = () => {
  const { answerId } = useParams();

  const { data, mutate } = useSWR('getAnswerDetails', () =>
    getAnswerDetails({
      answerId: answerId as string,
    }),
  );

  return (
    <>
      <SecondaryPageTop />
      <PrimaryPageContent>
        <AnswerDetailWrapper>
          <BasicCard title={'Answer'}>
            {data ? (
              <>
                <Typography
                  variant="body1"
                  color={'text.secondary'}
                  marginBottom={'.5rem'}
                >
                  {data.answerContent}
                </Typography>
                <List>
                  {data.appreciationData.map((appreciation) => (
                    <div key={appreciation.createdAt.toString()}>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary={`Appreciation Content: ${appreciation.content}`}
                            secondary={`Appreciated by a ${appreciation.patientAge} years old user, Appreciation Created At: ${appreciation.createdAt}`}
                          />
                        </ListItem>
                      </List>
                    </div>
                  ))}
                </List>
                <List>
                  {data.agreementData.map((agreement) => (
                    <ListItem key={agreement.createdAt.toString()}>
                      <ListItemText
                        primary={`Agreement Comment: ${agreement.comment}`}
                        secondary={`Agreed Doctor: ${agreement.agreedDoctorFirstName} ${agreement.agreedDoctorLastName}, Agreement Created At: ${agreement.createdAt}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            ) : (
              <Typography variant="body1">Loading...</Typography>
            )}
          </BasicCard>
        </AnswerDetailWrapper>
      </PrimaryPageContent>
    </>
  );
};
export default AnswerDetail;
