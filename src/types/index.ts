export interface Player {
  id: number;
  name: string;
  avatar?: string;
  selectedNumber?: number | null;
}

export interface GameTable {
  id: number;
  name: string;
  players: number;
  maxPlayers: number;
  minBet: number;
  status: 'active' | 'full' | 'closed';
}

export interface GameHistory {
  id: number;
  date: string;
  table: string;
  bet: number;
  number: number;
  result: number;
  winnings: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  winnings: number;
  games: number;
}

export interface Transaction {
  id: number;
  date: string;
  type: 'deposit' | 'withdrawal' | 'win' | 'loss';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  balance: number;
  wins: number;
  gamesPlayed: number;
  winRate: number;
}
