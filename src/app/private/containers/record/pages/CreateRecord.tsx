import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CreateRecordWrapper } from './CreateRecord.styled';
import {
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { IRecordCategory, recordCategories } from '../types/Record.type';
import { useState } from 'react';
import CreateRecordForm from '../components/CreateRecordForm';
import { FromWrapper } from '../../../../../components/form/Index.styled';
import { getRecordCategory } from '../helpers/getRecordCategory';
import { useParams } from 'react-router-dom';

const CreateRecord: React.FC = () => {
  const { typeId } = useParams();
  const currentCategory = getRecordCategory(typeId as string);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<ICreateQuestionFormInputs>({
  //   resolver: yupResolver(schema),
  // });

  // const onCreateQuestion = async (data: ICreateQuestionFormInputs) => {
  //   const payload = {
  //     content: data.content,
  //     medicalSpecialty: data.medicalSpecialty,
  //   };

  //   await createQuestion(payload);

  //   navigate('/question');
  // };

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
