import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from './Button';
import Flex from './Flex';

interface BettingOption {
  id: string;
  label: string;
  description: string;
  odds: string;
}

interface BettingOptionsProps {
  onSelectOption: (optionId: string) => void;
  selectedOption: string | null;
  disabled?: boolean;
}

const OptionsContainer = styled.div`
  margin: 2rem 0;
`;

const OptionCard = styled(motion.div)<{ selected: boolean; disabled: boolean }>`
  background: ${({ theme, selected }) => 
    selected ? 'rgba(106, 17, 203, 0.2)' : 'rgba(255, 255, 255, 0.05)'
  };
  border: 2px solid ${({ theme, selected }) => 
    selected ? theme.colors.primary : 'transparent'
  };
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  opacity: ${({ disabled, selected }) => (disabled && !selected ? 0.6 : 1)};
  
  &:hover:not(:disabled) {
    background: ${({ theme, selected }) => 
      selected ? 'rgba(106, 17, 203, 0.3)' : 'rgba(255, 255, 255, 0.1)'
    };
    transform: translateY(-3px);
  }
`;

const OptionTitle = styled.h3`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const OptionDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textDim};
  margin-bottom: 0.5rem;
`;

const OptionOdds = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
`;

const bettingOptions: BettingOption[] = [
  {
    id: 'above50',
    label: 'Above 50',
    description: 'Bet on any number from 50 to 99',
    odds: '1:1',
  },
  {
    id: 'below50',
    label: 'Below 50',
    description: 'Bet on any number from 00 to 49',
    odds: '1:1',
  },
  {
    id: 'even',
    label: 'Even Numbers',
    description: 'Bet on any even number',
    odds: '1:1',
  },
  {
    id: 'odd',
    label: 'Odd Numbers',
    description: 'Bet on any odd number',
    odds: '1:1',
  },
  {
    id: 'close',
    label: 'Close (±5)',
    description: 'Win if your number is within 5 of the winning number',
    odds: '1:5',
  },
];

const BettingOptions: React.FC<BettingOptionsProps> = ({
  onSelectOption,
  selectedOption,
  disabled = false,
}) => {
  return (
    <OptionsContainer>
      <Flex direction="column" gap="1rem">
        {bettingOptions.map((option) => (
          <OptionCard
            key={option.id}
            selected={selectedOption === option.id}
            disabled={disabled}
            onClick={() => !disabled && onSelectOption(option.id)}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
          >
            <OptionTitle>{option.label}</OptionTitle>
            <OptionDescription>{option.description}</OptionDescription>
            <OptionOdds>Odds: {option.odds}</OptionOdds>
          </OptionCard>
        ))}
      </Flex>
    </OptionsContainer>
  );
};

export default BettingOptions;
