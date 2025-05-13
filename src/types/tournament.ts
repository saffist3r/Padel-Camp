export interface Player {
  id: string;
  name: string;
  skill_level: number;
}

export interface Team {
  id: string;
  player1: Player;
  player2: Player;
}

export interface GroupMatch {
  id: string;
  team1: Team;
  team2: Team;
  score?: string;
  winner?: string;
}

export interface Group {
  id: string;
  name: string;
  teams: Team[];
  matches: GroupMatch[];
}

export interface EliminationMatch {
  id: string;
  round: string;
  team1?: Team;
  team2?: Team;
  score?: string;
  winner?: string;
  nextMatchId?: string | null;
  nextMatch?: EliminationMatch | null;
}

export type TournamentCategory = 'men' | 'women' | 'mixed';

export interface TournamentData {
  category: TournamentCategory;
  groups: Group[];
  eliminationMatches: EliminationMatch[];
}

export interface TournamentState {
  men: TournamentData;
  women: TournamentData;
  mixed: TournamentData;
} 