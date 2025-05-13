import React from 'react';
import { Team } from '../types/tournament';

interface StandingsTableProps {
  teams: Team[];
  formatTeamName: (team: Team) => string;
}

const StandingsTable: React.FC<StandingsTableProps> = ({ teams, formatTeamName }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-2 border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-300">Team</th>
            <th className="text-center py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-300">P</th>
            <th className="text-center py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-300">W</th>
            <th className="text-center py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-300">L</th>
            <th className="text-center py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-300">Sets</th>
            <th className="text-center py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-300">Games</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr 
              key={team.id} 
              className={`hover:bg-blue-50 transition-colors border-b border-gray-300 ${
                index === 0 ? 'bg-green-100' : 
                index === 1 ? 'bg-blue-100' : 
                'bg-white'
              }`}
            >
              <td className="py-3 px-4 text-sm font-semibold text-gray-900 truncate max-w-[150px] border-r border-gray-300">
                {formatTeamName(team)}
              </td>
              <td className="text-center py-3 px-4 text-sm font-bold text-gray-700 border-r border-gray-300">0</td>
              <td className="text-center py-3 px-4 text-sm font-bold text-gray-700 border-r border-gray-300">0</td>
              <td className="text-center py-3 px-4 text-sm font-bold text-gray-700 border-r border-gray-300">0</td>
              <td className="text-center py-3 px-4 text-sm font-bold text-gray-700 border-r border-gray-300">0-0</td>
              <td className="text-center py-3 px-4 text-sm font-bold text-gray-700">0-0</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable; 