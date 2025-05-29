import React, { useEffect, useState, useMemo } from 'react';
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
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const Challenges: React.FC = () => {
  const { t, i18n } = useTranslation();
  const challenges = useMemo(() => [
    {
      id: '1',
      title: t('challenge.secretMessage.title'),
      description: t('challenge.secretMessage.description'),
      icon: <KeyIcon className="h-8 w-8 text-green-500" />,
      difficulty: t('difficulty.beginner'),
      category: t('challenge.secretMessage.category'),
    },
    {
      id: '2',
      title: t('challenge.orderMatters.title'),
      description: t('challenge.orderMatters.description'),
      icon: <ArrowPathIcon className="h-8 w-8 text-blue-500" />,
      difficulty: t('difficulty.beginner'),
      category: t('challenge.orderMatters.category'),
    },
    {
      id: '3',
      title: t('challenge.uiBugHunt.title'),
      description: t('challenge.uiBugHunt.description'),
      icon: <BugAntIcon className="h-8 w-8 text-green-500" />,
      difficulty: t('difficulty.beginner'),
      category: t('challenge.uiBugHunt.category'),
    },
    {
      id: '4',
      title: t('challenge.hiddenParameter.title'),
      description: t('challenge.hiddenParameter.description'),
      icon: <LinkIcon className="h-8 w-8 text-blue-500" />,
      difficulty: t('difficulty.beginner'),
      category: t('challenge.hiddenParameter.category'),
    },
    {
      id: '5',
      title: t('challenge.cookieInspector.title'),
      description: t('challenge.cookieInspector.description'),
      icon: <CakeIcon className="h-8 w-8 text-green-500" />,
      difficulty: t('difficulty.beginner'),
      category: t('challenge.cookieInspector.category'),
    },
    {
      id: '6',
      title: t('challenge.jsonExplorer.title'),
      description: t('challenge.jsonExplorer.description'),
      icon: <DocumentTextIcon className="h-8 w-8 text-blue-500" />,
      difficulty: t('difficulty.beginner'),
      category: t('challenge.jsonExplorer.category'),
    },
    {
      id: '7',
      title: t('challenge.xhrDetective.title'),
      description: t('challenge.xhrDetective.description'),
      icon: <MagnifyingGlassIcon className="h-8 w-8 text-blue-500" />,
      difficulty: t('difficulty.medium'),
      category: t('challenge.xhrDetective.category'),
    },
    {
      id: '8',
      title: t('challenge.cssDebugger.title'),
      description: t('challenge.cssDebugger.description'),
      icon: <EyeDropperIcon className="h-8 w-8 text-green-500" />,
      difficulty: t('difficulty.medium'),
      category: t('challenge.cssDebugger.category'),
    },
    {
      id: '9',
      title: t('challenge.cookieHacker.title'),
      description: t('challenge.cookieHacker.description'),
      icon: <LockClosedIcon className="h-8 w-8 text-blue-500" />,
      difficulty: t('difficulty.medium'),
      category: t('challenge.cookieHacker.category'),
    },
    {
      id: '10',
      title: t('challenge.localStorageInspector.title'),
      description: t('challenge.localStorageInspector.description'),
      icon: <CloudIcon className="h-8 w-8 text-green-500" />,
      difficulty: t('difficulty.medium'),
      category: t('challenge.localStorageInspector.category'),
    },
    {
      id: '11',
      title: t('challenge.brokenDom.title'),
      description: t('challenge.brokenDom.description'),
      icon: <WrenchScrewdriverIcon className="h-8 w-8 text-blue-500" />,
      difficulty: t('difficulty.medium'),
      category: t('challenge.brokenDom.category'),
    },
    {
      id: '12',
      title: t('challenge.jsonValidator.title'),
      description: t('challenge.jsonValidator.description'),
      icon: <DocumentCheckIcon className="h-6 w-6" />,
      difficulty: t('difficulty.beginner'),
      category: t('challenge.jsonValidator.category'),
    },
    {
      id: '13',
      title: t('challenge.elementHighlighter.title'),
      description: t('challenge.elementHighlighter.description'),
      icon: <EyeDropperIcon className="h-8 w-8 text-blue-500" />,
      difficulty: t('difficulty.beginner'),
      category: t('challenge.elementHighlighter.category'),
    },
    {
      id: '14',
      title: t('challenge.networkTiming.title'),
      description: t('challenge.networkTiming.description'),
      icon: <MagnifyingGlassIcon className="h-8 w-8 text-green-500" />,
      difficulty: t('difficulty.beginner'),
      category: t('challenge.networkTiming.category'),
    },
    {
      id: '15',
      title: t('challenge.formInputFuzzer.title'),
      description: t('challenge.formInputFuzzer.description'),
      icon: <DocumentTextIcon className="h-8 w-8 text-blue-500" />,
      difficulty: t('difficulty.beginner'),
      category: t('challenge.formInputFuzzer.category'),
    },
    {
      id: '16',
      title: t('challenge.raceConditionTester.title'),
      description: t('challenge.raceConditionTester.description'),
      icon: <ArrowPathIcon className="h-8 w-8 text-yellow-500" />,
      difficulty: t('difficulty.medium'),
      category: t('challenge.raceConditionTester.category'),
    },
    {
      id: '17',
      title: t('challenge.domMutationObserver.title'),
      description: t('challenge.domMutationObserver.description'),
      icon: <BugAntIcon className="h-8 w-8 text-green-500" />,
      difficulty: t('difficulty.medium'),
      category: t('challenge.domMutationObserver.category'),
    },
    {
      id: '18',
      title: t('challenge.accessibilityAudit.title'),
      description: t('challenge.accessibilityAudit.description'),
      icon: <ExclamationTriangleIcon className="h-8 w-8 text-blue-500" />,
      difficulty: t('difficulty.medium'),
      category: t('challenge.accessibilityAudit.category'),
    },
  ], [t, i18n.language]);
  const [completed, setCompleted] = useState<{[key:string]:boolean}>({});
  const [filterDifficulty, setFilterDifficulty] = useState<string>(t('All'));
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('forge_completed_challenges');
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  useEffect(() => {
    setFilterDifficulty(t('All'));
  }, [t, i18n.language]);

  const filteredChallenges = filterDifficulty === t('All') 
    ? challenges 
    : challenges.filter(challenge => challenge.difficulty === filterDifficulty);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-green-400 hover:text-green-300 transition-colors"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          {t('Back')}
        </button>
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
            {t('QA Interactive Challenges')}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('Improve your testing skills with interactive challenges on Testing Forge!')}
          </p>
        </div>
        {/* Filter Dropdown */}
        <div className="mb-6">
          <label htmlFor="difficulty-filter" className="block text-sm font-medium text-gray-300 mb-2">{t('Filter by Difficulty:')}</label>
          <select
            id="difficulty-filter"
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="bg-gray-700 text-white rounded px-4 py-2"
          >
            <option value={t('All')}>{t('All')}</option>
            <option value={t('difficulty.beginner')}>{t('difficulty.beginner')}</option>
            <option value={t('difficulty.medium')}>{t('difficulty.medium')}</option>
          </select>
        </div>
        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChallenges.map((challenge) => (
            <Link
              key={challenge.id}
              to={`/challenges/${challenge.id}`}
              className={`bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors border-2 flex flex-col h-full ${completed[challenge.id] ? 'border-green-400' : 'border-gray-700'}`}
            >
              <div className="flex items-center mb-4">
                {challenge.icon}
                <h3 className="text-xl font-semibold ml-3">{challenge.title}</h3>
              </div>
              <p className="text-gray-400 mb-4 flex-1">{challenge.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-400 mt-auto">
                <span className="px-2 py-1 rounded bg-gray-700 text-xs font-medium">{challenge.category}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${challenge.difficulty === t('difficulty.beginner') ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>{challenge.difficulty}</span>
                {completed[challenge.id] && <span className="ml-2 text-green-400 font-bold">✔</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Challenges; 