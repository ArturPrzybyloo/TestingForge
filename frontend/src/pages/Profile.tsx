import React from 'react';
import { getTesterPoints, getTesterProgress } from '../utils/testerProgress';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const challenges = [
  { id: 1, name: 'Disabled Button' },
  { id: 2, name: 'Console Flag' },
  { id: 3, name: 'Edge Case Form' },
  { id: 4, name: 'Sequence Clicks' },
  { id: 5, name: 'Hidden Checkbox' },
  { id: 6, name: 'Attribute Flag' },
];

const Profile: React.FC = () => {
  const points = getTesterPoints();
  const progress = getTesterProgress();
  const totalChallenges = challenges.length;
  const completedChallenges = progress.done.length;

  return (
    <div className="min-h-screen bg-black text-white font-mono px-2 py-8">
      {/* Summary Section */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-[#181c1b] border border-[#222] rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-lg text-[#00FF66] font-bold">Punkty</div>
            <div className="text-3xl font-bold text-white">{points}</div>
          </div>
          <div>
            <div className="text-lg text-[#00FF66] font-bold">Misje ukończone</div>
            <div className="text-3xl font-bold text-white">{completedChallenges} / {totalChallenges}</div>
          </div>
        </div>
      </div>

      {/* Challenge Status Grid */}
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {challenges.map((ch) => {
            const isDone = progress.done.includes(ch.id);
            return (
              <div
                key={ch.id}
                className={`flex flex-col items-center justify-center aspect-square rounded-xl border border-[#222] text-center
                  ${isDone ? 'bg-[#00FF66] text-black border-[#00FF66]' : 'bg-[#181c1b] text-white'}`}
              >
                <div className="text-lg font-bold mb-1">{ch.name}</div>
                <div className="text-xs opacity-60 mb-2">{isDone ? 'Ukończone' : 'Nieukończone'}</div>
                {isDone ? (
                  <CheckCircleIcon className="w-8 h-8 text-black" />
                ) : (
                  <XMarkIcon className="w-8 h-8 text-[#444]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile; 