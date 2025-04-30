import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
}

const getButtonStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${({ theme }) => theme.colors.gradients.primary};
        color: ${({ theme }) => theme.colors.textLight};
        border: none;
        
        &:hover:not(:disabled) {
          box-shadow: ${({ theme }) => theme.shadows.neonGlow};
          transform: translateY(-2px);
        }
      `;
    case 'secondary':
      return css`
        background: ${({ theme }) => theme.colors.gradients.secondary};
        color: ${({ theme }) => theme.colors.textLight};
        border: none;
        
        &:hover:not(:disabled) {
          box-shadow: 0 0 10px rgba(255, 77, 77, 0.7);
          transform: translateY(-2px);
        }
      `;
    case 'outline':
      return css`
        background: transparent;
        color: ${({ theme }) => theme.colors.primary};
        border: 2px solid ${({ theme }) => theme.colors.primary};
        
        &:hover:not(:disabled) {
          background: rgba(106, 17, 203, 0.1);
        }
      `;
    case 'text':
      return css`
        background: transparent;
        color: ${({ theme }) => theme.colors.primary};
        border: none;
        padding: 0.5rem 1rem;
        
        &:hover:not(:disabled) {
          text-decoration: underline;
        }
      `;
    default:
      return '';
  }
};

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      `;
    case 'medium':
      return css`
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      `;
    case 'large':
      return css`
        padding: 1rem 2rem;
        font-size: 1.125rem;
      `;
    default:
      return '';
  }
};

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: 600;
  transition: all ${({ theme }) => theme.transitions.default};
  cursor: pointer;
  
  ${({ variant = 'primary' }) => getButtonStyles(variant)}
  ${({ size = 'medium' }) => getButtonSize(size)}
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

export default Button;
