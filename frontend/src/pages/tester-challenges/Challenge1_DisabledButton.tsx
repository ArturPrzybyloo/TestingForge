import React, { useState, useEffect } from 'react';
import { markChallengeDone, isChallengeDone } from '../../utils/testerProgress';
import BackButton from '../../components/BackButton';

const CHALLENGE_ID = 1;
const CHALLENGE_POINTS = 50;

const Challenge1_DisabledButton: React.FC = () => {
  const [flag, setFlag] = useState(isChallengeDone(CHALLENGE_ID));

  useEffect(() => {
    if (flag) markChallengeDone(CHALLENGE_ID, CHALLENGE_POINTS);
  }, [flag]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md bg-[#181c1b] border border-[#222] text-white font-mono px-6 py-8 mx-auto">
        <BackButton />
        <h2 className="text-2xl font-bold text-[#00FF66] mb-4">Challenge 1: Disabled-Look Button</h2>
        <div className="mb-4 text-[#00FF66]">
          <b>TIP:</b> Not everything that looks clickable is actually enabled. Try using DevTools or alternative ways to trigger the button!
        </div>
        <button
          className="w-full py-2 bg-[#00FF66] text-black font-bold rounded-none border border-[#00FF66] mb-4 opacity-100 cursor-pointer"
          disabled
          onClick={() => setFlag(true)}
        >
          Reveal Flag
        </button>
        {flag && (
          <div className="mt-4 text-[#00FF66] font-mono">flag&#123;devtools-bypass-1&#125; ✔️ (+{CHALLENGE_POINTS} pts)</div>
        )}
        <div className="text-gray-400 mt-6 text-sm">
          Hint: Try removing the <b>disabled</b> attribute in DevTools or triggering the click event programmatically.
        </div>
      </div>
    </div>
  );
};

export default Challenge1_DisabledButton; 