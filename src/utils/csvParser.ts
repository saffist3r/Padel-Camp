import Papa from 'papaparse';
import { TournamentState, TournamentCategory, Group, Team, Player, GroupMatch, EliminationMatch } from '../types/tournament';

export const parseTournamentData = async (file: File): Promise<TournamentState> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        try {
          const data = results.data as string[][];
          const tournamentState: TournamentState = {
            men: { category: 'men', groups: [], eliminationMatches: [] },
            women: { category: 'women', groups: [], eliminationMatches: [] },
            mixed: { category: 'mixed', groups: [], eliminationMatches: [] }
          };

          let currentCategory: TournamentCategory = 'men';
          let currentSection = '';
          let currentGroup: Group | null = null;
          let groupCounter = 0;
          let teamCounter = 0;

          // Helper function to create a player
          const createPlayer = (name: string, skillLevel: number): Player => {
            const id = `player-${name.toLowerCase().replace(/\s+/g, '-')}`;
            return {
              id,
              name,
              skill_level: skillLevel
            };
          };

          // Helper function to create a team
          const createTeam = (player1Name: string, player2Name: string, player1Skill: number, player2Skill: number): Team => {
            const id = `team-${++teamCounter}`;
            return {
              id,
              player1: createPlayer(player1Name, player1Skill),
              player2: createPlayer(player2Name, player2Skill)
            };
          };

          for (const row of data) {
            // Skip empty rows
            if (!row[0]) continue;

            // Check for category headers
            if (row[0].toLowerCase().includes('men')) {
              currentCategory = 'men';
              groupCounter = 0;
              teamCounter = 0;
              continue;
            }
            if (row[0].toLowerCase().includes('women')) {
              currentCategory = 'women';
              groupCounter = 0;
              teamCounter = 0;
              continue;
            }
            if (row[0].toLowerCase().includes('mixed')) {
              currentCategory = 'mixed';
              groupCounter = 0;
              teamCounter = 0;
              continue;
            }

            // Check for section headers
            if (row[0].toLowerCase().includes('group')) {
              currentSection = 'group';
              currentGroup = {
                id: `group-${String.fromCharCode(65 + groupCounter++)}`,
                name: row[0],
                teams: [],
                matches: []
              };
              tournamentState[currentCategory].groups.push(currentGroup);
              continue;
            }

            if (row[0].toLowerCase().includes('elimination')) {
              currentSection = 'elimination';
              continue;
            }

            // Parse group data
            if (currentSection === 'group' && currentGroup && row.length >= 4) {
              const [player1Name, player2Name, player1Skill, player2Skill] = row;
              const team = createTeam(
                player1Name,
                player2Name,
                parseInt(player1Skill) || 0,
                parseInt(player2Skill) || 0
              );
              currentGroup.teams.push(team);
            }

            // Parse elimination match data
            if (currentSection === 'elimination' && row.length >= 5) {
              const [round, team1Data, team2Data, score, winner] = row;
              
              // Parse team data
              const parseTeam = (teamData: string) => {
                if (!teamData) return null;
                const [player1Name, player2Name] = teamData.split('/');
                return createTeam(player1Name, player2Name, 0, 0);
              };

              const match: EliminationMatch = {
                id: `elim-${round}-${tournamentState[currentCategory].eliminationMatches.length + 1}`,
                round,
                team1: parseTeam(team1Data),
                team2: parseTeam(team2Data),
                score: score || undefined,
                winner: winner || undefined
              };
              tournamentState[currentCategory].eliminationMatches.push(match);
            }
          }

          // Generate group matches for each category
          Object.values(tournamentState).forEach(tournament => {
            tournament.groups.forEach(group => {
              const teams = group.teams;
              for (let i = 0; i < teams.length; i++) {
                for (let j = i + 1; j < teams.length; j++) {
                  const match: GroupMatch = {
                    id: `match-${group.id}-${i}-${j}`,
                    team1: teams[i],
                    team2: teams[j],
                    score: undefined,
                    winner: undefined
                  };
                  group.matches.push(match);
                }
              }
            });
          });

          resolve(tournamentState);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => reject(error)
    });
  });
}; 