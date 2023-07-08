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

const CreateRecord: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<IRecordCategory>();

  const handleCategoryChange = (urlPath: string) => {
    const categoryMeta = getRecordCategory(urlPath);
    setSelectedCategory(categoryMeta);
  };

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
              <FromWrapper>
                <TextField
                  select
                  label="Select"
                  size="small"
                  helperText="Select Category"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCategoryChange(e.target.value)
                  }
                >
                  <MenuItem value="" selected>
                    Select Category
                  </MenuItem>
                  {recordCategories.map((category) => (
                    <MenuItem key={category.urlPath} value={category.urlPath}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FromWrapper>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              {selectedCategory ? (
                <>
                  <Typography gutterBottom variant="h5" component="div">
                    Create {selectedCategory.name} Record
                  </Typography>
                  <CreateRecordForm categoryMeta={selectedCategory} />
                </>
              ) : (
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ textAlign: 'center' }}
                >
                  No category selected
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
