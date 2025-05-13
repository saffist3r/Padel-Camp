import React from 'react';
import { Group } from '../types/tournament';
import { translations } from '../translations';
import styles from './GroupPhase.module.css';

interface GroupPhaseProps {
  groups: Group[];
  language?: 'en' | 'fr';
}

const GroupPhase: React.FC<GroupPhaseProps> = ({ groups, language = 'fr' }) => {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const formatTeamName = (team: any) => {
    if (!team || !team.player1 || !team.player2) return 'TBD';
    return `${team.player1.name || 'TBD'}/${team.player2.name || 'TBD'}`;
  };

  const renderGroup = (group: Group) => (
    <div key={group.id} className={styles.groupCard}>
      <div className={styles.groupHeader}>
        <h3 className={styles.groupTitle}>
          {group.name}
        </h3>
      </div>
      
      {/* Standings */}
      <div className={styles.standingsContainer}>
        <table className={styles.standingsTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableHeaderCell}>Team</th>
              <th className={styles.tableHeaderCellCenter}>P</th>
              <th className={styles.tableHeaderCellCenter}>W</th>
              <th className={styles.tableHeaderCellCenter}>L</th>
              <th className={styles.tableHeaderCellCenter}>Sets</th>
              <th className={styles.tableHeaderCellCenter}>Games</th>
            </tr>
          </thead>
          <tbody>
            {group.teams.map((team, index) => (
              <tr 
                key={team.id} 
                className={`${styles.tableRow} ${
                  index === 0 ? styles.tableRowFirst : 
                  index === 1 ? styles.tableRowSecond : 
                  ''
                }`}
              >
                <td className={styles.tableCell}>
                  {formatTeamName(team)}
                </td>
                <td className={styles.tableCellCenter}>0</td>
                <td className={styles.tableCellCenter}>0</td>
                <td className={styles.tableCellCenter}>0</td>
                <td className={styles.tableCellCenter}>0-0</td>
                <td className={styles.tableCellCenter}>0-0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Matches */}
      <div className={styles.matchesContainer}>
        <div>
          {group.matches.map((match) => (
            <div 
              key={match.id} 
              className={styles.matchItem}
            >
              <span className={styles.teamName}>{formatTeamName(match.team1)}</span>
              <span className={styles.score}>
                {match.score || 'vs'}
              </span>
              <span className={styles.teamName}>{formatTeamName(match.team2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.groupsContainer}>
        {groups.map(renderGroup)}
      </div>
    </div>
  );
};

export default GroupPhase; 