import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/Container';
import Button from '../components/Button';

const NotFoundContainer = styled.div`
  padding: 5rem 0;
  text-align: center;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 8rem;
  margin: 0;
  background: ${({ theme }) => theme.colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 6rem;
  }
`;

const ErrorTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const ErrorMessage = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textDim};
  max-width: 600px;
  margin: 0 auto 2.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.125rem;
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <NotFoundContainer>
      <Container>
        <ErrorCode
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          404
        </ErrorCode>
        <ErrorTitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Page Not Found
        </ErrorTitle>
        <ErrorMessage
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </ErrorMessage>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button as={Link} to="/" size="large">
            Return to Home
          </Button>
        </motion.div>
      </Container>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
