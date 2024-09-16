import PrimaryPageContent from '../../../layout/PrimaryPageContent';
import SignUpDoctorCard from './components/SignUpDoctor';
import { SignUpWrapper } from './SignUp.styled';

const SignUpDoctor: React.FC = () => {
  return (
    <PrimaryPageContent>
      <SignUpWrapper>
        <SignUpDoctorCard />
      </SignUpWrapper>
    </PrimaryPageContent>
  );
};

export default SignUpDoctor;
