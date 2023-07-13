import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CreateRecordWrapper } from './CreateRecord.styled';
import { Card, CardContent, Typography } from '@mui/material';
import CreateRecordForm from '../components/CreateRecordForm';
import { getRecordCategory } from '../helpers/getRecordCategory';
import { useParams } from 'react-router-dom';

const CreateRecord: React.FC = () => {
  const { typeId } = useParams();
  const currentCategory = getRecordCategory(typeId as string);

  return (
    <>
      <SecondaryPageTop />
      <PrimaryPageContent>
        <CreateRecordWrapper>
          <Card>
            <CardContent>
              {currentCategory ? (
                <>
                  <Typography gutterBottom variant="h5" component="div">
                    Create {currentCategory.name} Record
                  </Typography>
                  <CreateRecordForm categoryMeta={currentCategory} />
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
            </CardContent>
          </Card>
        </CreateRecordWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default CreateRecord;
