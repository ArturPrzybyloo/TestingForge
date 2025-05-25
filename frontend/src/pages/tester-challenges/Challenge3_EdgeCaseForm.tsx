import React, { useState, useEffect } from 'react';
import { markChallengeDone, isChallengeDone } from '../../utils/testerProgress';
import BackButton from '../../components/BackButton';

const CHALLENGE_ID = 3;
const CHALLENGE_POINTS = 50;

const Challenge3_EdgeCaseForm: React.FC = () => {
  const [error, setError] = useState('');
  const [flag, setFlag] = useState(isChallengeDone(CHALLENGE_ID));

  useEffect(() => {
    if (flag) markChallengeDone(CHALLENGE_ID, CHALLENGE_POINTS);
  }, [flag]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    if (!e.target.elements.username.value) {
      setError('Error: flag{edge-case-form-3}');
      setFlag(true);
    } else {
      // @ts-ignore
      setError('Welcome, ' + e.target.elements.username.value + '!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md bg-[#181c1b] border border-[#222] text-white font-mono px-6 py-8 mx-auto">
        <BackButton />
        <h2 className="text-2xl font-bold text-[#00FF66] mb-4">Challenge 3: Edge Case Form</h2>
        <div className="mb-4 text-[#00FF66]">
          <b>TIP:</b> Don't always follow the happy path! Try submitting the form with an empty field.
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            className="w-full px-4 py-2 rounded-none bg-black border border-[#222] text-white font-mono"
            placeholder="Username"
            disabled={flag}
          />
          <button className="w-full py-2 bg-[#00FF66] text-black font-bold rounded-none border border-[#00FF66]" disabled={flag}>Submit</button>
        </form>
        {error && (
          <div className={`mt-4 font-mono ${flag ? 'text-[#00FF66]' : 'text-[#00FF66]/80'}`}>{error}{flag && ` (+${CHALLENGE_POINTS} pts)`}</div>
        )}
      </div>
    </div>
  );
};

export default Challenge3_EdgeCaseForm; 