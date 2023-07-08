import { TextField } from '@mui/material';
import { FromWrapper } from '../../../../../components/form/Index.styled';
import { IRecordCategory } from '../types/Record.type';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface ICreateRecordFormProps {
  categoryMeta: IRecordCategory;
}

const schema = yup
  .object({
    content: yup.string().required(),
    medicalSpecialty: yup.string().required(),
  })
  .required();

const CreateRecordForm: React.FC<ICreateRecordFormProps> = ({
  categoryMeta,
}) => {
  const navigate = useNavigate();

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<ICreateQuestionFormInputs>({
  //     resolver: yupResolver(schema),
  //   });

  //   const onCreateQuestion = async (data: ICreateQuestionFormInputs) => {
  //     const payload = {
  //       content: data.content,
  //       medicalSpecialty: data.medicalSpecialty,
  //     };

  //     await createQuestion(payload);

  //     navigate('/question');
  //   };
  return (
    <FromWrapper>
      {categoryMeta.fields.map((field) => {
        return (
          <>
            <TextField
              label={field.name}
              placeholder={field.placeholder}
              type={field.type}
              size="small"
              InputLabelProps={{ shrink: true }}
              // {...register('content')}
            />
            {/* <p>{errors.content?.message}</p> */}
          </>
        );
      })}
    </FromWrapper>
  );
};

export default CreateRecordForm;
