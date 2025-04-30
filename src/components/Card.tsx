import styled, { css } from 'styled-components';

interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: string;
  neonBorder?: boolean;
}

const getCardVariant = (variant: string) => {
  switch (variant) {
    case 'outlined':
      return css`
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.1);
      `;
    case 'elevated':
      return css`
        background: ${({ theme }) => theme.colors.backgroundDarker};
        box-shadow: ${({ theme }) => theme.shadows.card};
      `;
    default:
      return css`
        background: ${({ theme }) => theme.colors.backgroundDark};
        border: 1px solid rgba(255, 255, 255, 0.05);
      `;
  }
};

const Card = styled.div<CardProps>`
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ padding }) => padding || '1.5rem'};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  ${({ variant = 'default' }) => getCardVariant(variant)}
  
  ${({ neonBorder, theme }) => neonBorder && css`
    border: 1px solid ${theme.colors.primary};
    box-shadow: 0 0 5px ${theme.colors.primary}, 0 0 10px ${theme.colors.primary};
  `}
  
  &:hover {
    transform: translateY(-5px);
  }
`;

export default Card;
