import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Challenge1Caesar from '../challenges/Challenge1Caesar';
import Challenge2Order from '../challenges/Challenge2Order';
import Challenge3UIBug from '../challenges/Challenge3UIBug';
import Challenge4UrlParam from '../challenges/Challenge4UrlParam';
import Challenge5Cookie from '../challenges/Challenge5Cookie';
import Challenge6Json from '../challenges/Challenge6Json';
import Challenge7XHRDetective from '../challenges/Challenge7XHRDetective';
import Challenge8CSSDebugger from '../challenges/Challenge8CSSDebugger';
import Challenge9CookieHacker from '../challenges/Challenge9CookieHacker';
import Challenge10LocalStorageInspector from '../challenges/Challenge10LocalStorageInspector';
import Challenge11BrokenDOM from '../challenges/Challenge11BrokenDOM';
import Challenge12JSONValidator from '../challenges/Challenge12JSONValidator';

const challengeMap: Record<string, React.FC> = {
  '1': Challenge1Caesar,
  '2': Challenge2Order,
  '3': Challenge3UIBug,
  '4': Challenge4UrlParam,
  '5': Challenge5Cookie,
  '6': Challenge6Json,
  '7': Challenge7XHRDetective,
  '8': Challenge8CSSDebugger,
  '9': Challenge9CookieHacker,
  '10': Challenge10LocalStorageInspector,
  '11': Challenge11BrokenDOM,
  '12': Challenge12JSONValidator,
};

const ChallengeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ChallengeComponent = id && challengeMap[id];

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center self-start text-green-400 hover:text-green-300 transition-colors"
      >
        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back
      </button>
      {ChallengeComponent ? (
        <ChallengeComponent />
      ) : (
        <div className="text-center text-red-400 text-2xl mt-12">Challenge not found.</div>
      )}
    </div>
  );
};

export default ChallengeDetail; 