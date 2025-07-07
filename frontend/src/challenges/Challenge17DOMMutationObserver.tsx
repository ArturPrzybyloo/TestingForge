import React, { useState, useEffect, useRef } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'FLAG-DOM-DETECTIVE';
const CHALLENGE_ID = 'dom-mutation-observer';
const CHALLENGE_POINTS = 50;

const Challenge17DOMMutationObserver: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const [currentContent, setCurrentContent] = useState('welcome');
  
  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  useEffect(() => {
    if (isRetakeMode) {
      setFlagInput('');
      setFeedback('');
      setActivityLog([]);
      setCurrentContent('welcome');
    }
  }, [isRetakeMode]);

  // Auto-generate dynamic content with hidden flag parts
  useEffect(() => {
    const interval = setInterval(() => {
      if (effectiveCompleted) return;
      
      const scenarios = [
        'loading',
        'user-data', 
        'notifications',
        'weather-widget',
        'news-feed',
        'chat-messages',
        'product-updates'
      ];
      
      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      setCurrentContent(randomScenario);
      
      setActivityLog(prev => [...prev, `Content changed to: ${randomScenario} (${new Date().toLocaleTimeString()})`]);
    }, 3000 + Math.random() * 2000); // 3-5 seconds

    return () => clearInterval(interval);
  }, [effectiveCompleted]);

  const renderDynamicContent = () => {
    const hiddenProps: any = {};
    
    switch(currentContent) {
      case 'loading':
        // Hidden: data-part="FLAG"
        hiddenProps['data-part'] = 'FLAG';
        return (
          <div className="animate-pulse" {...hiddenProps}>
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        );
        
      case 'user-data':
        // Hidden: data-fragment="DOM"  
        hiddenProps['data-fragment'] = 'DOM';
        return (
          <div className="user-profile" {...hiddenProps}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-gray-400">Software Engineer</div>
              </div>
            </div>
          </div>
        );
        
      case 'notifications':
        // Hidden: data-secret="DETECTIVE"
        hiddenProps['data-secret'] = 'DETECTIVE';
        return (
          <div className="notification-panel" {...hiddenProps}>
            <div className="bg-blue-900 border border-blue-500 rounded p-3">
              <div className="flex items-center">
                <span className="text-blue-300">🔔</span>
                <span className="ml-2 text-blue-200">You have 3 new messages</span>
              </div>
            </div>
          </div>
        );
        
      case 'weather-widget':
        return (
          <div className="weather-info">
            <div className="text-center">
              <div className="text-2xl">🌤️</div>
              <div className="font-medium">San Francisco</div>
              <div className="text-sm text-gray-400">22°C - Partly Cloudy</div>
            </div>
          </div>
        );
        
      case 'news-feed':
        return (
          <div className="news-items space-y-2">
            <div className="bg-gray-700 rounded p-2">
              <div className="font-medium text-sm">Tech News</div>
              <div className="text-xs text-gray-400">New JavaScript framework released</div>
            </div>
            <div className="bg-gray-700 rounded p-2">
              <div className="font-medium text-sm">Breaking</div>
              <div className="text-xs text-gray-400">AI makes breakthrough in testing</div>
            </div>
          </div>
        );
        
      case 'chat-messages':
        return (
          <div className="chat-window space-y-2">
            <div className="bg-blue-600 rounded p-2 ml-8">
              <div className="text-sm">Hey! Are you there?</div>
            </div>
            <div className="bg-gray-600 rounded p-2 mr-8">
              <div className="text-sm">Yes, working on some testing challenges</div>
            </div>
          </div>
        );
        
      case 'product-updates':
        return (
          <div className="product-list space-y-2">
            <div className="product-item flex justify-between items-center bg-gray-700 rounded p-2">
              <span className="text-sm">React Testing Library</span>
              <span className="text-xs text-green-400">Updated</span>
            </div>
            <div className="product-item flex justify-between items-center bg-gray-700 rounded p-2">
              <span className="text-sm">Cypress</span>
              <span className="text-xs text-yellow-400">New Version</span>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="welcome-message text-center">
            <h3 className="text-lg font-medium mb-2">Dynamic Content Area</h3>
            <p className="text-gray-400 text-sm">This area updates automatically with different content types.</p>
            <p className="text-gray-400 text-sm mt-2">Use MutationObserver to monitor the changes!</p>
          </div>
        );
    }
  };

  const checkFlag = async () => {
    if (flagInput.trim() === FLAG) {
      const result = await submitFlag(CHALLENGE_ID, FLAG, CHALLENGE_POINTS);
      if (result.success) {
        if (result.isRetake || isRetakeMode) {
          setFeedback(`Retake completed! 🎉 You've mastered DOM observation techniques!`);
        } else {
          setFeedback(`Challenge passed! 🎉 (+${result.pointsEarned} pts) Excellent detective work!`);
        }
        if (onComplete) onComplete();
      } else {
        setFeedback(`Error: ${result.message}`);
      }
    } else {
      setFeedback('Incorrect flag. Keep observing the DOM changes for hidden data attributes! ❌');
    }
  };

  return (
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-4xl mx-auto mt-8 ${
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-green-400">
        Dynamic Content Observer Challenge
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      
      <div className="mb-6 p-4 bg-blue-900 border border-blue-500 rounded">
        <h3 className="text-lg font-semibold text-blue-300 mb-2">🕵️ Advanced Detective Mission</h3>
        <p className="text-blue-200 text-sm mb-2">
          This application displays dynamic content that changes every few seconds. Hidden data attributes appear briefly on certain elements. 
          Your mission is to discover the pattern and collect all hidden values!
        </p>
        <div className="text-blue-200 text-sm">
          <p><strong>🔍 Your task:</strong> Write your own MutationObserver code to detect when elements gain special data attributes</p>
          <p><strong>🎯 Goal:</strong> Find the three hidden values and combine them to form the flag</p>
          <p><strong>⚠️ Important:</strong> This is a coding challenge - you must write the observer code yourself!</p>
        </div>
      </div>

      {/* Dynamic Content Area */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Live Application</h3>
        <div 
          ref={contentAreaRef}
          className="bg-gray-900 border border-gray-600 rounded p-6 min-h-[200px] content-area"
          id="dynamic-content"
        >
          {renderDynamicContent()}
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-6 p-4 bg-gray-700 rounded">
        <h3 className="text-lg font-semibold text-white mb-3">🛠️ Investigation Tools</h3>
        <div className="text-sm text-gray-300 space-y-3">
          <div>
            <p><strong>1. Open Developer Tools (F12)</strong></p>
            <p className="text-gray-400">Go to Console tab to write your observation code</p>
          </div>
          
          <div>
            <p><strong>2. Write your MutationObserver code</strong></p>
            <div className="bg-gray-900 p-3 rounded mt-2 text-gray-300 text-sm">
              <p className="text-yellow-300 mb-2">💡 Structure hints:</p>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• Create a <code>new MutationObserver(callback)</code></li>
                <li>• Loop through <code>mutations</code> array</li>
                <li>• Check for <code>mutation.type</code> and <code>mutation.addedNodes</code></li>
                <li>• Access data attributes using <code>node.dataset</code> or <code>getAttribute()</code></li>
                <li>• Use <code>observer.observe(target, config)</code> to start watching</li>
                <li>• Target: <code>document.getElementById('dynamic-content')</code></li>
                <li>• Config: <code>childList: true, subtree: true, attributes: true</code></li>
              </ul>
              <p className="text-red-300 text-xs mt-2">⚠️ Write the code yourself - copying won't teach you!</p>
            </div>
          </div>
          
          <div>
            <p><strong>3. Look for patterns</strong></p>
            <p className="text-gray-400">Different content types may have different hidden attributes</p>
            <p className="text-gray-400">Combine the values in the right order to get the flag!</p>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">📋 Activity Log</h3>
        <div className="bg-gray-900 rounded p-3 h-32 overflow-y-auto">
          {activityLog.length === 0 ? (
            <p className="text-gray-500 text-sm">Waiting for content changes...</p>
          ) : (
            activityLog.slice(-10).map((log, index) => (
              <div key={index} className="text-xs text-gray-300 mb-1">
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Hints */}
      <div className="mb-6 p-3 bg-yellow-900 border border-yellow-600 rounded">
        <p className="text-yellow-300 font-semibold mb-2">💡 Advanced Challenge Hints:</p>
        <ul className="text-yellow-200 text-sm space-y-1">
          <li>• <strong>Hard difficulty (50 pts):</strong> You must write proper MutationObserver code</li>
          <li>• Watch for elements with <code>data-part</code>, <code>data-fragment</code>, or <code>data-secret</code> attributes</li>
          <li>• Only certain content types contain hidden values</li>
          <li>• The flag format is: FLAG-{'{'}PART{'}'}-{'{'}FRAGMENT{'}'}-{'{'}SECRET{'}'}</li>
          <li>• Use <code>element.dataset</code> or <code>element.getAttribute()</code> to access data attributes</li>
          <li>• Be patient - you may need to wait for the right content to appear</li>
          <li>• Test your observer with <code>console.log()</code> to see what it detects</li>
        </ul>
      </div>

      {/* Flag Input */}
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-700 text-white mb-2"
        placeholder="Enter the flag (e.g., FLAG-PART-FRAGMENT-SECRET)..."
        value={flagInput}
        onChange={e => setFlagInput(e.target.value)}
        disabled={effectiveCompleted}
      />
      <button 
        className="w-full bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50 mb-2" 
        onClick={checkFlag}
        disabled={isSubmitting || effectiveCompleted}
      >
        {isSubmitting ? 'Submitting...' : effectiveCompleted ? 'Completed' : 'Submit Flag'}
      </button>

      <div className={`min-h-[24px] text-sm mt-2 ${
        feedback.includes('passed') || feedback.includes('Excellent') ? 'text-green-400' : 
        feedback.includes('❌') || feedback.includes('Error') ? 'text-red-400' : 'text-yellow-400'
      }`}>
        {feedback}
      </div>
    </div>
  );
};

export default Challenge17DOMMutationObserver; 