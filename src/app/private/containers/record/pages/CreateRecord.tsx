import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CreateRecordWrapper } from './CreateRecord.styled';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import CreateRecordForm from '../components/CreateRecordForm';
import { getRecordCategory } from '../helpers/getRecordCategory';
import { useParams } from 'react-router-dom';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';

const CreateRecord: React.FC = () => {
  const { typeId } = useParams();
  const currentCategory = getRecordCategory(typeId as string);

  return (
    <>
      <PrimaryPageContent>
        <CommonWrapper>
          <SecondaryPageTop />
          <Card>
            <CardContent>
              {currentCategory ? (
                <>
                  <Typography gutterBottom variant="h5" component="div">
                    Create {currentCategory.name} Record
                  </Typography>
                  <Divider sx={{ marginBottom: '2rem' }} />
                  <CreateRecordForm subCategoryMeta={currentCategory} />
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
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default CreateRecord;
