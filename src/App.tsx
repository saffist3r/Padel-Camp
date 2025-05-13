import { useState } from 'react'
import { TournamentState, TournamentCategory } from './types/tournament'
import GroupPhase from './components/GroupPhase'
import TournamentTree from './components/TournamentTree'
import Header from './components/Header'
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState<TournamentCategory>('men')
  const categories: TournamentCategory[] = ['men', 'women', 'mixed']

  // Helper function to create a group
  const createGroup = (id: string, teams: any[]) => ({
    id,
    name: id,
    teams,
    matches: []
  });

  // Helper function to create a team
  const createTeam = (id: string, player1: any, player2: any) => ({
    id,
    player1,
    player2
  });

  // Helper function to create a player
  const createPlayer = (id: string, name: string, skill_level: number) => ({
    id,
    name,
    skill_level
  });

  // Helper function to create elimination matches
  const createEliminationMatches = (groups: any[]) => {
    const matches = [];
    const winners: any = {};
    
    interface Match {
      id: string;
      round: string;
      team1: any;
      team2: any;
      score: string;
      winner: string;
    }

    type RoundType = 'Round of 16' | 'Quarter Finals' | 'Semi Finals' | 'Finals';
    const roundOrder: Record<RoundType, number> = {
      'Round of 16': 1,
      'Quarter Finals': 2,
      'Semi Finals': 3,
      'Finals': 4
    };

    // Round of 16 (8 matches) - Top 2 teams from each group
    for (let i = 0; i < 8; i++) {
      const group = groups[i];
      matches.push({
        id: `r16-${i + 1}`,
        round: 'Round of 16',
        team1: group.teams[0], // First place team
        team2: group.teams[1], // Second place team
        score: '6-4 6-2',
        winner: group.teams[0].id
      });
    }

    // Quarter Finals (4 matches) - Winners from Round of 16
    for (let i = 0; i < 4; i++) {
      const match: Match = {
        id: `qf-${i + 1}`,
        round: 'Quarter Finals',
        team1: matches[i * 2].winner === matches[i * 2].team1.id ? matches[i * 2].team1 : matches[i * 2].team2,
        team2: matches[i * 2 + 1].winner === matches[i * 2 + 1].team1.id ? matches[i * 2 + 1].team1 : matches[i * 2 + 1].team2,
        score: '7-5 6-3',
        winner: matches[i * 2].winner === matches[i * 2].team1.id ? matches[i * 2].team1.id : matches[i * 2].team2.id
      };
      winners[match.id] = match.team1;
      matches.push(match);
    }

    // Semi Finals (2 matches) - Winners from Quarter Finals
    for (let i = 0; i < 2; i++) {
      const match: Match = {
        id: `sf-${i + 1}`,
        round: 'Semi Finals',
        team1: matches[8 + i * 2].winner === matches[8 + i * 2].team1.id ? matches[8 + i * 2].team1 : matches[8 + i * 2].team2,
        team2: matches[8 + i * 2 + 1].winner === matches[8 + i * 2 + 1].team1.id ? matches[8 + i * 2 + 1].team1 : matches[8 + i * 2 + 1].team2,
        score: '6-4 4-6 7-6',
        winner: matches[8 + i * 2].winner === matches[8 + i * 2].team1.id ? matches[8 + i * 2].team1.id : matches[8 + i * 2].team2.id
      };
      winners[match.id] = match.team1;
      matches.push(match);
    }

    // Finals (1 match) - Winners from Semi Finals
    const finalMatch: Match = {
      id: 'final-1',
      round: 'Finals',
      team1: matches[12].winner === matches[12].team1.id ? matches[12].team1 : matches[12].team2,
      team2: matches[13].winner === matches[13].team1.id ? matches[13].team1 : matches[13].team2,
      score: '6-4 4-6 7-6',
      winner: matches[12].winner === matches[12].team1.id ? matches[12].team1.id : matches[12].team2.id
    };
    winners[finalMatch.id] = finalMatch.team1;
    matches.push(finalMatch);

    // Sort matches by round order
    return matches.sort((a, b) => roundOrder[a.round as RoundType] - roundOrder[b.round as RoundType]);
  };

  // Create men's groups
  const menGroups = [
    createGroup('Group A', [
      createTeam('team-1', createPlayer('1', 'John', 4), createPlayer('2', 'Mike', 3)),
      createTeam('team-2', createPlayer('3', 'Alex', 3), createPlayer('4', 'David', 4)),
      createTeam('team-3', createPlayer('5', 'Tom', 4), createPlayer('6', 'Sam', 4)),
      createTeam('team-4', createPlayer('7', 'Peter', 3), createPlayer('8', 'James', 3))
    ]),
    createGroup('Group B', [
      createTeam('team-5', createPlayer('9', 'Sarah', 4), createPlayer('10', 'Emma', 4)),
      createTeam('team-6', createPlayer('11', 'Lisa', 3), createPlayer('12', 'Anna', 3)),
      createTeam('team-7', createPlayer('13', 'Kate', 4), createPlayer('14', 'Mary', 3)),
      createTeam('team-8', createPlayer('15', 'Lucy', 3), createPlayer('16', 'Jane', 4))
    ]),
    createGroup('Group C', [
      createTeam('team-9', createPlayer('17', 'Mark', 4), createPlayer('18', 'Paul', 3)),
      createTeam('team-10', createPlayer('19', 'Luke', 3), createPlayer('20', 'John', 4)),
      createTeam('team-11', createPlayer('21', 'Peter', 4), createPlayer('22', 'James', 4)),
      createTeam('team-12', createPlayer('23', 'Andrew', 3), createPlayer('24', 'Philip', 3))
    ]),
    createGroup('Group D', [
      createTeam('team-13', createPlayer('25', 'Bartholomew', 4), createPlayer('26', 'Thomas', 4)),
      createTeam('team-14', createPlayer('27', 'Matthew', 3), createPlayer('28', 'James', 3)),
      createTeam('team-15', createPlayer('29', 'Simon', 4), createPlayer('30', 'Judas', 3)),
      createTeam('team-16', createPlayer('31', 'Thaddeus', 3), createPlayer('32', 'Matthias', 4))
    ]),
    createGroup('Group E', [
      createTeam('team-17', createPlayer('33', 'Adam', 4), createPlayer('34', 'Eve', 3)),
      createTeam('team-18', createPlayer('35', 'Noah', 3), createPlayer('36', 'Shem', 4)),
      createTeam('team-19', createPlayer('37', 'Abraham', 4), createPlayer('38', 'Isaac', 4)),
      createTeam('team-20', createPlayer('39', 'Jacob', 3), createPlayer('40', 'Joseph', 3))
    ]),
    createGroup('Group F', [
      createTeam('team-21', createPlayer('41', 'Moses', 4), createPlayer('42', 'Aaron', 4)),
      createTeam('team-22', createPlayer('43', 'Joshua', 3), createPlayer('44', 'Caleb', 3)),
      createTeam('team-23', createPlayer('45', 'David', 4), createPlayer('46', 'Solomon', 3)),
      createPlayer('47', 'Elijah', 3),
      createPlayer('48', 'Elisha', 4)
    ]),
    createGroup('Group G', [
      createTeam('team-24', createPlayer('49', 'Isaiah', 4), createPlayer('50', 'Jeremiah', 3)),
      createTeam('team-25', createPlayer('51', 'Ezekiel', 3), createPlayer('52', 'Daniel', 4)),
      createTeam('team-26', createPlayer('53', 'Hosea', 4), createPlayer('54', 'Joel', 4)),
      createTeam('team-27', createPlayer('55', 'Amos', 3), createPlayer('56', 'Obadiah', 3))
    ]),
    createGroup('Group H', [
      createTeam('team-28', createPlayer('57', 'Jonah', 4), createPlayer('58', 'Micah', 4)),
      createTeam('team-29', createPlayer('59', 'Nahum', 3), createPlayer('60', 'Habakkuk', 3)),
      createTeam('team-30', createPlayer('61', 'Zephaniah', 4), createPlayer('62', 'Haggai', 3)),
      createTeam('team-31', createPlayer('63', 'Zechariah', 3), createPlayer('64', 'Malachi', 4))
    ])
  ];

  // Create women's groups
  const womenGroups = [
    createGroup('Group A', [
      createTeam('team-1', createPlayer('1', 'Emma', 4), createPlayer('2', 'Sarah', 4)),
      createTeam('team-2', createPlayer('3', 'Anna', 3), createPlayer('4', 'Lisa', 3)),
      createTeam('team-3', createPlayer('5', 'Mary', 4), createPlayer('6', 'Kate', 3)),
      createTeam('team-4', createPlayer('7', 'Jane', 3), createPlayer('8', 'Lucy', 4))
    ]),
    ...Array.from({ length: 7 }, (_, i) => 
      createGroup(`Group ${String.fromCharCode(66 + i)}`, [
        createTeam(`team-${i * 4 + 5}`, createPlayer(`${i * 8 + 9}`, `Player${i * 8 + 9}`, 4), createPlayer(`${i * 8 + 10}`, `Player${i * 8 + 10}`, 4)),
        createTeam(`team-${i * 4 + 6}`, createPlayer(`${i * 8 + 11}`, `Player${i * 8 + 11}`, 3), createPlayer(`${i * 8 + 12}`, `Player${i * 8 + 12}`, 3)),
        createTeam(`team-${i * 4 + 7}`, createPlayer(`${i * 8 + 13}`, `Player${i * 8 + 13}`, 4), createPlayer(`${i * 8 + 14}`, `Player${i * 8 + 14}`, 3)),
        createTeam(`team-${i * 4 + 8}`, createPlayer(`${i * 8 + 15}`, `Player${i * 8 + 15}`, 3), createPlayer(`${i * 8 + 16}`, `Player${i * 8 + 16}`, 4))
      ])
    )
  ];

  // Create mixed groups
  const mixedGroups = [
    createGroup('Group A', [
      createTeam('team-1', createPlayer('1', 'John', 4), createPlayer('2', 'Emma', 4)),
      createTeam('team-2', createPlayer('3', 'Alex', 3), createPlayer('4', 'Sarah', 4)),
      createTeam('team-3', createPlayer('5', 'Tom', 4), createPlayer('6', 'Mary', 3)),
      createTeam('team-4', createPlayer('7', 'Peter', 3), createPlayer('8', 'Kate', 4))
    ]),
    ...Array.from({ length: 7 }, (_, i) => 
      createGroup(`Group ${String.fromCharCode(66 + i)}`, [
        createTeam(`team-${i * 4 + 5}`, createPlayer(`${i * 8 + 9}`, `Player${i * 8 + 9}`, 4), createPlayer(`${i * 8 + 10}`, `Player${i * 8 + 10}`, 4)),
        createTeam(`team-${i * 4 + 6}`, createPlayer(`${i * 8 + 11}`, `Player${i * 8 + 11}`, 3), createPlayer(`${i * 8 + 12}`, `Player${i * 8 + 12}`, 3)),
        createTeam(`team-${i * 4 + 7}`, createPlayer(`${i * 8 + 13}`, `Player${i * 8 + 13}`, 4), createPlayer(`${i * 8 + 14}`, `Player${i * 8 + 14}`, 3)),
        createTeam(`team-${i * 4 + 8}`, createPlayer(`${i * 8 + 15}`, `Player${i * 8 + 15}`, 3), createPlayer(`${i * 8 + 16}`, `Player${i * 8 + 16}`, 4))
      ])
    )
  ];

  // Sample tournament data
  const tournamentData: TournamentState = {
    men: {
      category: 'men',
      groups: menGroups,
      eliminationMatches: createEliminationMatches(menGroups)
    },
    women: {
      category: 'women',
      groups: womenGroups,
      eliminationMatches: createEliminationMatches(womenGroups)
    },
    mixed: {
      category: 'mixed',
      groups: mixedGroups,
      eliminationMatches: createEliminationMatches(mixedGroups)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Category Tabs */}
          <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
            <nav className="flex divide-x divide-gray-200">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    flex-1 py-2.5 px-6 text-center font-medium text-sm
                    ${
                      activeCategory === category
                        ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)} Tournament
                </button>
              ))}
            </nav>
          </div>

          {/* Active Category Content */}
          <div className="space-y-6">
            <div className="bg-white rounded shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Group Phase
                </h2>
              </div>
              <div className="p-4">
                <GroupPhase groups={tournamentData[activeCategory].groups} />
              </div>
            </div>
            
            <div className="bg-white rounded shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Tournament Bracket
                </h2>
              </div>
              <div className="p-4">
                <TournamentTree matches={tournamentData[activeCategory].eliminationMatches} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
