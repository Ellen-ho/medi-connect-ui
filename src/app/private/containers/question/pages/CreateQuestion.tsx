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
import { CreateQuestionWrapper } from './CreateQuestion.styled';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import { toSentenceCaseFormat } from '../../../../../utils/sentenceCaseFormat';
import {
  ButtonAreaWrapper,
  CommonWrapper,
} from '../../../../layout/CommonWrapper.styled';

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
      <PrimaryPageContent>
        <CommonWrapper>
          <SecondaryPageTop />
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                What is your question?
              </Typography>
              <FormWrapper onSubmit={handleSubmit(onCreateQuestion)}>
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

                <TextField
                  select
                  label="Select"
                  size="small"
                  helperText="Select Medical Specialty"
                  {...register('medicalSpecialty')}
                >
                  <MenuItem value="" selected disabled>
                    Select Medical Specialty
                  </MenuItem>
                  {Object.values(MedicalSpecialtyType).map((value) => (
                    <MenuItem key={value} value={value}>
                      {toSentenceCaseFormat(value)}
                    </MenuItem>
                  ))}
                </TextField>
                <p>{errors.medicalSpecialty?.message}</p>

                <ButtonAreaWrapper>
                  <Button type="submit" variant="contained" color="primary">
                    Post question
                  </Button>
                </ButtonAreaWrapper>
                {/* <input type="submit" value="Post question" /> */}
              </FormWrapper>
            </CardContent>
          </Card>
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default CreateQuestion;
