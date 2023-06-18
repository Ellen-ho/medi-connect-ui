import {
  PrimaryPageTitle,
  PrimaryPageTopWrapper,
} from './PrimaryPageTop.styled';

interface IPrimaryPageTopWrapperProps {
  pageTitle: string;
  leftElement?: React.ReactNode;
}
const PrimaryPageTop: React.FC<IPrimaryPageTopWrapperProps> = ({
  pageTitle,
  leftElement,
}) => {
  return (
    <PrimaryPageTopWrapper>
      <PrimaryPageTitle>{pageTitle}</PrimaryPageTitle>
      {leftElement}
    </PrimaryPageTopWrapper>
  );
};

export default PrimaryPageTop;
