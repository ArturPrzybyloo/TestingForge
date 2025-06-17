import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import challenges from '../challenges/challenges';

interface UserProgress {
  totalPoints: number;
  level: string;
  completedChallenges: Array<{
    challengeId: string;
    completedAt: string;
    flag: string;
  }>;
  totalCompleted: number;
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  totalPoints: number;
  level: string;
  challengesCompleted: number;
}

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch user progress
        const progressResponse = await api.get('/submissions/my-progress');
        if (progressResponse.data && progressResponse.data.data) {
          setUserProgress(progressResponse.data.data);
        }

        // Fetch leaderboard
        const leaderboardResponse = await api.get('/submissions/leaderboard?limit=10');
        if (leaderboardResponse.data && leaderboardResponse.data.data) {
          setLeaderboard(leaderboardResponse.data.data);
        }

      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'text-purple-400';
      case 'Advanced': return 'text-red-400';
      case 'Intermediate': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const getLevelProgress = (points: number) => {
    if (points >= 500) return { level: 'Expert', progress: 100, next: null };
    if (points >= 200) return { level: 'Advanced', progress: ((points - 200) / 300) * 100, next: 500 };
    if (points >= 50) return { level: 'Intermediate', progress: ((points - 50) / 150) * 100, next: 200 };
    return { level: 'Beginner', progress: (points / 50) * 100, next: 50 };
  };

  const getRecentAchievements = () => {
    if (!userProgress) return [];
    
    return userProgress.completedChallenges
      .slice(-5) // Last 5 completed challenges
      .reverse()
      .map(completion => {
        const challenge = challenges.find(c => c.id === completion.challengeId);
        return {
          ...completion,
          challengeName: challenge?.titleKey || 'Unknown Challenge',
          points: challenge?.points || 0,
          difficulty: challenge?.difficultyKey || 'unknown'
        };
      });
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-white mb-4">Welcome to Testing Forge</h1>
          <p className="text-gray-400 mb-8">Please log in to view your dashboard and track your progress.</p>
          <Link 
            to="/login" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center py-20">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const levelInfo = userProgress ? getLevelProgress(userProgress.totalPoints) : null;
  const recentAchievements = getRecentAchievements();
  const completionRate = userProgress ? Math.round((userProgress.totalCompleted / challenges.length) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-gray-400">Track your progress and see how you rank against other testers.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Points</p>
              <p className="text-2xl font-bold text-white">{userProgress?.totalPoints || 0}</p>
            </div>
            <div className="p-3 bg-blue-500 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Challenges Completed</p>
              <p className="text-2xl font-bold text-white">
                {userProgress?.totalCompleted || 0}/{challenges.length}
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Current Level</p>
              <p className={`text-2xl font-bold ${getLevelColor(userProgress?.level || 'Beginner')}`}>
                {userProgress?.level || 'Beginner'}
              </p>
            </div>
            <div className="p-3 bg-purple-500 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Completion Rate</p>
              <p className="text-2xl font-bold text-white">{completionRate}%</p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Level Progress */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Level Progress</h3>
          {levelInfo && (
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Current: {levelInfo.level}</span>
                {levelInfo.next && <span>Next: {levelInfo.next} pts</span>}
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${levelInfo.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {levelInfo.next 
                  ? `${levelInfo.next - (userProgress?.totalPoints || 0)} points to next level`
                  : 'Max level reached!'
                }
              </p>
            </div>
          )}
        </div>

        {/* Recent Achievements */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {recentAchievements.length > 0 ? (
              recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{achievement.challengeName}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(achievement.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">+{achievement.points} pts</p>
                    <p className={`text-xs ${
                      achievement.difficulty === 'hard' ? 'text-red-400' :
                      achievement.difficulty === 'medium' ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {achievement.difficulty}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">
                No challenges completed yet. <Link to="/challenges" className="text-blue-400 hover:text-blue-300">Start now!</Link>
              </p>
            )}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">Leaderboard</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-700">
                  <th className="pb-3">Rank</th>
                  <th className="pb-3">Username</th>
                  <th className="pb-3">Level</th>
                  <th className="pb-3">Points</th>
                  <th className="pb-3">Completed</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr 
                    key={entry.username} 
                    className={`border-b border-gray-700 ${entry.username === user?.username ? 'bg-blue-900/20' : ''}`}
                  >
                    <td className="py-3 text-white font-medium">#{entry.rank}</td>
                    <td className="py-3 text-white">
                      {entry.username}
                      {entry.username === user?.username && (
                        <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">You</span>
                      )}
                    </td>
                    <td className={`py-3 font-medium ${getLevelColor(entry.level)}`}>
                      {entry.level}
                    </td>
                    <td className="py-3 text-white">{entry.totalPoints}</td>
                    <td className="py-3 text-gray-400">{entry.challengesCompleted}/{challenges.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Link 
          to="/challenges" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          View All Challenges
        </Link>
        <Link 
          to="/profile" 
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage; 