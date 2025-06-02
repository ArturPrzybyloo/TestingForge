import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import Challenge13ElementHighlighter from '../challenges/Challenge13ElementHighlighter';
import Challenge14NetworkTiming from '../challenges/Challenge14NetworkTiming';
import Challenge15FormInputFuzzer from '../challenges/Challenge15FormInputFuzzer';
import Challenge16RaceConditionTester from '../challenges/Challenge16RaceConditionTester';
import Challenge17DOMMutationObserver from '../challenges/Challenge17DOMMutationObserver';
import Challenge18AccessibilityAudit from '../challenges/Challenge18AccessibilityAudit';

// Map backend challenge IDs to frontend components
const challengeMap: Record<string, React.FC> = {
  // Backend challenge IDs mapped to existing components
  'missing-button': Challenge1Caesar, // accessibility - missing button challenge
  'broken-api': Challenge2Order, // functionality - API issue
  'slow-page': Challenge3UIBug, // performance - slow loading
  'xss-vulnerability': Challenge4UrlParam, // security - XSS vulnerability
  'color-contrast': Challenge5Cookie, // accessibility - color contrast
  'mobile-responsive': Challenge6Json, // usability - mobile responsive
  
  // Keep legacy numeric mapping for backwards compatibility
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
  '13': Challenge13ElementHighlighter,
  '14': Challenge14NetworkTiming,
  '15': Challenge15FormInputFuzzer,
  '16': Challenge16RaceConditionTester,
  '17': Challenge17DOMMutationObserver,
  '18': Challenge18AccessibilityAudit,
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
        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      {ChallengeComponent ? (
        <ChallengeComponent />
      ) : (
        <div className="text-center text-red-400 text-2xl mt-12">
          Challenge not found.
          <div className="text-sm text-gray-400 mt-2">
            Challenge ID: {id}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeDetail; 