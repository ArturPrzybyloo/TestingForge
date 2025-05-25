import React, { useState, useEffect } from 'react';
import { markChallengeDone, isChallengeDone } from '../../utils/testerProgress';
import BackButton from '../../components/BackButton';

const CHALLENGE_ID = 5;
const CHALLENGE_POINTS = 50;

const Challenge5_HiddenCheckbox: React.FC = () => {
  const [checked, setChecked] = useState(isChallengeDone(CHALLENGE_ID));

  useEffect(() => {
    if (checked) markChallengeDone(CHALLENGE_ID, CHALLENGE_POINTS);
  }, [checked]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md bg-[#181c1b] border border-[#222] text-white font-mono px-6 py-8 mx-auto">
        <BackButton />
        <h2 className="text-2xl font-bold text-[#00FF66] mb-4">Challenge 5: Hidden Checkbox</h2>
        <div className="mb-4 text-[#00FF66]">
          <b>TIP:</b> Not everything is visible! Use DevTools to find and toggle the hidden checkbox.
        </div>
        <label className="block mb-4">
          <input
            type="checkbox"
            style={{ display: 'none' }}
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
          />
          <span className="text-gray-400">Can't see a switch? Maybe it's hidden…</span>
        </label>
        {checked && (
          <div className="mt-4 text-[#00FF66] font-mono">flag&#123;hidden-checkbox-5&#125; ✔️ (+{CHALLENGE_POINTS} pts)</div>
        )}
        <div className="text-gray-400 mt-6 text-sm">
          Hint: Change the <b>display</b> style in DevTools or toggle the checkbox programmatically.
        </div>
      </div>
    </div>
  );
};

export default Challenge5_HiddenCheckbox; 