import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { createQuestion } from '../../../../../services/QuestionService';
import { MedicalSpecialtyType } from '../../../../../types/Share';
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CreateQuestionWrapper, FromWrapper } from './CreateQuestion.styled';

interface ICreateQuestionFormInputs {
  content: string;
  medicalSpecialty: MedicalSpecialtyType;
}

const schema = yup
  .object({
    content: yup.string().required(),
    medicalSpecialty: yup.string().required(),
  })
  .required();

const CreateQuestion: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateQuestionFormInputs>({
    resolver: yupResolver(schema),
  });

  const onCreateQuestion = async (data: ICreateQuestionFormInputs) => {
    const payload = {
      content: data.content,
      medicalSpecialty: data.medicalSpecialty,
    };

    await createQuestion(payload);

    navigate('/question');
  };

  return (
    <>
      <SecondaryPageTop />
      <PrimaryPageContent>
        <CreateQuestionWrapper>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                What is your question?
              </Typography>
              <FromWrapper onSubmit={handleSubmit(onCreateQuestion)}>
                {/* <input type="text" placeholder="Question" {...register('content')} /> */}
                <TextField
                  label="Question"
                  multiline
                  rows={4}
                  placeholder="Example: What is the best way to treat muscle aches from the flu?"
                  variant="filled"
                  {...register('content')}
                />
                <p>{errors.content?.message}</p>
                {/* <select {...register('medicalSpecialty')}>
          <option value="">Select Medical Specialty</option>
          {Object.values(MedicalSpecialtyType).map((value) => (
            <option key={value} value={value}>
            {value
              .replace(/_/g, ' ')
              .toLowerCase()
              .replace(/\b(\w)/g, (s) => s.toUpperCase())}
              </option>
              ))}
            </select> */}

                <TextField
                  select
                  label="Select"
                  size="small"
                  helperText="Select Medical Specialty"
                  {...register('medicalSpecialty')}
                >
                  <MenuItem value="" selected>
                    Select Medical Specialty
                  </MenuItem>
                  {Object.values(MedicalSpecialtyType).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value
                        .replace(/_/g, ' ')
                        .toLowerCase()
                        .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                    </MenuItem>
                  ))}
                </TextField>
                <p>{errors.medicalSpecialty?.message}</p>

                <Button type="submit" variant="contained" color="primary">
                  Post question
                </Button>
                {/* <input type="submit" value="Post question" /> */}
              </FromWrapper>
            </CardContent>
          </Card>
        </CreateQuestionWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default CreateQuestion;
