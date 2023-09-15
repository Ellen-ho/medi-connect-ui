import { Button, MenuItem, FormControl, TextField } from '@mui/material';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import { IRecordCategory } from '../types/Record.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toSentenceCaseFormat } from '../../../../../utils/sentenceCaseFormat';
import {
  FoodCategoryType,
  Language,
  foodKcaloriesPerUnitList,
} from '../../../../../services/RecordService';

interface ICreateRecordFormProps {
  categoryMeta: IRecordCategory;
}

const CreateRecordForm: React.FC<ICreateRecordFormProps> = ({
  categoryMeta,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categoryMeta.formSchema),
  });

  const onCreateQuestion = async (data: unknown) => {
    const payload = data;
    const createRecordService = categoryMeta.createRecordService();
    await createRecordService(payload);

    navigate(`/record/${categoryMeta.urlPath}`);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onCreateQuestion)}>
      {categoryMeta.fields.map((field) => (
        <FormControl key={field.id}>
          {field.type === 'select' ? (
            <TextField
              select
              label={`Select ${field.name}`}
              size="small"
              placeholder={field.placeholder}
              InputLabelProps={{ shrink: true }}
              {...register(field.id)}
              error={!!errors[field.id]}
              helperText={<>{errors[field.id]?.message}</>}
            >
              <MenuItem value="">Select {field.name}</MenuItem>
              {field.options?.map((option) => {
                let exampleText = '';
                if (categoryMeta.name === 'Food') {
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
              size="small"
              InputLabelProps={{ shrink: true }}
              {...register(field.id)}
              error={!!errors[field.id]}
              helperText={<>{errors[field.id]?.message}</>}
              inputProps={{
                step: '0.01',
              }}
            />
          )}
          {/* {field.example && <p>Example: {field.example}</p>} */}
        </FormControl>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </FormWrapper>
  );
};

export default CreateRecordForm;
