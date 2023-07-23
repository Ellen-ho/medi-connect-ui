import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { createAnswer } from '../../../../../services/QuestionService';
import { Box, Button, TextField, Typography } from '@mui/material';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import { AuthContext } from '../../../../../context/AuthContext';
import { useContext } from 'react';

interface ICreateAnswerFormInputs {
  content: string;
}

interface ICreateAnswerProps {
  questionId: string;
  onCreateCallback: () => void;
}

const schema = yup
  .object({
    content: yup.string().max(250).required(),
  })
  .required();

const CreateAnswer: React.FC<ICreateAnswerProps> = ({
  questionId,
  onCreateCallback,
}) => {
  const { state } = useContext(AuthContext);
  const doctorName = `Dr. ${state.currentUser?.displayName}`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateAnswerFormInputs>({
    resolver: yupResolver(schema),
  });

  const handleCreateAnswer = async (data: ICreateAnswerFormInputs) => {
    await createAnswer({
      content: data.content,
      patientQuestionId: questionId,
    });
    toast.success('Answer created successfully!');
    onCreateCallback();
  };

  return (
    <Box>
      <Typography
        variant="subtitle1"
        color={'text.primary'}
        marginBottom={'.5rem'}
      >
        Hi {doctorName}, want to help on this question?
      </Typography>
      <FormWrapper onSubmit={handleSubmit(handleCreateAnswer)}>
        <TextField
          label="Enter your anwser"
          multiline
          rows={4}
          variant="filled"
          {...register('content')}
          placeholder="Enter your answer less than 250 characters"
          error={!!errors.content}
          helperText={<>{errors.content?.message}</>}
        />

        <Button type="submit" variant="contained" color="primary">
          Post Answer
        </Button>
      </FormWrapper>
    </Box>
  );
};

export default CreateAnswer;
