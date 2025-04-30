import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultAnimationProps {
  winningNumber: number | null;
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

const AnimationContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const NumberContainer = styled(motion.div)`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerNumber = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 6rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textLight};
  text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary};
`;

const ResultText = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  background: ${({ theme }) => theme.colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ResultAnimation: React.FC<ResultAnimationProps> = ({
  winningNumber,
  isVisible,
  onAnimationComplete,
}) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let spinInterval: NodeJS.Timeout;
    let spinDuration = 3000; // 3 seconds of spinning
    
    // Start spinning
    spinInterval = setInterval(() => {
      setCurrentNumber(Math.floor(Math.random() * 100));
    }, 50);
    
    // Stop spinning after duration
    const spinTimeout = setTimeout(() => {
      clearInterval(spinInterval);
      setIsSpinning(false);
      
      // If we have a winning number, set it
      if (winningNumber !== null) {
        setCurrentNumber(winningNumber);
      }
      
      // Call onAnimationComplete after a delay
      setTimeout(() => {
        onAnimationComplete && onAnimationComplete();
      }, 3000);
    }, spinDuration);
    
    return () => {
      clearInterval(spinInterval);
      clearTimeout(spinTimeout);
    };
  }, [isVisible, winningNumber, onAnimationComplete]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <AnimationContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NumberContainer
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: isSpinning ? Infinity : 0, duration: 0.5 }}
          >
            <SpinnerNumber
              key={currentNumber}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.2 }}
            >
              {currentNumber.toString().padStart(2, '0')}
            </SpinnerNumber>
          </NumberContainer>
          
          {!isSpinning && (
            <ResultText
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              The winning number is {winningNumber?.toString().padStart(2, '0')}!
            </ResultText>
          )}
        </AnimationContainer>
      )}
    </AnimatePresence>
  );
};

export default ResultAnimation;
