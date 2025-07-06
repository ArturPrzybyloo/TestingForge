import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChallengeWrapper from '../components/ChallengeWrapper';
import Challenge1Caesar from '../challenges/Challenge1Caesar';
import Challenge2Order from '../challenges/Challenge2Order';
import Challenge3UIBug from '../challenges/Challenge3UIBug';
import Challenge4UrlParam from '../challenges/Challenge4UrlParam';
import Challenge5Cookie from '../challenges/Challenge5Cookie';
import Challenge5CookieSimple from '../challenges/Challenge5CookieSimple';
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
import Challenge19SQLOrdersTotal from '../challenges/Challenge19SQLOrdersTotal';
import Challenge20SQLLoginFrequency from '../challenges/Challenge20SQLLoginFrequency';
import Challenge21EncodedToken from '../challenges/Challenge21EncodedToken';
import Challenge22CSSPuzzle from '../challenges/Challenge22CSSPuzzle';
import Challenge23UnauthorizedAccessLog from '../challenges/Challenge23UnauthorizedAccessLog';
import Challenge24SlowestRequest from '../challenges/Challenge24SlowestRequest';

// Map URL parameters to actual challenge IDs
const challengeIdMap: Record<string, string> = {
  'caesar-cipher': 'caesar-cipher',
  'order-matters': 'order-matters',
  'ui-bug': 'ui-bug',
  'url-param': 'url-param',
  'cookie-challenge': 'cookie-challenge',
  'advanced-cookie-auth': 'advanced-cookie-auth',
  'json-challenge': 'json-challenge',
  'xhr-detective': 'xhr-detective',
  'css-debugger': 'css-debugger',
  'cookie-hacker': 'cookie-hacker',
  'localstorage-inspector': 'localstorage-inspector',
  'broken-dom': 'broken-dom',
  'json-validator': 'json-validator',
  'element-highlighter': 'element-highlighter',
  'network-timing': 'network-timing',
  'form-input-fuzzer': 'form-input-fuzzer',
  'race-condition-tester': 'race-condition-tester',
  'dom-mutation-observer': 'dom-mutation-observer',
  'accessibility-audit': 'accessibility-audit',
  'sql-orders-total': 'sql-orders-total',
  'sql-login-frequency': 'sql-login-frequency',
  'encoded-token': 'encoded-token',
  'css-puzzle': 'css-puzzle',
  'unauthorized-access-log': 'unauthorized-access-log',
  'slowest-request': 'slowest-request',
};

// Map new challenge IDs to frontend components
const challengeMap: Record<string, React.FC> = {
  // New string-based IDs matching challenges.ts
  'caesar-cipher': Challenge1Caesar,
  'order-matters': Challenge2Order,
  'ui-bug': Challenge3UIBug,
  'url-param': Challenge4UrlParam,
  'cookie-challenge': Challenge5CookieSimple,
  'advanced-cookie-auth': Challenge5Cookie,
  'json-challenge': Challenge6Json,
  'xhr-detective': Challenge7XHRDetective,
  'css-debugger': Challenge8CSSDebugger,
  'cookie-hacker': Challenge9CookieHacker,
  'localstorage-inspector': Challenge10LocalStorageInspector,
  'broken-dom': Challenge11BrokenDOM,
  'json-validator': Challenge12JSONValidator,
  'element-highlighter': Challenge13ElementHighlighter,
  'network-timing': Challenge14NetworkTiming,
  'form-input-fuzzer': Challenge15FormInputFuzzer,
  'race-condition-tester': Challenge16RaceConditionTester,
  'dom-mutation-observer': Challenge17DOMMutationObserver,
  'accessibility-audit': Challenge18AccessibilityAudit,
  'sql-orders-total': Challenge19SQLOrdersTotal,
  'sql-login-frequency': Challenge20SQLLoginFrequency,
  'encoded-token': Challenge21EncodedToken,
  'css-puzzle': Challenge22CSSPuzzle,
  'unauthorized-access-log': Challenge23UnauthorizedAccessLog,
  'slowest-request': Challenge24SlowestRequest,
  
  // Keep legacy mappings for backwards compatibility  
  'missing-button': Challenge1Caesar,
  'broken-api': Challenge2Order,
  'slow-page': Challenge3UIBug,
  'xss-vulnerability': Challenge4UrlParam,
  'color-contrast': Challenge5CookieSimple,
  'mobile-responsive': Challenge6Json,
  
  // Legacy numeric mapping
  '1': Challenge1Caesar,
  '2': Challenge2Order,
  '3': Challenge3UIBug,
  '4': Challenge4UrlParam,
  '5': Challenge5CookieSimple,
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
  const challengeId = id && challengeIdMap[id];

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
      {ChallengeComponent && challengeId ? (
        <ChallengeWrapper challengeId={challengeId}>
          <ChallengeComponent />
        </ChallengeWrapper>
      ) : (
        <div className="text-center text-red-400 text-2xl mt-12">
          Challenge not found.
          <div className="text-sm text-gray-400 mt-2">
            Challenge ID: {id}
          </div>
          <div className="text-xs text-gray-500 mt-4">
            Available challenges: {Object.keys(challengeMap).filter(k => !k.match(/^\d+$/)).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeDetail; 