import React, { useState } from 'react';

const Challenge6_AttributeFlag: React.FC = () => {
  const [input, setInput] = useState('');
  const [flag, setFlag] = useState(false);

  const correctFlag = 'flag{attr-inspect-6}';

  const check = (val: string) => {
    setInput(val);
    if (val === correctFlag) setFlag(true);
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-md max-w-md mx-auto my-8 text-white">
      <h2 className="font-display text-xl text-neon mb-2">Challenge 6: Flag in Attribute</h2>
      <div className="mb-4 text-accent">
        <b>TIP:</b> Sometimes the flag is hidden in an element's attribute. Use DevTools and look for <b>data-flag</b>!
      </div>
      <div className="mb-4">
        <span
          className="inline-block px-4 py-2 bg-dark2 rounded shadow"
          data-flag={correctFlag}
        >
          Right-click and Inspect this element!
        </span>
      </div>
      <input
        className="w-full px-4 py-2 rounded bg-dark2 border border-border text-white"
        placeholder="Enter the flag you found"
        value={input}
        onChange={e => check(e.target.value)}
        disabled={flag}
      />
      {flag && (
        <div className="mt-4 text-success font-mono">{correctFlag} ✔️</div>
      )}
      <div className="text-gray-400 mt-6 text-sm">
        Hint: Find the <b>data-flag</b> attribute in DevTools and enter the flag.
      </div>
    </div>
  );
};

export default Challenge6_AttributeFlag; 