import React, { useState, useEffect } from 'react';
import { markChallengeDone, isChallengeDone } from '../../utils/testerProgress';
import BackButton from '../../components/BackButton';

const CHALLENGE_ID = 4;
const CHALLENGE_POINTS = 50;

const Challenge4_SequenceClicks: React.FC = () => {
  const [seq, setSeq] = useState<string[]>([]);
  const [flag, setFlag] = useState(isChallengeDone(CHALLENGE_ID));

  useEffect(() => {
    if (flag) markChallengeDone(CHALLENGE_ID, CHALLENGE_POINTS);
  }, [flag]);

  const correct = ['red', 'green', 'blue'];

  const handleClick = (color: string) => {
    if (flag) return;
    const newSeq = [...seq, color].slice(-3);
    setSeq(newSeq);
    if (JSON.stringify(newSeq) === JSON.stringify(correct)) setFlag(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md bg-[#181c1b] border border-[#222] text-white font-mono px-6 py-8 mx-auto">
        <BackButton />
        <h2 className="text-2xl font-bold text-[#00FF66] mb-4">Challenge 4: Sequence Clicks</h2>
        <div className="mb-4 text-[#00FF66]">
          <b>TIP:</b> Sometimes order matters. Try clicking the buttons in different sequences!
        </div>
        <div className="flex gap-4 mb-6">
          <button onClick={() => handleClick('red')} className="w-16 h-16 rounded-none bg-red-500 border border-[#222]" />
          <button onClick={() => handleClick('green')} className="w-16 h-16 rounded-none bg-green-500 border border-[#222]" />
          <button onClick={() => handleClick('blue')} className="w-16 h-16 rounded-none bg-blue-500 border border-[#222]" />
        </div>
        {flag && (
          <div className="mt-4 text-[#00FF66] font-mono">flag&#123;sequence-4&#125; ✔️ (+{CHALLENGE_POINTS} pts)</div>
        )}
        <div className="text-gray-400 mt-6 text-sm">
          Hint: Try clicking red, then green, then blue.
        </div>
      </div>
    </div>
  );
};

export default Challenge4_SequenceClicks; 