import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaWallet, 
  FaHistory, 
  FaTrophy, 
  FaUsers, 
  FaCog, 
  FaPlus, 
  FaSearch,
  FaCoins,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';
import Flex from '../components/Flex';
import Grid from '../components/Grid';
import Input from '../components/Input';

// Mock data for tables
const mockTables = [
  { id: 1, name: 'High Rollers', players: 7, maxPlayers: 10, minBet: 50, status: 'active' },
  { id: 2, name: 'Casual Play', players: 4, maxPlayers: 8, minBet: 10, status: 'active' },
  { id: 3, name: 'Beginners', players: 8, maxPlayers: 8, minBet: 5, status: 'full' },
  { id: 4, name: 'VIP Table', players: 2, maxPlayers: 6, minBet: 100, status: 'active' },
  { id: 5, name: 'Tournament #123', players: 5, maxPlayers: 10, minBet: 25, status: 'active' },
];

// Mock data for game history
const mockHistory = [
  { id: 1, date: '2023-04-30 14:23', table: 'High Rollers', bet: 50, number: 42, result: 37, winnings: -50 },
  { id: 2, date: '2023-04-30 14:10', table: 'High Rollers', bet: 50, number: 23, result: 23, winnings: 150 },
  { id: 3, date: '2023-04-29 19:45', table: 'Casual Play', bet: 20, number: 88, result: 12, winnings: -20 },
  { id: 4, date: '2023-04-29 19:30', table: 'Casual Play', bet: 20, number: 55, result: 57, winnings: -20 },
  { id: 5, date: '2023-04-29 19:15', table: 'Casual Play', bet: 20, number: 76, result: 76, winnings: 60 },
];

// Mock data for leaderboard
const mockLeaderboard = [
  { rank: 1, name: 'JackpotKing', winnings: 12500, games: 230 },
  { rank: 2, name: 'LuckyCharm', winnings: 9800, games: 175 },
  { rank: 3, name: 'NumberWizard', winnings: 8650, games: 190 },
  { rank: 4, name: 'FortuneSeeker', winnings: 7200, games: 160 },
  { rank: 5, name: 'GuessMaster', winnings: 6500, games: 145 },
];

type DashboardTab = 'tables' | 'history' | 'leaderboard' | 'wallet' | 'profile' | 'settings';

const DashboardContainer = styled.div`
  padding: 3rem 0;
`;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
`;

const DashboardTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const DashboardSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 1.125rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const StatCard = styled(motion(Card))`
  padding: 1.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.colors.textLight};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
`;

interface TabProps {
  active: boolean;
}

const Tab = styled.button<TabProps>`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.textDim};
  font-weight: ${({ active }) => active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.gradients.primary};
    transform: scaleX(${({ active }) => active ? 1 : 0});
    transition: transform 0.3s ease;
  }
`;

const TabIcon = styled.span`
  margin-right: 0.5rem;
`;

const TableCard = styled(Card)`
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TableName = styled.h3`
  font-size: 1.25rem;
  margin: 0;
`;

const TableStatus = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ status, theme }) => 
    status === 'active' ? theme.colors.success : 
    status === 'full' ? theme.colors.warning : 
    theme.colors.error};
  color: white;
`;

const TableInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 0.875rem;
  
  span {
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: 500;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textDim};
`;

const SearchInput = styled(Input)`
  padding-left: 2.5rem;
`;

const CreateTableButton = styled(Button)`
  margin-bottom: 1.5rem;
`;

const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader2 = styled.th`
  text-align: left;
  padding: 1rem 0.5rem;
  color: ${({ theme }) => theme.colors.textDim};
  font-weight: 500;
`;

const TableCell = styled.td`
  padding: 1rem 0.5rem;
`;

const WinAmount = styled.span<{ positive: boolean }>`
  color: ${({ positive, theme }) => positive ? theme.colors.success : theme.colors.error};
  font-weight: 500;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.25rem;
  }
`;

const LeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const RankBadge = styled.div<{ rank: number }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 1rem;
  
  background: ${({ rank, theme }) => 
    rank === 1 ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' : 
    rank === 2 ? 'linear-gradient(135deg, #C0C0C0 0%, #A9A9A9 100%)' : 
    rank === 3 ? 'linear-gradient(135deg, #CD7F32 0%, #A0522D 100%)' : 
    'rgba(255, 255, 255, 0.1)'};
  
  color: ${({ rank }) => 
    rank <= 3 ? '#000' : '#fff'};
