import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { createQuestion } from '../../../../../services/QuestionService';
import { MedicalSpecialtyType } from '../../../../../types/Share';
import UnderConstructionSign from '../../../../../components/signs/UnderConstructionSign';

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

const CreateRecord: React.FC = () => {
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
      {/* <form onSubmit={handleSubmit(onCreateQuestion)}>
        <input type="text" placeholder="Question" {...register('content')} />
        <p>{errors.content?.message}</p>
        <select {...register('medicalSpecialty')}>
          <option value="">Select Medical Specialty</option>
          {Object.values(MedicalSpecialtyType).map((value) => (
            <option key={value} value={value}>
              {value
                .replace(/_/g, ' ')
                .toLowerCase()
                .replace(/\b(\w)/g, (s) => s.toUpperCase())}
            </option>
          ))}
        </select>
        <p>{errors.medicalSpecialty?.message}</p>
        <input type="submit" value="Post question" />
      </form> */}
      <UnderConstructionSign />
    </>
  );
};

export default CreateRecord;
