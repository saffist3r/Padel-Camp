import React from 'react';
import { EliminationMatch } from '../types/tournament';

interface EliminationPhaseProps {
  matches: EliminationMatch[];
}

const EliminationPhase: React.FC<EliminationPhaseProps> = ({ matches }) => {
  const rounds = Array.from(new Set(matches.map(match => match.round))).sort();

  return (
    <div className="w-full mt-12">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">Elimination Phase</h2>
      <div className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-4">
        {rounds.map((round) => (
          <div key={round} className="flex-shrink-0 w-full md:w-80">
            <div className="tournament-card">
              <h3 className="text-xl font-semibold mb-6 text-gray-700 pb-2 border-b">{round}</h3>
              <div className="space-y-4">
                {matches
                  .filter((match) => match.round === round)
                  .map((match) => (
                    <div
                      key={match.id}
                      className="relative p-4 space-y-2 border border-gray-100 rounded-lg hover:border-blue-200 transition-colors"
                    >
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="team-name flex-grow">
                          {match.team1
                            ? `${match.team1.player1.name}/${match.team1.player2.name}`
                            : 'TBD'}
                        </span>
                        {match.winner === match.team1?.id && (
                          <span className="winner-indicator ml-2">●</span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <span className="score px-4 py-1 bg-blue-50 rounded-full">
                          {match.score || 'vs'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="team-name flex-grow">
                          {match.team2
                            ? `${match.team2.player1.name}/${match.team2.player2.name}`
                            : 'TBD'}
                        </span>
                        {match.winner === match.team2?.id && (
                          <span className="winner-indicator ml-2">●</span>
                        )}
                      </div>

                      {/* Connecting lines for the bracket visualization */}
                      <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 h-full">
                        <div className="h-1/2 border-t-2 border-r-2 border-gray-200 rounded-tr"></div>
                        <div className="h-1/2 border-b-2 border-r-2 border-gray-200 rounded-br"></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EliminationPhase; 