`;

const PlayerInfo = styled.div`
  flex: 1;
`;

const PlayerName = styled.div`
  font-weight: 500;
`;

const PlayerStats = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

const WinningsAmount = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.success};
`;

const WalletSection = styled.div`
  margin-bottom: 2rem;
`;

const WalletBalance = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin: 1.5rem 0;
  color: ${({ theme }) => theme.colors.textLight};
`;

const WalletActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TransactionHistory = styled.div`
  margin-top: 2rem;
`;

const ProfileForm = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('tables');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTables = mockTables.filter(table => 
    table.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <DashboardContainer>
      <Container>
        <DashboardHeader>
          <DashboardTitle>Dashboard</DashboardTitle>
          <DashboardSubtitle>Welcome back, Player123!</DashboardSubtitle>
        </DashboardHeader>
        
        <StatsGrid>
          <StatCard
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <StatLabel>
              <FaWallet /> Balance
            </StatLabel>
            <StatValue>$1,250</StatValue>
          </StatCard>
          
          <StatCard
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <StatLabel>
              <FaTrophy /> Wins
            </StatLabel>
            <StatValue>42</StatValue>
          </StatCard>
          
          <StatCard
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <StatLabel>
              <FaHistory /> Games Played
            </StatLabel>
            <StatValue>87</StatValue>
          </StatCard>
          
          <StatCard
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <StatLabel>
              <FaCoins /> Win Rate
            </StatLabel>
            <StatValue>48.3%</StatValue>
          </StatCard>
        </StatsGrid>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'tables'} 
            onClick={() => setActiveTab('tables')}
          >
            <TabIcon><FaUsers /></TabIcon> Game Tables
          </Tab>
          <Tab 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')}
          >
            <TabIcon><FaHistory /></TabIcon> Game History
          </Tab>
          <Tab 
            active={activeTab === 'leaderboard'} 
            onClick={() => setActiveTab('leaderboard')}
          >
            <TabIcon><FaTrophy /></TabIcon> Leaderboard
          </Tab>
          <Tab 
            active={activeTab === 'wallet'} 
            onClick={() => setActiveTab('wallet')}
          >
            <TabIcon><FaWallet /></TabIcon> Wallet
          </Tab>
          <Tab 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          >
            <TabIcon><FaUser /></TabIcon> Profile
          </Tab>
          <Tab 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          >
            <TabIcon><FaCog /></TabIcon> Settings
          </Tab>
        </TabsContainer>
        
        {activeTab === 'tables' && (
          <>
            <Flex justify="space-between" align="center" style={{ marginBottom: '1.5rem' }}>
              <h2>Available Tables</h2>
              <CreateTableButton variant="primary">
                <FaPlus style={{ marginRight: '0.5rem' }} /> Create Table
              </CreateTableButton>
            </Flex>
            
            <SearchContainer>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput 
                placeholder="Search tables..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
              />
            </SearchContainer>
            
            <Grid columns="repeat(auto-fill, minmax(300px, 1fr))" gap="1.5rem">
              {filteredTables.map(table => (
                <TableCard key={table.id}>
                  <TableHeader>
                    <TableName>{table.name}</TableName>
                    <TableStatus status={table.status}>
                      {table.status === 'active' ? 'Active' : 
                       table.status === 'full' ? 'Full' : 'Closed'}
                    </TableStatus>
                  </TableHeader>
                  
                  <TableInfo>
                    <InfoItem>
                      Players: <span>{table.players}/{table.maxPlayers}</span>
                    </InfoItem>
                    <InfoItem>
                      Min Bet: <span>${table.minBet}</span>
                    </InfoItem>
                  </TableInfo>
                  
                  <Button 
                    fullWidth
                    disabled={table.status === 'full'}
                  >
                    Join Table
                  </Button>
                </TableCard>
              ))}
            </Grid>
          </>
        )}
        
        {activeTab === 'history' && (
          <>
            <h2>Game History</h2>
            <Card>
              <HistoryTable>
                <TableHead>
                  <TableRow>
                    <TableHeader2>Date</TableHeader2>
                    <TableHeader2>Table</TableHeader2>
                    <TableHeader2>Bet</TableHeader2>
                    <TableHeader2>Your Number</TableHeader2>
                    <TableHeader2>Result</TableHeader2>
                    <TableHeader2>Winnings</TableHeader2>
                  </TableRow>
                </TableHead>
                <tbody>
                  {mockHistory.map(game => (
                    <TableRow key={game.id}>
                      <TableCell>{game.date}</TableCell>
                      <TableCell>{game.table}</TableCell>
                      <TableCell>${game.bet}</TableCell>
                      <TableCell>{game.number}</TableCell>
                      <TableCell>{game.result}</TableCell>
                      <TableCell>
                        <WinAmount positive={game.winnings > 0}>
                          {game.winnings > 0 ? (
                            <>
                              <FaArrowUp /> +${game.winnings}
                            </>
                          ) : (
                            <>
                              <FaArrowDown /> ${game.winnings}
                            </>
                          )}
                        </WinAmount>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </HistoryTable>
            </Card>
          </>
        )}
        
        {activeTab === 'leaderboard' && (
          <>
            <h2>Global Leaderboard</h2>
            <Card>
              {mockLeaderboard.map(player => (
                <LeaderboardItem key={player.rank}>
                  <RankBadge rank={player.rank}>{player.rank}</RankBadge>
                  <PlayerInfo>
                    <PlayerName>{player.name}</PlayerName>
                    <PlayerStats>{player.games} games played</PlayerStats>
                  </PlayerInfo>
                  <WinningsAmount>${player.winnings.toLocaleString()}</WinningsAmount>
                </LeaderboardItem>
              ))}
            </Card>
          </>
        )}
        
        {activeTab === 'wallet' && (
          <>
            <h2>Your Wallet</h2>
            <Card>
              <WalletSection>
                <h3>Current Balance</h3>
                <WalletBalance>$1,250.00</WalletBalance>
                <WalletActions>
                  <Button>Deposit</Button>
                  <Button variant="outline">Withdraw</Button>
                </WalletActions>
              </WalletSection>
              
              <TransactionHistory>
                <h3>Transaction History</h3>
                <HistoryTable>
                  <TableHead>
                    <TableRow>
                      <TableHeader2>Date</TableHeader2>
                      <TableHeader2>Type</TableHeader2>
                      <TableHeader2>Amount</TableHeader2>
                      <TableHeader2>Status</TableHeader2>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    <TableRow>
                      <TableCell>2023-04-30 10:23</TableCell>
                      <TableCell>Deposit</TableCell>
                      <TableCell>
                        <WinAmount positive={true}>
                          <FaArrowUp /> +$500.00
                        </WinAmount>
                      </TableCell>
                      <TableCell>Completed</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2023-04-25 15:47</TableCell>
                      <TableCell>Withdrawal</TableCell>
                      <TableCell>
                        <WinAmount positive={false}>
                          <FaArrowDown /> -$200.00
                        </WinAmount>
                      </TableCell>
                      <TableCell>Completed</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2023-04-20 09:12</TableCell>
                      <TableCell>Deposit</TableCell>
                      <TableCell>
                        <WinAmount positive={true}>
                          <FaArrowUp /> +$300.00
                        </WinAmount>
                      </TableCell>
                      <TableCell>Completed</TableCell>
                    </TableRow>
                  </tbody>
                </HistoryTable>
              </TransactionHistory>
            </Card>
          </>
        )}
        
        {activeTab === 'profile' && (
          <>
            <h2>Your Profile</h2>
            <Card>
              <ProfileForm>
                <FormRow>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" fullWidth />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="Player123" fullWidth />
                  </div>
                </FormRow>
                
                <FormRow>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="john.doe@example.com" fullWidth />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" fullWidth />
                  </div>
                </FormRow>
                
                <FormRow>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" defaultValue="United States" fullWidth />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" fullWidth />
                  </div>
                </FormRow>
                
                <Button style={{ justifySelf: 'start', marginTop: '1rem' }}>
                  Save Changes
                </Button>
              </ProfileForm>
            </Card>
          </>
        )}
        
        {activeTab === 'settings' && (
          <>
            <h2>Account Settings</h2>
            <Card>
              <h3>Notifications</h3>
              <p>Configure your notification preferences</p>
              {/* Notification settings would go here */}
              
              <h3 style={{ marginTop: '2rem' }}>Security</h3>
              <p>Manage your account security settings</p>
              <Button variant="outline" style={{ marginTop: '1rem' }}>
                Change Password
              </Button>
              
              <h3 style={{ marginTop: '2rem' }}>Privacy</h3>
              <p>Control your privacy settings</p>
              {/* Privacy settings would go here */}
            </Card>
          </>
        )}
      </Container>
    </DashboardContainer>
  );
};

// Add missing Label component
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
`;

export default DashboardPage;
