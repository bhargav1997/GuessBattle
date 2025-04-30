import styled from 'styled-components';

interface GridProps {
  columns?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
}

const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${({ columns }) => columns || 'repeat(12, 1fr)'};
  gap: ${({ gap }) => gap || '1rem'};
  row-gap: ${({ rowGap }) => rowGap};
  column-gap: ${({ columnGap }) => columnGap};
`;

export default Grid;
