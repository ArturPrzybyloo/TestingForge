import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'FLAG-MUTATION-OBS';
const CHALLENGE_ID = 'dom-mutation-observer';
const CHALLENGE_POINTS = 45;

type Product = { name: string; flag?: string };

const Challenge17DOMMutationObserver: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [products, setProducts] = useState<Product[]>([
    { name: 'Product 1' },
    { name: 'Product 2' },
  ]);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setProducts([
        { name: 'Product 1' },
        { name: 'Product 2' },
      ]);
      setFlagInput('');
      setFeedback('');
    }
  }, [isRetakeMode]);

  const loadMore = () => {
    if (effectiveCompleted) return;
    setProducts(prev => [...prev, { name: 'Product 3', flag: FLAG }]);
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
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-xl mx-auto mt-8 ${
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-green-400">
        DOM Mutation Observer
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">On the product list, click "Load more". In the console, run the provided MutationObserver code. Then click "Load more" again – the flag will appear in the console.</p>
      <div className="mb-4 product-list">
        {products.map((prod, idx) => (
          <div key={idx} data-flag={prod.flag || undefined} className="bg-gray-700 rounded p-2 mb-2">{prod.name}</div>
        ))}
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium mt-2 disabled:opacity-50" 
          onClick={loadMore}
          disabled={effectiveCompleted}
        >
          Load more
        </button>
      </div>
      <pre className="bg-gray-900 text-yellow-400 rounded p-2 text-xs mb-2">{`const obs = new MutationObserver(ms=>{\n  ms.forEach(m=>m.addedNodes.forEach(n=>{\n    if(n.dataset.flag) console.log("FLAG:", n.dataset.flag);\n  }));\n});\nobs.observe(document.querySelector(".product-list"), { childList:true });`}</pre>
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-700 text-white mb-2"
        placeholder="Enter the flag..."
        value={flagInput}
        onChange={e => setFlagInput(e.target.value)}
        disabled={effectiveCompleted}
      />
      <button 
        className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50" 
        onClick={checkFlag}
        disabled={isSubmitting || effectiveCompleted}
      >
        {isSubmitting ? 'Submitting...' : effectiveCompleted ? 'Completed' : 'Check Flag'}
      </button>
      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</div>
    </div>
  );
};

export default Challenge17DOMMutationObserver; 