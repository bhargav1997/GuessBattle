import styled, { css } from 'styled-components';

interface InputProps {
  error?: boolean;
  fullWidth?: boolean;
}

const Input = styled.input<InputProps>`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
  padding: 0.75rem 1rem;
  transition: all ${({ theme }) => theme.transitions.default};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(106, 17, 203, 0.2);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textDim};
  }
  
  ${({ error, theme }) =>
    error &&
    css`
      border-color: ${theme.colors.error};
      
      &:focus {
        box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2);
      }
    `}
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export default Input;
