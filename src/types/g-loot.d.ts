declare module '@g-loot/react-tournament-brackets' {
  import { ReactNode } from 'react';

  export interface Match {
    id: string;
    name: string;
    nextMatchId: string | null;
    tournamentRound: string;
    startTime: string | null;
    state: 'SCHEDULED' | 'PLAYED' | 'DONE' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY';
    participants: {
      id: string;
      resultText: string | null;
      isWinner: boolean;
      status: 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null;
      name: string;
    }[];
  }

  export interface MatchComponentProps {
    match: Match;
    onMatchClick?: (match: Match) => void;
    onPartyClick?: (party: Match['participants'][0], match: Match) => void;
    onMouseEnter?: (partyId: string) => void;
    onMouseLeave?: () => void;
    topParty: Match['participants'][0];
    bottomParty: Match['participants'][0];
    topWon: boolean;
    bottomWon: boolean;
    topHovered: boolean;
    bottomHovered: boolean;
    topText: string;
    bottomText: string;
    connectorColor: string;
    computedStyles: any;
    teamNameFallback: string;
    resultFallback: (party: Match['participants'][0]) => string;
  }

  export interface SVGViewerProps {
    children: ReactNode;
    background: string;
    SVGBackground: string;
    width: number;
    height: number;
    [key: string]: any;
  }

  export const SingleEliminationBracket: React.FC<{
    matches: Match[];
    matchComponent: React.FC<MatchComponentProps>;
    options?: {
      style?: {
        roundHeader?: {
          backgroundColor?: string;
          fontColor?: string;
        };
        connectorColor?: string;
        connectorColorHighlight?: string;
      };
    };
    svgWrapper?: React.FC<SVGViewerProps>;
  }>;

  export const Match: React.FC<MatchComponentProps>;
  export const SVGViewer: React.FC<SVGViewerProps>;
} 