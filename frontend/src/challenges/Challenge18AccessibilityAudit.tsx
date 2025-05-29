import React, { useRef, useState, useEffect } from 'react';

const FLAG = 'FLAG_IMG_ALT_123';

const Challenge18AccessibilityAudit: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [flagVisible, setFlagVisible] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');

  // Sprawdzaj, czy alt został ustawiony przez DevTools
  useEffect(() => {
    const interval = setInterval(() => {
      if (imgRef.current && imgRef.current.getAttribute('alt') === FLAG) {
        setFlagVisible(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkFlag = () => {
    if (flagInput.trim() === FLAG) {
      setFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 18: true }));
    } else {
      setFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 text-blue-400">Accessibility Audit</h2>
      <p className="text-gray-300 mb-4">There is an image below <b>without alt attribute</b>. Use DevTools to add <code>alt="{FLAG}"</code> to the image. When the correct alt is set, the flag will appear below. Enter the flag to complete the challenge.</p>
      <div className="mb-4">
        <img ref={imgRef} src="https://placekitten.com/200/120" style={{borderRadius: 8}} />
        <p className="mt-2 text-sm text-gray-400">(Use DevTools → Elements to add alt to the image.)</p>
        {flagVisible && <div className="mt-4 text-green-400 font-mono text-lg">{FLAG}</div>}
      </div>
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-700 text-white mb-2"
        placeholder="Enter the flag..."
        value={flagInput}
        onChange={e => setFlagInput(e.target.value)}
      />
      <button className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={checkFlag}>Check Flag</button>
      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</div>
    </div>
  );
};

export default Challenge18AccessibilityAudit; 