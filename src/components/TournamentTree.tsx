import React from 'react';
import { EliminationMatch } from '../types/tournament';
import { translations } from '../translations';
import styles from './TournamentBracket.module.css';

interface TournamentTreeProps {
  matches: EliminationMatch[];
  language?: 'en' | 'fr';
}

const TournamentTree: React.FC<TournamentTreeProps> = ({ matches, language = 'fr' }) => {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const roundOrder: Record<string, number> = {
    [t('tournament.rounds.roundOf16')]: 1,
    [t('tournament.rounds.quarterFinals')]: 2,
    [t('tournament.rounds.semiFinals')]: 3,
    [t('tournament.rounds.finals')]: 4
  };

  const formatTeamName = (team: any) => {
    if (!team || !team.player1 || !team.player2) return t('tournament.match.tbd');
    return `${team.player1.name || t('tournament.match.tbd')}/${team.player2.name || t('tournament.match.tbd')}`;
  };

  // Filter out matches with no teams
  const validMatches = matches.filter(match => match.team1 || match.team2);

  // Get unique rounds from actual matches
  const rounds = Array.from(new Set(validMatches.map(match => match.round)))
    .sort((a, b) => {
      const orderA = roundOrder[a] || 0;
      const orderB = roundOrder[b] || 0;
      return orderA - orderB;
    });

  // Group matches by round
  const matchesByRound = rounds.reduce((acc, round) => {
    acc[round] = validMatches.filter(match => match.round === round);
    return acc;
  }, {} as Record<string, EliminationMatch[]>);

  // Constants for layout
  const MATCH_WIDTH = 200;
  const MATCH_HEIGHT = 50;
  const ROUND_SPACING = 250;
  const MATCH_SPACING = 100;

  // Calculate positions for each match
  const getMatchPositions = () => {
    const positions: Record<string, { x: number; y: number }> = {};
    const firstRoundMatches = matchesByRound[rounds[0]].length;

    rounds.forEach((round, roundIndex) => {
      const roundMatches = matchesByRound[round];
      const spacing = MATCH_SPACING * Math.pow(2, roundIndex);
      const totalHeight = spacing * (roundMatches.length - 1);
      const startY = (firstRoundMatches * MATCH_SPACING - totalHeight) / 2;

      roundMatches.forEach((match, matchIndex) => {
        positions[match.id] = {
          x: roundIndex * ROUND_SPACING,
          y: startY + (matchIndex * spacing)
        };
      });
    });

    return positions;
  };

  const matchPositions = getMatchPositions();

  return (
    <div className={styles.bracket}>
      {rounds.map((round, roundIndex) => (
        <div 
          key={round} 
          className={styles.round}
          style={{ marginLeft: roundIndex === 0 ? 0 : '20px' }}
        >
          <div className={styles.roundTitle}>{round}</div>
          <div className={styles.matchesContainer}>
            {matchesByRound[round].map((match) => {
              const position = matchPositions[match.id];
              return (
                <div
                  key={match.id}
                  className={styles.match}
                  style={{
                    transform: `translateY(${position.y}px)`
                  }}
                >
                  <div className={`${styles.team} ${match.winner === match.team1?.id ? styles.winner : ''}`}>
                    <span>{formatTeamName(match.team1)}</span>
                    {match.score && <span className={styles.score}>{match.score.split(' ')[0]}</span>}
                  </div>
                  <div className={`${styles.team} ${match.winner === match.team2?.id ? styles.winner : ''}`}>
                    <span>{formatTeamName(match.team2)}</span>
                    {match.score && <span className={styles.score}>{match.score.split(' ')[1]}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TournamentTree; 