import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrophyIcon, AcademicCapIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

interface Challenge {
  _id: string;
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  points: number;
  isActive: boolean;
}

interface UserStats {
  completedChallenges: string[];
  points: number;
  level: number;
}

const TOTAL_COURSES = 0; // Placeholder for future

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({ completedChallenges: [], points: 0, level: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch challenges and user data in parallel
        const [challengesResponse, profileResponse] = await Promise.all([
          api.get('/challenges'),
          api.get('/auth/profile')
        ]);

        if (challengesResponse.data && challengesResponse.data.data) {
          setChallenges(challengesResponse.data.data);
        }

        if (profileResponse.data) {
          const user = profileResponse.data;
          setUserStats({
            completedChallenges: user.completedChallenges || [],
            points: user.points || 0,
            level: user.level || 1
          });
        }
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const completedCount = userStats.completedChallenges.length;
  const totalChallenges = challenges.filter(c => c.isActive).length;
  const progress = totalChallenges > 0 ? Math.round((completedCount / totalChallenges) * 100) : 0;

  // Get recently completed challenges with their titles
  const recentChallenges = userStats.completedChallenges
    .slice(-3)
    .reverse()
    .map(challengeId => {
      const challenge = challenges.find(c => c.id === challengeId);
      return challenge ? { id: challengeId, title: challenge.title } : { id: challengeId, title: `Challenge #${challengeId}` };
    });

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="text-center py-20">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
          <div className="text-2xl font-bold">{completedCount}</div>
          <div className="text-gray-400">{t('Completed challenges')}</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
          <AcademicCapIcon className="h-10 w-10 text-blue-400 mb-2" />
          <div className="text-2xl font-bold">{userStats.points}</div>
          <div className="text-gray-400">Points Earned</div>
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
          <span>{totalChallenges}</span>
        </div>
        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-400 text-center">
          {completedCount} of {totalChallenges} challenges completed
        </div>
      </div>

      {/* Level and Points */}
      <div className="bg-gray-800 rounded-xl p-6 mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Level {userStats.level}</h3>
            <p className="text-gray-400">QA Tester</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-500">{userStats.points}</div>
            <div className="text-sm text-gray-400">Total Points</div>
          </div>
        </div>
      </div>

      {/* Recent Challenges */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">{t('Recently completed challenges')}</h2>
        {recentChallenges.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <p className="text-gray-400 mb-4">{t('No completed challenges yet.')}</p>
            <Link
              to="/challenges"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Start Your First Challenge
            </Link>
          </div>
        ) : (
          <ul className="space-y-2">
            {recentChallenges.map((challenge) => (
              <li key={challenge.id} className="bg-gray-700 rounded p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <TrophyIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span>{challenge.title}</span>
                </div>
                <Link
                  to={`/challenges/${challenge.id}`}
                  className="text-green-400 hover:text-green-300 text-sm"
                >
                  Review
                </Link>
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