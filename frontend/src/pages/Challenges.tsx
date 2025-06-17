import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  KeyIcon,
  ArrowPathIcon,
  BugAntIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import challenges from '../challenges/challenges';

// Icon mapping for different categories
const categoryIcons: { [key: string]: React.ReactNode } = {
  accessibility: <ExclamationTriangleIcon className="h-8 w-8 text-blue-500" />,
  security: <ShieldCheckIcon className="h-8 w-8 text-red-500" />,
  performance: <ArrowPathIcon className="h-8 w-8 text-yellow-500" />,
  usability: <GlobeAltIcon className="h-8 w-8 text-green-500" />,
  functionality: <BugAntIcon className="h-8 w-8 text-purple-500" />,
  cryptography: <KeyIcon className="h-8 w-8 text-cyan-500" />,
  logic: <BugAntIcon className="h-8 w-8 text-indigo-500" />,
  ui: <GlobeAltIcon className="h-8 w-8 text-pink-500" />,
  web: <GlobeAltIcon className="h-8 w-8 text-orange-500" />,
  data: <ArrowPathIcon className="h-8 w-8 text-teal-500" />,
  network: <ArrowPathIcon className="h-8 w-8 text-violet-500" />,
  dom: <BugAntIcon className="h-8 w-8 text-lime-500" />,
};

// Difficulty color mapping
const difficultyColors: { [key: string]: string } = {
  easy: 'text-green-500',
  medium: 'text-yellow-500',  
  hard: 'text-red-500',
};



const Challenges: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [completed, setCompleted] = useState<{[key:string]:boolean}>({});
  const [userProgress, setUserProgress] = useState<{completedChallenges: any[], totalPoints: number}>({
    completedChallenges: [],
    totalPoints: 0
  });
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!isAuthenticated) {
        // Load from localStorage for non-authenticated users
        const saved = localStorage.getItem('forge_completed_challenges');
        if (saved) {
          const savedCompleted = JSON.parse(saved);
          setCompleted(savedCompleted);
        }
        return;
      }

      try {
        const response = await api.get('/submissions/my-progress');
        if (response.data && response.data.data) {
          const progress = response.data.data;
          setUserProgress(progress);
          
          // Convert completed challenges array to object for easier lookup
          const completedObj: {[key:string]:boolean} = {};
          progress.completedChallenges.forEach((completion: any) => {
            completedObj[completion.challengeId] = true;
          });
          setCompleted(completedObj);
        }
      } catch (err: any) {
        console.error('Error fetching user progress:', err);
        // Fallback to localStorage
        const saved = localStorage.getItem('forge_completed_challenges');
        if (saved) {
          setCompleted(JSON.parse(saved));
        }
      }
    };

    fetchUserProgress();
  }, [isAuthenticated]);

  // Use local challenges instead of API
  const localChallenges = challenges.map(challenge => ({
    _id: challenge.id,
    id: challenge.id,
    title: challenge.titleKey,
    description: challenge.descriptionKey,
    category: challenge.categoryKey,
    difficulty: challenge.difficultyKey,
    points: challenge.points,
    hints: [],
    tags: [],
    isActive: true,
    completionCount: 0
  }));

  const filteredChallenges = localChallenges.filter(challenge => {
    const difficultyMatch = filterDifficulty === 'All' || challenge.difficulty === filterDifficulty;
    const categoryMatch = filterCategory === 'All' || challenge.category === filterCategory;
    return difficultyMatch && categoryMatch && challenge.isActive;
  });

  const categories = ['All', ...Array.from(new Set(localChallenges.map(c => c.category)))];
  const difficulties = ['All', 'easy', 'medium', 'hard'];



  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-green-400 hover:text-green-300 transition-colors"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {t('Back')}
        </button>

        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
            {t('QA Interactive Challenges')}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('Test your QA skills with real-world scenarios. Find bugs, identify security issues, and improve application quality.')}
          </p>
          
          {/* User Progress Display */}
          {isAuthenticated && (
            <div className="bg-gray-800 rounded-lg p-4 max-w-md mx-auto mb-8">
              <h3 className="text-lg font-semibold text-white mb-2">Your Progress</h3>
              <div className="flex justify-between text-gray-300">
                <span>Completed: {userProgress.completedChallenges.length}/{localChallenges.length}</span>
                <span>Points: {userProgress.totalPoints}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(userProgress.completedChallenges.length / localChallenges.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Filter by Difficulty:</label>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff === 'All' ? 'All Difficulties' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Filter by Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border-l-4 ${
                completed[challenge.id] ? 'border-green-500 bg-gray-800/50' : 'border-gray-600'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {categoryIcons[challenge.category] || <BugAntIcon className="h-8 w-8 text-gray-500" />}
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
                      <p className="text-sm text-gray-400 capitalize">{challenge.category}</p>
                    </div>
                  </div>
                  {completed[challenge.id] && (
                    <div className="text-green-500">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {challenge.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-medium ${difficultyColors[challenge.difficulty]}`}>
                    {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                  </span>
                  <span className="text-sm text-gray-400">
                    {challenge.points} points
                  </span>
                </div>

                <Link
                  to={`/challenges/${challenge.id}`}
                  className={`block w-full text-center py-2 px-4 rounded-lg font-medium transition-colors ${
                    completed[challenge.id]
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {completed[challenge.id] ? 'Review Challenge' : 'Start Challenge'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No challenges match your current filters.</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Challenges; 