import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrophyIcon, AcademicCapIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const TOTAL_CHALLENGES = 12; // Updated to reflect the new number of challenges
const TOTAL_COURSES = 0; // Placeholder for future

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
    const ids = Object.keys(done).filter((k) => done[k]);
    setCompletedChallenges(ids.length);
    setRecent(ids.slice(-3).reverse());
  }, []);

  const progress = Math.round((completedChallenges / TOTAL_CHALLENGES) * 100);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* Welcome */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text mb-2">
          {t('Welcome to your dashboard, Tester!')}
        </h1>
        <p className="text-gray-400">{t('Here is a summary of your progress on Testing Forge')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
          <TrophyIcon className="h-10 w-10 text-green-400 mb-2" />
          <div className="text-2xl font-bold">{completedChallenges}</div>
          <div className="text-gray-400">{t('Completed challenges')}</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
          <AcademicCapIcon className="h-10 w-10 text-blue-400 mb-2" />
          <div className="text-2xl font-bold">{TOTAL_COURSES}</div>
          <div className="text-gray-400">{t('Completed courses')}</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
          <Squares2X2Icon className="h-10 w-10 text-green-400 mb-2" />
          <div className="text-2xl font-bold">{progress}%</div>
          <div className="text-gray-400">{t('Progress')}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>0</span>
          <span>{TOTAL_CHALLENGES}</span>
        </div>
        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Recent Challenges */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">{t('Recently completed challenges')}</h2>
        {recent.length === 0 ? (
          <div className="text-gray-400">{t('No completed challenges yet.')}</div>
        ) : (
          <ul className="space-y-2">
            {recent.map((id) => (
              <li key={id} className="bg-gray-700 rounded p-3 flex items-center">
                <TrophyIcon className="h-5 w-5 text-green-400 mr-2" />
                <span>{t('Challenge')} #{id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Links */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Link
          to="/challenges"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors"
        >
          {t('Browse challenges')}
        </Link>
        <Link
          to="/learn"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors"
        >
          {t('Browse courses')}
        </Link>
      </div>
    </div>
  );
};

export default Dashboard; 