import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatEmojisProps {
  onSelectEmoji: (emoji: string) => void;
}

const emojis = ['👍', '👎', '😂', '😮', '😢', '🎉', '🎲', '💰', '🤑', '🍀'];

const EmojisContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const EmojiButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const EmojiReaction = styled(motion.div)`
  position: fixed;
  font-size: 2rem;
  pointer-events: none;
  z-index: 100;
`;

const ChatEmojis: React.FC<ChatEmojisProps> = ({ onSelectEmoji }) => {
  const [reactions, setReactions] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  let reactionId = 0;
  
  const handleEmojiClick = (emoji: string, event: React.MouseEvent) => {
    // Create a new reaction
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const newReaction = {
      id: reactionId++,
      emoji,
      x: rect.left + rect.width / 2,
      y: rect.top
    };
    
    setReactions(prev => [...prev, newReaction]);
    
    // Remove the reaction after animation
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 2000);
    
    // Call the callback
    onSelectEmoji(emoji);
  };
  
  return (
    <>
      <EmojisContainer>
        {emojis.map((emoji, index) => (
          <EmojiButton
            key={index}
            onClick={(e) => handleEmojiClick(emoji, e)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {emoji}
          </EmojiButton>
        ))}
      </EmojisContainer>
      
      <AnimatePresence>
        {reactions.map(reaction => (
          <EmojiReaction
            key={reaction.id}
            style={{ 
              left: reaction.x - 16, // Center the emoji
              top: reaction.y - 16    // Center the emoji
            }}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ 
              opacity: [1, 1, 0],
              scale: [0.5, 1.5, 1],
              y: -100,
              rotate: Math.random() * 40 - 20 // Random rotation between -20 and 20 degrees
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {reaction.emoji}
          </EmojiReaction>
        ))}
      </AnimatePresence>
    </>
  );
};

export default ChatEmojis;
