import React, { useState, useRef, useEffect } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'CSS-MASTER-PUZZLE-SOLVED';
const CHALLENGE_ID = 'css-puzzle';
const CHALLENGE_POINTS = 60;

const Challenge22CSSPuzzle: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [cssInput, setCssInput] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFlag, setShowFlag] = useState(false);
  const [appliedCSS, setAppliedCSS] = useState('');
  const puzzleRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement>(null);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setCssInput('');
      setFeedback('');
      setFlagInput('');
      setShowFlag(false);
    }
  }, [isRetakeMode]);

  // Initial CSS that hides the flag
  const initialCSS = `
    .puzzle-container {
      position: relative;
      width: 400px;
      height: 300px;
      background: linear-gradient(45deg, #1a1a1a, #2d2d2d);
      border: 2px solid #444;
      overflow: hidden;
    }
    
    .hidden-flag {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      font-weight: bold;
      color: #00ff00;
      opacity: 0;
      z-index: -1;
    }
    
    .overlay-1 {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 10;
    }
    
    .overlay-2 {
      position: absolute;
      top: 20px;
      left: 20px;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      background: #1a1a1a;
      z-index: 15;
    }
    
    .overlay-3 {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(13, 13, 13, 0.95);
      z-index: 25;
    }
    
    .fake-content {
      position: absolute;
      top: 50px;
      left: 50px;
      color: #666;
      z-index: 30;
    }
    
    .decoy::before {
      content: "FAKE-FLAG-123";
      position: absolute;
      top: 100px;
      left: 100px;
      color: #ff0000;
      opacity: 0.3;
      z-index: 5;
    }
    
    /* Hidden flag requires CSS manipulation to become visible */
  `;

  useEffect(() => {
    // Apply initial CSS
    if (styleRef.current) {
      styleRef.current.textContent = initialCSS;
    }
    setAppliedCSS(initialCSS);
  }, [initialCSS]);

  const applyCSS = () => {
    if (!cssInput.trim()) {
      setFeedback('Please enter some CSS code');
      return;
    }

    try {
      // Apply user's CSS
      const fullCSS = initialCSS + '\n\n/* User CSS */\n' + cssInput;
      if (styleRef.current) {
        styleRef.current.textContent = fullCSS;
      }
      setAppliedCSS(fullCSS);
      
      // Check if flag is now visible
      setTimeout(() => {
        checkFlagVisibility();
      }, 100);
      
      setFeedback('CSS applied! Check if the flag is now visible.');
    } catch (error) {
      setFeedback('CSS syntax error. Please check your code.');
    }
  };

  const checkFlagVisibility = () => {
    if (puzzleRef.current) {
      const flagElement = puzzleRef.current.querySelector('.hidden-flag') as HTMLElement;
      if (flagElement) {
        const styles = window.getComputedStyle(flagElement);
        const opacity = parseFloat(styles.opacity);
        const zIndex = parseInt(styles.zIndex);
        const display = styles.display;
        const visibility = styles.visibility;
        
        // Check if flag is truly visible
        if (opacity > 0.8 && zIndex > 50 && display !== 'none' && visibility !== 'hidden') {
          setShowFlag(true);
          setFeedback('🎉 Excellent! You made the flag visible! The flag is revealed!');
        } else if (opacity > 0.1) {
          setFeedback('Getting closer! The flag is partially visible but needs more work.');
        }
      }
    }
  };

  const resetCSS = () => {
    setCssInput('');
    if (styleRef.current) {
      styleRef.current.textContent = initialCSS;
    }
    setAppliedCSS(initialCSS);
    setShowFlag(false);
    setFeedback('CSS reset to initial state.');
  };

  const showHint = () => {
    setCssInput(`/* CSS Debugging Hint:
   The flag is hidden using multiple CSS techniques.
   
   Key areas to investigate:
   1. Check the opacity values of elements
   2. Examine z-index layering (what's on top?)
   3. Look for overlay elements that might be covering content
   4. Consider CSS properties: display, visibility, opacity, z-index
   
   Try using browser DevTools to inspect the .hidden-flag element
   and see what styles are applied to it.
   
   Write your CSS below to override the hiding techniques:
*/

`);
    setFeedback('Hint: Inspect the CSS structure and think about what properties might be hiding the flag.');
  };

  const checkFlag = async () => {
    if (flagInput.trim() === FLAG) {
      const result = await submitFlag(CHALLENGE_ID, FLAG, CHALLENGE_POINTS);
      if (result.success) {
        setFeedback(`Challenge passed! 🎉 (+${result.pointsEarned} pts)`);
        if (onComplete) onComplete();
      } else {
        setFeedback(`Error: ${result.message}`);
      }
    } else {
      setFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className={`bg-gray-800 rounded-xl p-4 md:p-6 border-2 max-w-7xl mx-auto mt-8 ${
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <style ref={styleRef}></style>
      
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        CSS Puzzle Challenge
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        A flag has been hidden using advanced CSS techniques (opacity, z-index, overlays, pseudo-elements). 
        Write CSS code to make the hidden flag visible.
      </p>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {/* CSS Editor */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">CSS Editor</h3>
          <textarea
            value={cssInput}
            onChange={(e) => setCssInput(e.target.value)}
            className="w-full h-48 md:h-64 p-3 rounded bg-gray-700 text-white font-mono text-sm"
            placeholder="Enter your CSS code here to reveal the hidden flag..."
            disabled={effectiveCompleted}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            <button 
              onClick={applyCSS}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50"
              disabled={effectiveCompleted}
            >
              Apply CSS
            </button>
            <button 
              onClick={showHint}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50"
              disabled={effectiveCompleted}
            >
              Show Hint
            </button>
            <button 
              onClick={resetCSS}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50"
              disabled={effectiveCompleted}
            >
              Reset
            </button>
            <button 
              onClick={() => setFeedback('Use browser DevTools (F12) to inspect the puzzle elements. Right-click on the puzzle box and select "Inspect Element" to see the CSS structure.')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50"
              disabled={effectiveCompleted}
            >
              DevTools Tip
            </button>
          </div>
        </div>

        {/* Puzzle Display */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Puzzle Display</h3>
          <div 
            ref={puzzleRef}
            className="puzzle-container"
          >
            <div className="hidden-flag">
              {FLAG}
            </div>
            <div className="overlay-1"></div>
            <div className="overlay-2"></div>
            <div className="overlay-3"></div>
            <div className="fake-content">
              <p>Nothing to see here...</p>
              <p>Or is there? 🤔</p>
            </div>
            <div className="decoy"></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            💡 Tip: The flag is hidden somewhere in this box. Use CSS to reveal it!
          </p>
        </div>
      </div>

      {/* Current CSS Display */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">Current CSS (Initial + Your CSS)</h3>
        <div className="bg-gray-700 p-3 rounded max-h-40 overflow-y-auto">
          <pre className="text-xs text-gray-300 font-mono">{appliedCSS}</pre>
        </div>
      </div>

      {showFlag && (
        <div className="mt-4 p-4 bg-green-900 border border-green-500 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-2">🎉 Flag Revealed!</h3>
          <p className="text-white font-mono">Flag: {FLAG}</p>
        </div>
      )}

      {(showFlag || effectiveCompleted) && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            disabled={effectiveCompleted}
          />
          <button 
            onClick={checkFlag}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50"
            disabled={isSubmitting || effectiveCompleted}
          >
            {isSubmitting ? 'Submitting...' : effectiveCompleted ? 'Completed' : 'Submit Flag'}
          </button>
        </div>
      )}

      <div className={`mt-4 min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : feedback.includes('Excellent') ? 'text-blue-400' : 'text-red-400'}`}>
        {feedback}
      </div>

      {!showFlag && !effectiveCompleted && (
        <div className="mt-4 text-sm text-gray-400">
          💡 Hint: The flag is hidden using multiple CSS layers. Use browser DevTools to inspect the .hidden-flag element and see what styles are preventing it from being visible. Look for elements with high z-index values that might be covering it.
        </div>
      )}
    </div>
  );
};

export default Challenge22CSSPuzzle; 