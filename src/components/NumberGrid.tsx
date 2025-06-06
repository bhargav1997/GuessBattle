import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

interface NumberGridProps {
   onSelectNumber: (number: number) => void;
   selectedNumber: number | null;
   winningNumber?: number | null;
   disabled?: boolean;
   showChipAnimation?: boolean;
}

const GridContainer = styled.div`
   display: grid;
   grid-template-columns: repeat(10, 1fr);
   gap: 0.5rem;
   max-width: 600px;
   margin: 0 auto;

   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      gap: 0.25rem;
   }
`;

interface NumberCellProps {
   selected: boolean;
   winning: boolean;
   disabled: boolean;
}

const NumberCell = styled(motion.button)<NumberCellProps>`
   aspect-ratio: 1;
   display: flex;
   align-items: center;
   justify-content: center;
   font-family: ${({ theme }) => theme.fonts.heading};
   font-weight: 700;
   font-size: 1.25rem;
   border-radius: ${({ theme }) => theme.borderRadius};
   cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
   transition: all 0.2s ease;
   border: 2px solid transparent;
   background: ${({ theme, selected, winning }) => {
      if (winning) return theme.colors.success;
      if (selected) return theme.colors.primary;
      return "rgba(255, 255, 255, 0.05)";
   }};
   color: ${({ theme }) => theme.colors.textLight};
   opacity: ${({ disabled, selected, winning }) => {
      if (disabled && !selected && !winning) return 0.5;
      return 1;
   }};

   &:hover:not(:disabled) {
      background: ${({ theme, selected, winning }) => {
         if (winning) return theme.colors.success;
         if (selected) return theme.colors.primary;
         return "rgba(255, 255, 255, 0.1)";
      }};
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.neonGlow};
   }

   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1rem;
   }

   position: relative;
`;

const BettingChip = styled(motion.div)`
   position: absolute;
   width: 30px;
   height: 30px;
   border-radius: 50%;
   background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
   border: 2px solid white;
   z-index: 10;
   display: flex;
   align-items: center;
   justify-content: center;
   color: white;
   font-weight: bold;
   font-size: 0.75rem;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

   &::before {
      content: "";
      position: absolute;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 1px dashed rgba(255, 255, 255, 0.5);
   }
`;

const NumberGrid: React.FC<NumberGridProps> = ({ onSelectNumber, selectedNumber, winningNumber = null, disabled = false }) => {
   const renderNumbers = () => {
      const cells = [];

      for (let i = 0; i < 100; i++) {
         const isSelected = selectedNumber === i;
         const isWinning = winningNumber === i;

         cells.push(
            <NumberCell
               key={i}
               selected={isSelected}
               winning={isWinning}
               disabled={disabled}
               onClick={() => !disabled && onSelectNumber(i)}
               whileHover={{ scale: disabled ? 1 : 1.05 }}
               whileTap={{ scale: disabled ? 1 : 0.95 }}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.3, delay: i * 0.002 }}>
               {i.toString().padStart(2, "0")}
            </NumberCell>,
         );
      }

      return cells;
   };

   return <GridContainer>{renderNumbers()}</GridContainer>;
};

export default NumberGrid;
