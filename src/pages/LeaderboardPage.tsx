import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCrown, FaTrophy, FaMedal, FaChartLine, FaCalendarAlt, FaHistory } from 'react-icons/fa';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';
import Flex from '../components/Flex';

// Mock data for leaderboard
const mockLeaderboardData = {
  weekly: [
    { rank: 1, username: 'LuckyCharm88', chipsWon: 12500, gamesPlayed: 47, winRate: 68.5 },
    { rank: 2, username: 'NumberWizard', chipsWon: 10800, gamesPlayed: 52, winRate: 63.2 },
    { rank: 3, username: 'GuessMaster', chipsWon: 9750, gamesPlayed: 41, winRate: 59.8 },
    { rank: 4, username: 'PredictionKing', chipsWon: 8200, gamesPlayed: 38, winRate: 57.3 },
    { rank: 5, username: 'FortuneSeeker', chipsWon: 7600, gamesPlayed: 45, winRate: 55.1 },
    { rank: 6, username: 'LuckyDraw', chipsWon: 6900, gamesPlayed: 39, winRate: 53.8 },
    { rank: 7, username: 'ChipCollector', chipsWon: 6200, gamesPlayed: 42, winRate: 52.4 },
    { rank: 8, username: 'WinningStreak', chipsWon: 5800, gamesPlayed: 36, winRate: 50.9 },
    { rank: 9, username: 'MathGenius', chipsWon: 5100, gamesPlayed: 33, winRate: 49.2 },
    { rank: 10, username: 'LuckyGuesser', chipsWon: 4700, gamesPlayed: 31, winRate: 48.5 },
  ],
  monthly: [
    { rank: 1, username: 'PredictionKing', chipsWon: 45200, gamesPlayed: 152, winRate: 71.2 },
    { rank: 2, username: 'LuckyCharm88', chipsWon: 42800, gamesPlayed: 165, winRate: 68.9 },
    { rank: 3, username: 'NumberWizard', chipsWon: 38500, gamesPlayed: 143, winRate: 65.3 },
    { rank: 4, username: 'GuessMaster', chipsWon: 32100, gamesPlayed: 138, winRate: 62.7 },
    { rank: 5, username: 'ChipCollector', chipsWon: 29600, gamesPlayed: 145, winRate: 59.4 },
    { rank: 6, username: 'FortuneSeeker', chipsWon: 27900, gamesPlayed: 139, winRate: 57.8 },
    { rank: 7, username: 'WinningStreak', chipsWon: 25200, gamesPlayed: 132, winRate: 55.2 },
    { rank: 8, username: 'MathGenius', chipsWon: 23800, gamesPlayed: 126, winRate: 53.9 },
    { rank: 9, username: 'LuckyGuesser', chipsWon: 21500, gamesPlayed: 121, winRate: 52.1 },
    { rank: 10, username: 'NumberHunter', chipsWon: 19800, gamesPlayed: 118, winRate: 50.8 },
  ],
  allTime: [
    { rank: 1, username: 'PredictionKing', chipsWon: 187500, gamesPlayed: 652, winRate: 73.5 },
    { rank: 2, username: 'NumberWizard', chipsWon: 165800, gamesPlayed: 598, winRate: 70.2 },
    { rank: 3, username: 'LuckyCharm88', chipsWon: 152300, gamesPlayed: 573, winRate: 68.7 },
    { rank: 4, username: 'GuessMaster', chipsWon: 143700, gamesPlayed: 542, winRate: 65.3 },
    { rank: 5, username: 'FortuneSeeker', chipsWon: 128900, gamesPlayed: 521, winRate: 62.8 },
    { rank: 6, username: 'ChipCollector', chipsWon: 115600, gamesPlayed: 498, winRate: 60.4 },
    { rank: 7, username: 'WinningStreak', chipsWon: 102300, gamesPlayed: 475, winRate: 58.9 },
    { rank: 8, username: 'MathGenius', chipsWon: 95700, gamesPlayed: 462, winRate: 57.2 },
    { rank: 9, username: 'LuckyGuesser', chipsWon: 87200, gamesPlayed: 443, winRate: 55.8 },
    { rank: 10, username: 'NumberHunter', chipsWon: 79800, gamesPlayed: 428, winRate: 54.3 },
  ],
};

type TimeFilter = 'weekly' | 'monthly' | 'allTime';

const PageContainer = styled.div`
  padding: 4rem 0;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.25rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textDim};
  max-width: 800px;
  margin: 0 auto 3rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.125rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const FilterButton = styled(Button)<{ active: boolean }>`
  margin: 0 0.5rem;
  
  ${({ active, theme }) => active && `
    background: ${theme.colors.primary};
    box-shadow: ${theme.shadows.neonGlow};
  `}
