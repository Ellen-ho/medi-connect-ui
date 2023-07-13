import { Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { FromWrapper } from '../../../../../components/form/Index.styled';
import { IRecordCategory } from '../types/Record.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ExerciseType, IntensityType } from '../../../../../services/RecordService';

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
  <FromWrapper onSubmit={handleSubmit(onCreateQuestion)}>
    {categoryMeta.fields.map((field) => (
      <FormControl key={field.id}>
        {field.type === 'select' ? (
          <>
            <InputLabel>{field.name}</InputLabel>
            <Select
              {...register(field.id)}
              error={!!errors[field.id]}
              defaultValue=""
            >
              <MenuItem value="">
                <em>{`Select ${field.name}`}</em>
              </MenuItem>
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label.replace(/_/g, ' ')
                    .toLowerCase()
                    .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                </MenuItem>
              ))}
            </Select>
          </>
        ) : (
          <TextField
            key={field.id}
            label={field.name}
            placeholder={field.placeholder}
            type={field.type}
            size="small"
            InputLabelProps={{ shrink: true }}
            {...register(field.id)}
            error={!!errors[field.id]}
            helperText={<>{errors[field.id]?.message}</>}
          />
        )}
      </FormControl>
    ))}
    <Button type="submit" variant="contained" color="primary">
      Save
    </Button>
  </FromWrapper>
);
};

export default CreateRecordForm;
