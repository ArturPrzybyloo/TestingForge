import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'LOG-ANALYSIS-IP-192.168.1.45';
const CHALLENGE_ID = 'unauthorized-access-log';
const CHALLENGE_POINTS = 40;
const TARGET_IP = '192.168.1.45';

const Challenge23UnauthorizedAccessLog: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [ipInput, setIpInput] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFlag, setShowFlag] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // Mock server logs data
  const serverLogs = [
    { timestamp: '2024-01-15 08:15:23', ip: '192.168.1.10', method: 'POST', endpoint: '/api/login', status: 200, response_time: '145ms' },
    { timestamp: '2024-01-15 08:16:45', ip: '192.168.1.45', method: 'POST', endpoint: '/api/login', status: 401, response_time: '89ms' },
    { timestamp: '2024-01-15 08:17:12', ip: '10.0.0.5', method: 'GET', endpoint: '/dashboard', status: 200, response_time: '234ms' },
    { timestamp: '2024-01-15 08:18:33', ip: '192.168.1.45', method: 'POST', endpoint: '/api/login', status: 401, response_time: '92ms' },
    { timestamp: '2024-01-15 08:19:44', ip: '172.16.0.8', method: 'POST', endpoint: '/api/login', status: 401, response_time: '78ms' },
    { timestamp: '2024-01-15 08:20:15', ip: '192.168.1.45', method: 'POST', endpoint: '/api/login', status: 401, response_time: '85ms' },
    { timestamp: '2024-01-15 08:21:02', ip: '10.0.0.12', method: 'GET', endpoint: '/api/users', status: 200, response_time: '167ms' },
    { timestamp: '2024-01-15 08:22:33', ip: '192.168.1.45', method: 'POST', endpoint: '/api/login', status: 401, response_time: '91ms' },
    { timestamp: '2024-01-15 08:23:44', ip: '172.16.0.8', method: 'POST', endpoint: '/api/login', status: 401, response_time: '82ms' },
    { timestamp: '2024-01-15 08:24:55', ip: '192.168.1.45', method: 'POST', endpoint: '/api/login', status: 401, response_time: '88ms' },
    { timestamp: '2024-01-15 08:25:16', ip: '10.0.0.5', method: 'POST', endpoint: '/api/logout', status: 200, response_time: '45ms' },
    { timestamp: '2024-01-15 08:26:27', ip: '192.168.1.45', method: 'POST', endpoint: '/api/login', status: 401, response_time: '94ms' },
    { timestamp: '2024-01-15 08:27:38', ip: '172.16.0.8', method: 'GET', endpoint: '/profile', status: 200, response_time: '123ms' },
    { timestamp: '2024-01-15 08:28:49', ip: '192.168.1.45', method: 'POST', endpoint: '/api/login', status: 401, response_time: '87ms' },
    { timestamp: '2024-01-15 08:29:15', ip: '10.0.0.12', method: 'POST', endpoint: '/api/login', status: 401, response_time: '76ms' },
    { timestamp: '2024-01-15 08:30:26', ip: '192.168.1.45', method: 'POST', endpoint: '/api/login', status: 401, response_time: '93ms' },
    { timestamp: '2024-01-15 08:31:37', ip: '172.16.0.8', method: 'POST', endpoint: '/api/login', status: 401, response_time: '79ms' },
    { timestamp: '2024-01-15 08:32:48', ip: '192.168.1.45', method: 'POST', endpoint: '/api/login', status: 401, response_time: '90ms' },
    { timestamp: '2024-01-15 08:33:59', ip: '10.0.0.5', method: 'GET', endpoint: '/api/data', status: 200, response_time: '201ms' },
    { timestamp: '2024-01-15 08:34:10', ip: '192.168.1.45', method: 'POST', endpoint: '/api/login', status: 401, response_time: '86ms' },
    { timestamp: '2024-01-15 08:35:21', ip: '172.16.0.8', method: 'POST', endpoint: '/api/login', status: 200, response_time: '134ms' },
    { timestamp: '2024-01-15 08:36:32', ip: '192.168.1.10', method: 'GET', endpoint: '/settings', status: 200, response_time: '178ms' },
    { timestamp: '2024-01-15 08:37:43', ip: '10.0.0.12', method: 'POST', endpoint: '/api/login', status: 401, response_time: '81ms' },
    { timestamp: '2024-01-15 08:38:54', ip: '192.168.1.45', method: 'POST', endpoint: '/api/login', status: 401, response_time: '89ms' },
  ];

  const checkIP = () => {
    if (!ipInput.trim()) {
      setFeedback('Please enter an IP address');
      return;
    }

    if (ipInput.trim() === TARGET_IP) {
      setShowFlag(true);
      setFeedback('🎉 Correct! You found the IP with the most failed login attempts!');
    } else {
      setFeedback('❌ Incorrect IP address. Analyze the logs more carefully for 401 status codes.');
    }
  };

  const showHint = () => {
    setFeedback(`Analysis Hint:
    
1. Look for POST requests to /api/login with status code 401 (Unauthorized)
2. Count how many times each IP address appears with 401 status
3. The IP with the highest count of 401 responses is your answer
4. You can use browser DevTools console to help with analysis

Try filtering the logs by status code 401 and grouping by IP address.`);
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
    <div className={`bg-gray-800 rounded-xl p-4 md:p-6 border-2 max-w-6xl mx-auto mt-8 ${
      challengeCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        Unauthorized Access Log Challenge
        {challengeCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        Analyze server logs to find the IP address with the most failed login attempts (status code 401). 
        The flag will be revealed when you identify the correct IP.
      </p>
      
      <div className="mb-4 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-yellow-400 font-semibold mb-2">📊 Log Analysis Task</h3>
        <p className="text-gray-300 text-sm mb-2">
          Search through the server logs below for POST requests to /api/login that resulted in 401 (Unauthorized) status codes.
          Count the occurrences for each IP address and find the one with the most failed attempts.
        </p>
        <button 
          onClick={() => setShowLogs(!showLogs)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          {showLogs ? 'Hide Server Logs' : 'Show Server Logs'}
        </button>
      </div>

      {showLogs && (
        <div className="mb-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-2">🔍 Server Access Logs</h3>
          <div className="bg-black p-3 rounded font-mono text-xs overflow-auto max-h-96">
            <div className="text-gray-400 mb-2">
              [TIMESTAMP] [IP_ADDRESS] [METHOD] [ENDPOINT] [STATUS] [RESPONSE_TIME]
            </div>
            {serverLogs.map((log, index) => (
              <div 
                key={index} 
                className={`${log.status === 401 ? 'text-red-400' : 'text-green-400'} mb-1`}
              >
                [{log.timestamp}] [{log.ip}] [{log.method}] [{log.endpoint}] [{log.status}] [{log.response_time}]
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Enter the IP address with most 401 errors:
        </label>
        <input
          type="text"
          value={ipInput}
          onChange={(e) => setIpInput(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white font-mono"
          placeholder="192.168.x.x"
          disabled={challengeCompleted || showFlag}
        />
        <div className="flex gap-2 mt-2">
          <button 
            onClick={checkIP}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={challengeCompleted || showFlag}
          >
            Check IP Address
          </button>
          <button 
            onClick={showHint}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={challengeCompleted}
          >
            Show Hint
          </button>
        </div>
      </div>

      {showFlag && (
        <div className="mb-4 p-4 bg-green-900 border border-green-500 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-2">🎉 Analysis Complete!</h3>
          <p className="text-white font-mono">Flag: {FLAG}</p>
          <p className="text-gray-300 text-sm mt-2">
            IP {TARGET_IP} had the highest number of failed login attempts (status 401).
          </p>
        </div>
      )}

      {(showFlag || challengeCompleted) && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            disabled={challengeCompleted}
          />
          <button 
            onClick={checkFlag}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50"
            disabled={isSubmitting || challengeCompleted}
          >
            {isSubmitting ? 'Submitting...' : challengeCompleted ? 'Completed' : 'Submit Flag'}
          </button>
        </div>
      )}

      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : feedback.includes('Correct') ? 'text-blue-400' : 'text-red-400'}`}>
        <pre className="whitespace-pre-wrap">{feedback}</pre>
      </div>

      {!showFlag && !challengeCompleted && (
        <div className="mt-4 text-sm text-gray-400">
                     💡 Tip: Focus on POST requests to /api/login with status 401. You can use browser console to filter and count: 
           <code className="bg-gray-700 px-1 rounded">logs.filter(log =&gt; log.status === 401)</code>
        </div>
      )}
    </div>
  );
};

export default Challenge23UnauthorizedAccessLog; 