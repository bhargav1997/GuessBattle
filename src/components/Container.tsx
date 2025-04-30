import styled from 'styled-components';

interface ContainerProps {
  fluid?: boolean;
  maxWidth?: string;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
  
  max-width: ${({ fluid, maxWidth }) => 
    fluid ? '100%' : maxWidth || '1200px'
  };
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-right: 2rem;
    padding-left: 2rem;
  }
`;

export default Container;
