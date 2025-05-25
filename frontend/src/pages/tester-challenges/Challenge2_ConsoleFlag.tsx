import React, { useEffect, useState } from 'react';
import { markChallengeDone, isChallengeDone } from '../../utils/testerProgress';
import BackButton from '../../components/BackButton';

const CHALLENGE_ID = 2;
const CHALLENGE_POINTS = 50;

const Challenge2_ConsoleFlag: React.FC = () => {
  const [shown, setShown] = useState(isChallengeDone(CHALLENGE_ID));

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('%cflag{console-debug-2}', 'color:#39ff14;font-size:1.2em;');
    if (shown) markChallengeDone(CHALLENGE_ID, CHALLENGE_POINTS);
  }, [shown]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md bg-[#181c1b] border border-[#222] text-white font-mono px-6 py-8 mx-auto">
        <BackButton />
        <h2 className="text-2xl font-bold text-[#00FF66] mb-4">Challenge 2: Flag in the Console</h2>
        <div className="mb-4 text-[#00FF66]">
          <b>TIP:</b> Testers often use the browser console to debug! Open DevTools and check the <b>Console</b> tab.
        </div>
        <button
          className="w-full py-2 bg-[#00FF66] text-black font-bold rounded-none border border-[#00FF66] mb-4"
          onClick={() => setShown(true)}
          disabled={shown}
        >
          I found the flag!
        </button>
        {shown && (
          <div className="mt-4 text-[#00FF66] font-mono">flag&#123;console-debug-2&#125; ✔️ (+{CHALLENGE_POINTS} pts)</div>
        )}
      </div>
    </div>
  );
};

export default Challenge2_ConsoleFlag; 