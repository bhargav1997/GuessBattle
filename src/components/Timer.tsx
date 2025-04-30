import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface TimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
  isActive?: boolean;
}

interface ProgressBarProps {
  progress: number;
  urgency: 'normal' | 'warning' | 'critical';
}

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5rem 0;
`;

const TimeDisplay = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

const ProgressBarFill = styled(motion.div)<ProgressBarProps>`
  height: 100%;
  border-radius: 5px;
  background: ${({ theme, urgency }) => {
    switch (urgency) {
      case 'critical':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      default:
        return theme.colors.gradients.primary;
    }
  }};
  width: ${({ progress }) => `${progress}%`};
`;

const Timer: React.FC<TimerProps> = ({ 
  duration, 
  onComplete, 
  isActive = true 
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          onComplete && onComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [duration, onComplete, isActive]);
  
  useEffect(() => {
    setProgress((timeLeft / duration) * 100);
  }, [timeLeft, duration]);
  
  const getUrgency = (): 'normal' | 'warning' | 'critical' => {
    const percentage = (timeLeft / duration) * 100;
    if (percentage <= 20) return 'critical';
    if (percentage <= 50) return 'warning';
    return 'normal';
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <TimerContainer>
      <TimeDisplay>{formatTime(timeLeft)}</TimeDisplay>
      <ProgressBarContainer>
        <AnimatePresence>
          <ProgressBarFill 
            progress={progress} 
            urgency={getUrgency()}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </AnimatePresence>
      </ProgressBarContainer>
    </TimerContainer>
  );
};

export default Timer;
