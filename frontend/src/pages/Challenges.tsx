import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  KeyIcon,
  ArrowPathIcon,
  BugAntIcon,
  LinkIcon,
  CakeIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  EyeDropperIcon,
  LockClosedIcon,
  CloudIcon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  DocumentCheckIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

// Icon mapping for different categories
const categoryIcons: { [key: string]: React.ReactNode } = {
  accessibility: <ExclamationTriangleIcon className="h-8 w-8 text-blue-500" />,
  security: <ShieldCheckIcon className="h-8 w-8 text-red-500" />,
  performance: <ArrowPathIcon className="h-8 w-8 text-yellow-500" />,
  usability: <GlobeAltIcon className="h-8 w-8 text-green-500" />,
  functionality: <BugAntIcon className="h-8 w-8 text-purple-500" />,
};

// Difficulty color mapping
const difficultyColors: { [key: string]: string } = {
  easy: 'text-green-500',
  medium: 'text-yellow-500',  
  hard: 'text-red-500',
};

interface Challenge {
  _id: string;
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  points: number;
  hints: string[];
  tags: string[];
  isActive: boolean;
  completionCount: number;
}

const Challenges: React.FC = () => {
  const { t } = useTranslation();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState<{[key:string]:boolean}>({});
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const response = await api.get('/challenges');
        if (response.data && response.data.data) {
          setChallenges(response.data.data);
        }
      } catch (err: any) {
        console.error('Error fetching challenges:', err);
        setError('Failed to load challenges. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('forge_completed_challenges');
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  const filteredChallenges = challenges.filter(challenge => {
    const difficultyMatch = filterDifficulty === 'All' || challenge.difficulty === filterDifficulty;
    const categoryMatch = filterCategory === 'All' || challenge.category === filterCategory;
    return difficultyMatch && categoryMatch && challenge.isActive;
  });

  const categories = ['All', ...Array.from(new Set(challenges.map(c => c.category)))];
  const difficulties = ['All', 'easy', 'medium', 'hard'];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading challenges...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{challenges.length}</div>
            <div className="text-gray-400">Total Challenges</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{Object.keys(completed).length}</div>
            <div className="text-gray-400">Completed</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {challenges.reduce((sum, c) => sum + c.points, 0)}
            </div>
            <div className="text-gray-400">Total Points Available</div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge._id}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors border border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {categoryIcons[challenge.category] || <KeyIcon className="h-8 w-8 text-gray-500" />}
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-sm font-medium ${difficultyColors[challenge.difficulty] || 'text-gray-400'}`}>
                    {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                  </span>
                  <span className="text-sm text-green-500 font-bold">{challenge.points} pts</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2 text-white">{challenge.title}</h3>
              <p className="text-gray-300 mb-4 text-sm">{challenge.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {challenge.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)}
                </span>
                <Link
                  to={`/challenges/${challenge.id}`}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {completed[challenge.id] ? 'Review' : 'Start Challenge'}
                </Link>
              </div>

              {completed[challenge.id] && (
                <div className="mt-2 flex items-center text-green-400 text-sm">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Completed
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No challenges match your current filters.</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Challenges; 