`;

const LeaderboardCard = styled(Card)`
  margin-bottom: 2rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  ${({ theme }) => `
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.2);
  `}
`;

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: rgba(106, 17, 203, 0.2);
  
  th {
    padding: 1.25rem 1rem;
    text-align: left;
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: 600;
    
    &:first-child {
      text-align: center;
      width: 80px;
    }
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  td {
    padding: 1.25rem 1rem;
    color: ${({ theme }) => theme.colors.textLight};
    
    &:first-child {
      text-align: center;
    }
  }
`;

const RankCell = styled.td`
  font-weight: 700;
  position: relative;
`;

const TopRankIcon = styled.div<{ rank: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: ${({ rank }) => 
    rank === 1 ? '#FFD700' : // Gold
    rank === 2 ? '#C0C0C0' : // Silver
    rank === 3 ? '#CD7F32' : // Bronze
    'transparent'
  };
`;

const UsernameCell = styled.td`
  font-weight: 600;
`;

const ChipsWonCell = styled.td`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.success} !important;
`;

const WinRateCell = styled.td`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary} !important;
`;

const MotivationalBanner = styled(motion.div)`
  background: ${({ theme }) => theme.colors.gradients.primary};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: center;
  margin-top: 3rem;
`;

const BannerTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const BannerText = styled.p`
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
`;

const LeaderboardPage: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('weekly');
  
  const getLeaderboardData = () => {
    return mockLeaderboardData[timeFilter];
  };
  
  const getTimeFilterLabel = () => {
    switch (timeFilter) {
      case 'weekly':
        return 'This Week';
      case 'monthly':
        return 'This Month';
      case 'allTime':
        return 'All Time';
      default:
        return '';
    }
  };
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaCrown />;
      case 2:
        return <FaTrophy />;
      case 3:
        return <FaMedal />;
      default:
        return null;
    }
  };
  
  return (
    <PageContainer>
      <Container>
        <PageTitle>Leaderboard</PageTitle>
        <PageSubtitle>
          Check out our top players and see if you can climb the ranks to become a GuessBattle champion!
        </PageSubtitle>
        
        <FilterContainer>
          <FilterButton 
            variant={timeFilter === 'weekly' ? 'primary' : 'outline'} 
            active={timeFilter === 'weekly'}
            onClick={() => setTimeFilter('weekly')}
          >
            <FaCalendarAlt style={{ marginRight: '0.5rem' }} /> Weekly
          </FilterButton>
          <FilterButton 
            variant={timeFilter === 'monthly' ? 'primary' : 'outline'} 
            active={timeFilter === 'monthly'}
            onClick={() => setTimeFilter('monthly')}
          >
            <FaCalendarAlt style={{ marginRight: '0.5rem' }} /> Monthly
          </FilterButton>
          <FilterButton 
            variant={timeFilter === 'allTime' ? 'primary' : 'outline'} 
            active={timeFilter === 'allTime'}
            onClick={() => setTimeFilter('allTime')}
          >
            <FaHistory style={{ marginRight: '0.5rem' }} /> All Time
          </FilterButton>
        </FilterContainer>
        
        <LeaderboardCard>
          <LeaderboardTable>
            <TableHeader>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Chips Won</th>
                <th>Games Played</th>
                <th>Win Rate</th>
              </tr>
            </TableHeader>
            <TableBody>
              {getLeaderboardData().map((player) => (
                <motion.tr
                  key={player.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: player.rank * 0.05 }}
                >
                  <RankCell>
                    {player.rank}
                    <TopRankIcon rank={player.rank}>
                      {getRankIcon(player.rank)}
                    </TopRankIcon>
                  </RankCell>
                  <UsernameCell>{player.username}</UsernameCell>
                  <ChipsWonCell>${player.chipsWon.toLocaleString()}</ChipsWonCell>
                  <td>{player.gamesPlayed}</td>
                  <WinRateCell>{player.winRate}%</WinRateCell>
                </motion.tr>
              ))}
            </TableBody>
          </LeaderboardTable>
        </LeaderboardCard>
        
        <MotivationalBanner
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <BannerTitle>Will You Make It to the Top?</BannerTitle>
          <BannerText>
            Join the competition and test your prediction skills against the best players. 
            Play more games, improve your strategy, and climb the ranks to become a GuessBattle legend!
          </BannerText>
          <Button 
            as="a" 
            href="/game" 
            style={{ marginTop: '1.5rem' }}
          >
            <FaChartLine style={{ marginRight: '0.5rem' }} /> Start Climbing Now
          </Button>
        </MotivationalBanner>
      </Container>
    </PageContainer>
  );
};

export default LeaderboardPage;
