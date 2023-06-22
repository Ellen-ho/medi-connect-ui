import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageTransitionWrapper } from './PageTransition.styled';

interface IPageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<IPageTransitionProps> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
  }, [location]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <PageTransitionWrapper
      isTransitioning={isTransitioning}
      onTransitionEnd={handleTransitionEnd}
    >
      {children}
    </PageTransitionWrapper>
  );
};

export default PageTransition;
