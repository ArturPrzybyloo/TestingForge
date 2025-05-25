import React, { useRef, useState } from 'react';

const FLAG = 'FLAG-UI-INVISIBLE-BUTTON';

const Challenge3UIBug: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFlag, setShowFlag] = useState(false);
  const [shake, setShake] = useState(false);
  const fakeBtnRef = useRef<HTMLButtonElement>(null);
  const realBtnRef = useRef<HTMLButtonElement>(null);
  const [flagInput, setFlagInput] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');

  // Animate fake button on click
  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback('Error: submission failed.');
    setShake(true);
    setTimeout(() => setShake(false), 350);
  };

  // Reveal flag on real submit
  const handleRealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFlag(true);
    setFeedback('');
    if (onComplete) onComplete();
  };

  const handleFlagCheck = () => {
    if (flagInput.trim() === FLAG) {
      setFlagFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 3: true }));
    } else {
      setFlagFeedback('Incorrect flag, try again. ❌');
    }
  };

  // Allow keyboard navigation to hidden button
  // (tab order: email input -> fake button -> real button)

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-green-400">UI Bug Hunt: Lost Submit Button</h2>
      <p className="text-gray-300 mb-6">
        This form has a visual bug — the real submit button is hidden or misaligned. Can you find it and click it to reveal the flag?
      </p>
      <form className="flex flex-col gap-5 relative" autoComplete="off">
        <div>
          <label htmlFor="email" className="block text-blue-400 mb-1 font-medium">Email</label>
          <input
            id="email"
            type="email"
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-400 outline-none font-mono"
            placeholder="Enter your email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>
        {/* Fake Submit Button */}
        <button
          ref={fakeBtnRef}
          type="button"
          className={`btn-fake w-full py-3 rounded-lg font-semibold text-white bg-green-500 hover:bg-green-600 shadow transition-colors text-lg relative ${shake ? 'animate-shake' : ''}`}
          onClick={handleFakeSubmit}
          tabIndex={0}
          onMouseOver={e => { e.currentTarget.title = 'Still broken?'; }}
        >
          Submit
        </button>
        {/* Real Hidden Submit Button (accessible via Tab) */}
        <button
          ref={realBtnRef}
          type="submit"
          aria-label="hidden-submit"
          className="absolute opacity-0 left-0 top-0 w-1 h-1 z-0 focus:opacity-100 focus:z-10 focus:w-full focus:h-12 focus:rounded-lg focus:bg-blue-500 focus:text-white focus:font-bold transition-all duration-200"
          style={{ pointerEvents: 'auto' }}
          onClick={handleRealSubmit}
          tabIndex={0}
        >
          (Real) Submit
        </button>
      </form>
      <div className={`feedback mt-4 min-h-[24px] text-base ${feedback.includes('Error') ? 'text-red-500' : 'text-green-400'}`}>{feedback}</div>
      {showFlag && (
        <>
          <div className="mt-6 p-4 bg-gray-900 border border-green-500 rounded-lg text-green-400 font-mono text-lg text-center select-all">
            {FLAG}
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white mb-2"
              placeholder="Enter the flag..."
              value={flagInput}
              onChange={e => setFlagInput(e.target.value)}
            />
            <button className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={handleFlagCheck}>Check Flag</button>
            <div className={`min-h-[24px] text-sm ${flagFeedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{flagFeedback}</div>
          </div>
        </>
      )}
      <style>{`
        .btn-fake.animate-shake {
          animation: shake 0.3s;
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-7px); }
          40% { transform: translateX(7px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Challenge3UIBug; 