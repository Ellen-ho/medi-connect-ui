import { Button, MenuItem, FormControl, TextField, Box } from '@mui/material';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import { ISubCategory } from '../types/Record.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toSentenceCaseFormat } from '../../../../../utils/sentenceCaseFormat';
import {
  FoodCategoryType,
  Language,
  foodKcaloriesPerUnitList,
} from '../../../../../services/RecordService';
import { ButtonAreaWrapper } from '../../../../layout/CommonWrapper.styled';

interface ICreateRecordFormProps {
  subCategoryMeta: ISubCategory;
}

const CreateRecordForm: React.FC<ICreateRecordFormProps> = ({
  subCategoryMeta,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(subCategoryMeta.formSchema),
  });

  const onCreateQuestion = async (data: unknown) => {
    const payload = data;
    const createRecordService = subCategoryMeta.createRecordService();
    await createRecordService(payload);

    navigate(`/record/${subCategoryMeta.urlPath}`);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onCreateQuestion)}>
      {subCategoryMeta.fields.map((field) => (
        <FormControl key={field.id}>
          {field.type === 'select' ? (
            <TextField
              select
              label={`Select ${field.name}`}
              placeholder={field.placeholder}
              InputLabelProps={{ shrink: true }}
              {...register(field.id)}
              error={!!errors[field.id]}
              helperText={<>{errors[field.id]?.message}</>}
            >
              <MenuItem value="">Select {field.name}</MenuItem>
              {field.options?.map((option) => {
                let exampleText = '';
                if (subCategoryMeta.name === 'Food') {
                  const categoryType = option.value as FoodCategoryType;
                  exampleText = ` - ${
                    foodKcaloriesPerUnitList[categoryType].examples[
                      Language.EN_US
                    ]
                  }`;
                }

                return (
                  <MenuItem key={option.value} value={option.value}>
                    {toSentenceCaseFormat(option.label)}
                    {exampleText}
                  </MenuItem>
                );
              })}
            </TextField>
          ) : (
            <TextField
              label={field.name}
              placeholder={field.placeholder}
              type={field.type}
              InputLabelProps={{ shrink: true }}
              {...register(field.id)}
              error={!!errors[field.id]}
              helperText={<>{errors[field.id]?.message}</>}
              inputProps={{
                step: field.type === 'number' ? '0.01' : '0',
              }}
            />
          )}
          {/* {field.example && <p>Example: {field.example}</p>} */}
        </FormControl>
      ))}
      <ButtonAreaWrapper>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </ButtonAreaWrapper>
    </FormWrapper>
  );
};

export default CreateRecordForm;
