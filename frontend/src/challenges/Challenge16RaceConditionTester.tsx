import React, { useState, useEffect } from 'react';

const FLAG = 'FLAG-RACE-ORDER';
const ENDPOINT = '/api/orders-mock.json';
const INITIAL_JSON = `{
  "orderId": 123,
  "product": "Book"
}`;

const Challenge16RaceConditionTester: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [jsonInput, setJsonInput] = useState(INITIAL_JSON);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Monkey-patch fetch tylko dla tego endpointu
  useEffect(() => {
    const origFetch = window.fetch;
    window.fetch = async (input, init) => {
      if (typeof input === 'string' && input.includes(ENDPOINT) && init?.method === 'POST') {
        try {
          const body = JSON.parse(init.body as string);
          if (body.flag === true) {
            return new Response(JSON.stringify({ orderFlag: FLAG }), { status: 200, headers: { 'Content-Type': 'application/json' } });
          } else {
            return new Response(JSON.stringify({ error: 'Missing flag' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
          }
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
      }
      return origFetch(input, init);
    };
    return () => { window.fetch = origFetch; };
  }, []);

  const handleSend = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonInput,
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (e) {
      setResponse('Error sending request');
    }
    setLoading(false);
  };

  const checkFlag = () => {
    if (flagInput.trim() === FLAG) {
      setFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 16: true }));
    } else {
      setFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 text-yellow-400">Order API Flag Challenge</h2>
      <p className="text-gray-300 mb-4">Edit the JSON below and add <b>"flag": true</b> as a property. Then send a POST request. If the server receives <b>flag: true</b>, it will return the flag in the response. Find the flag in the response and enter it below.</p>
      <div className="mb-4">
        <textarea
          className="w-full p-2 rounded bg-gray-700 text-white font-mono mb-2"
          rows={6}
          value={jsonInput}
          onChange={e => setJsonInput(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium" onClick={handleSend} disabled={loading}>
          {loading ? 'Sending...' : 'Send POST'}
        </button>
        <p className="mt-2 text-sm text-gray-400">(POST to <code>{ENDPOINT}</code> is mocked in the browser)</p>
        {response && <pre className="bg-gray-900 text-green-400 rounded p-2 mt-2 text-xs">{response}</pre>}
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

export default Challenge16RaceConditionTester; 