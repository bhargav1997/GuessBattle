import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface PlayerAvatarProps {
  name: string;
  avatar?: string;
  isActive?: boolean;
  isWinner?: boolean;
  selectedNumber?: number | null;
  size?: 'small' | 'medium' | 'large';
}

interface AvatarContainerProps {
  isActive: boolean;
  isWinner: boolean;
  size: string;
}

const getSize = (size: string) => {
  switch (size) {
    case 'small':
      return '40px';
    case 'large':
      return '80px';
    default:
      return '60px';
  }
};

const getFontSize = (size: string) => {
  switch (size) {
    case 'small':
      return '0.75rem';
    case 'large':
      return '1.125rem';
    default:
      return '0.875rem';
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem;
`;

const AvatarContainer = styled(motion.div)<AvatarContainerProps>`
  width: ${({ size }) => getSize(size)};
  height: ${({ size }) => getSize(size)};
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 3px solid ${({ theme, isActive, isWinner }) => {
    if (isWinner) return theme.colors.success;
    if (isActive) return theme.colors.primary;
    return 'transparent';
  }};
  box-shadow: ${({ theme, isActive, isWinner }) => {
    if (isWinner) return '0 0 10px rgba(76, 175, 80, 0.7)';
    if (isActive) return theme.shadows.neonGlow;
    return 'none';
  }};
  transition: all 0.3s ease;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DefaultAvatar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gradients.primary};
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
`;

const PlayerName = styled.span<{ size: string }>`
  margin-top: 0.5rem;
  font-size: ${({ size }) => getFontSize(size)};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 100px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SelectedNumber = styled.div<{ isWinner: boolean }>`
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: ${({ theme, isWinner }) => 
    isWinner ? theme.colors.success : theme.colors.backgroundDark
  };
  color: ${({ theme }) => theme.colors.textLight};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  border: 2px solid ${({ theme, isWinner }) => 
    isWinner ? theme.colors.success : theme.colors.primary
  };
`;

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  name,
  avatar,
  isActive = false,
  isWinner = false,
  selectedNumber = null,
  size = 'medium',
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Container>
      <AvatarContainer 
        isActive={isActive} 
        isWinner={isWinner} 
        size={size}
        animate={isActive ? { scale: [1, 1.05, 1] } : {}}
        transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
      >
        {avatar ? (
          <Avatar src={avatar} alt={name} />
        ) : (
          <DefaultAvatar>{getInitials(name)}</DefaultAvatar>
        )}
        
        {selectedNumber !== null && (
          <SelectedNumber isWinner={isWinner}>
            {selectedNumber.toString().padStart(2, '0')}
          </SelectedNumber>
        )}
      </AvatarContainer>
      <PlayerName size={size}>{name}</PlayerName>
    </Container>
  );
};

export default PlayerAvatar;
