import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface NumberSpinnerProps {
  duration?: number;
  autoPlay?: boolean;
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SpinnerDisplay = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(106, 17, 203, 0.2) 0%, rgba(37, 117, 252, 0.2) 100%);
  border: 3px solid rgba(106, 17, 203, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 20px rgba(106, 17, 203, 0.3);
  margin-bottom: 2rem;
  overflow: hidden;
`;

const NumberDisplay = styled(motion.div)`
  font-size: 4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textLight};
  text-shadow: 0 0 10px rgba(106, 17, 203, 0.8);
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const SpinButton = styled(motion.button)`
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  border: none;
  border-radius: 50px;
  padding: 0.75rem 2rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const SpinnerLight = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
  opacity: 0;
`;

const ResultText = styled(motion.div)`
  margin-top: 1rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const NumberSpinner: React.FC<NumberSpinnerProps> = ({ duration = 3000, autoPlay = false }) => {
  const [spinning, setSpinning] = useState(false);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [finalNumber, setFinalNumber] = useState<number | null>(null);
  const [spinInterval, setSpinInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Start spinning automatically if autoPlay is true
  useEffect(() => {
    if (autoPlay) {
      handleSpin();
    }
    
    return () => {
      if (spinInterval) {
        clearInterval(spinInterval);
      }
    };
  }, [autoPlay]);
  
  const handleSpin = () => {
    if (spinning) return;
    
    setSpinning(true);
    setFinalNumber(null);
    
    // Generate a random final number (0-99)
    const randomFinalNumber = Math.floor(Math.random() * 100);
    
    // Start rapidly changing numbers
    const interval = setInterval(() => {
      setCurrentNumber(Math.floor(Math.random() * 100));
    }, 50);
    
    setSpinInterval(interval);
    
    // Stop spinning after the duration
    setTimeout(() => {
      if (interval) {
        clearInterval(interval);
      }
      
      setCurrentNumber(randomFinalNumber);
      setFinalNumber(randomFinalNumber);
      setSpinning(false);
    }, duration);
  };
  
  return (
    <SpinnerContainer>
      <SpinnerDisplay>
        <SpinnerLight
          animate={spinning ? { opacity: [0, 0.8, 0], rotate: 360 } : { opacity: 0 }}
          transition={{ repeat: spinning ? Infinity : 0, duration: 1.5 }}
        />
        <AnimatePresence mode="wait">
          <NumberDisplay
            key={currentNumber}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {currentNumber !== null ? currentNumber.toString().padStart(2, '0') : '??'}
          </NumberDisplay>
        </AnimatePresence>
      </SpinnerDisplay>
      
      <SpinButton
        onClick={handleSpin}
        disabled={spinning}
        whileTap={{ scale: 0.95 }}
      >
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </SpinButton>
      
      {finalNumber !== null && (
        <ResultText
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          The winning number is <strong>{finalNumber.toString().padStart(2, '0')}</strong>!
        </ResultText>
      )}
    </SpinnerContainer>
  );
};

export default NumberSpinner;
