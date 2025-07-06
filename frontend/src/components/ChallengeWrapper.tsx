import React, { useState, useEffect } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';
import { ArrowPathIcon, CheckCircleIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

interface ChallengeWrapperProps {
  challengeId: string;
  children: React.ReactNode;
}

const ChallengeWrapper: React.FC<ChallengeWrapperProps> = ({ challengeId, children }) => {
  const { t } = useTranslation();
  const { isCompleted } = useFlagSubmission();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRetakeMode, setIsRetakeMode] = useState(false);
  const completed = isCompleted(challengeId);

  // Check URL param for retake mode
  useEffect(() => {
    const retakeParam = searchParams.get('retake');
    if (retakeParam === 'true' && completed) {
      setIsRetakeMode(true);
    }
  }, [searchParams, completed]);

  const handleTryAgain = () => {
    setIsRetakeMode(true);
    // Scroll to the challenge area
    setTimeout(() => {
      const challengeElement = document.querySelector(`[data-challenge-id="${challengeId}"]`);
      if (challengeElement) {
        challengeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleHideRetakeMode = () => {
    setIsRetakeMode(false);
    // Clear retake param from URL
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('retake');
    setSearchParams(newParams);
  };

  // Clone children and pass isRetakeMode prop
  const clonedChildren = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<any>, { isRetakeMode })
    : children;

  return (
    <div className="w-full">
      {/* Completed banner - only show if not in retake mode */}
      {completed && !isRetakeMode && (
        <div className="mb-6 bg-green-900/30 border border-green-500/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <h3 className="text-green-400 font-semibold">{t('challenge.completed.title')}</h3>
                <p className="text-green-300 text-sm">{t('challenge.completed.description')}</p>
              </div>
            </div>
            <button
              onClick={handleTryAgain}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              {t('challenge.completed.tryAgain')}
            </button>
          </div>
        </div>
      )}

      {/* Retake mode banner */}
      {completed && isRetakeMode && (
        <div className="mb-6 bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ArrowPathIcon className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <h3 className="text-blue-400 font-semibold">{t('challenge.retake.title')}</h3>
                <p className="text-blue-300 text-sm">{t('challenge.retake.description')}</p>
              </div>
            </div>
            <button
              onClick={handleHideRetakeMode}
              className="flex items-center text-blue-300 hover:text-blue-200 text-sm transition-colors"
            >
              <EyeSlashIcon className="h-4 w-4 mr-1" />
              {t('challenge.retake.hide')}
            </button>
          </div>
        </div>
      )}

      {/* Challenge content - pass isRetakeMode to children */}
      <div data-challenge-id={challengeId} className={isRetakeMode ? 'retake-mode' : ''}>
        {clonedChildren}
      </div>
    </div>
  );
};

export default ChallengeWrapper; 