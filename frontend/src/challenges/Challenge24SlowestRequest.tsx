import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'LOG-SLOWEST-ENDPOINT-/api/reports/generate';
const CHALLENGE_ID = 'slowest-request';
const CHALLENGE_POINTS = 40;
const TARGET_ENDPOINT = '/api/reports/generate';

const Challenge24SlowestRequest: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [endpointInput, setEndpointInput] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFlag, setShowFlag] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // Mock application logs data with response times
  const applicationLogs = [
    { timestamp: '2024-01-15 09:15:23', method: 'GET', url_path: '/api/users', status: 200, response_time: 145, user_id: 'user123' },
    { timestamp: '2024-01-15 09:16:45', method: 'POST', url_path: '/api/auth/login', status: 200, response_time: 89, user_id: 'user456' },
    { timestamp: '2024-01-15 09:17:12', method: 'GET', url_path: '/api/dashboard', status: 200, response_time: 234, user_id: 'user123' },
    { timestamp: '2024-01-15 09:18:33', method: 'GET', url_path: '/api/orders', status: 200, response_time: 312, user_id: 'user789' },
    { timestamp: '2024-01-15 09:19:44', method: 'POST', url_path: '/api/products', status: 500, response_time: 78, user_id: 'user456' },
    { timestamp: '2024-01-15 09:20:15', method: 'GET', url_path: '/api/reports/generate', status: 200, response_time: 2847, user_id: 'user123' },
    { timestamp: '2024-01-15 09:21:02', method: 'GET', url_path: '/api/users/profile', status: 200, response_time: 167, user_id: 'user789' },
    { timestamp: '2024-01-15 09:22:33', method: 'PUT', url_path: '/api/settings', status: 200, response_time: 91, user_id: 'user456' },
    { timestamp: '2024-01-15 09:23:44', method: 'GET', url_path: '/api/analytics', status: 200, response_time: 1245, user_id: 'user123' },
    { timestamp: '2024-01-15 09:24:55', method: 'DELETE', url_path: '/api/cache/clear', status: 200, response_time: 45, user_id: 'admin' },
    { timestamp: '2024-01-15 09:25:16', method: 'GET', url_path: '/api/notifications', status: 200, response_time: 156, user_id: 'user789' },
    { timestamp: '2024-01-15 09:26:27', method: 'POST', url_path: '/api/upload', status: 200, response_time: 1876, user_id: 'user456' },
    { timestamp: '2024-01-15 09:27:38', method: 'GET', url_path: '/api/search', status: 200, response_time: 423, user_id: 'user123' },
    { timestamp: '2024-01-15 09:28:49', method: 'GET', url_path: '/api/export/data', status: 200, response_time: 2156, user_id: 'user789' },
    { timestamp: '2024-01-15 09:29:15', method: 'POST', url_path: '/api/backup', status: 404, response_time: 76, user_id: 'admin' },
    { timestamp: '2024-01-15 09:30:26', method: 'GET', url_path: '/api/health', status: 200, response_time: 12, user_id: 'system' },
    { timestamp: '2024-01-15 09:31:37', method: 'GET', url_path: '/api/logs', status: 403, response_time: 79, user_id: 'user456' },
    { timestamp: '2024-01-15 09:32:48', method: 'PUT', url_path: '/api/user/update', status: 200, response_time: 234, user_id: 'user123' },
    { timestamp: '2024-01-15 09:33:59', method: 'GET', url_path: '/api/statistics', status: 200, response_time: 567, user_id: 'user789' },
    { timestamp: '2024-01-15 09:34:10', method: 'POST', url_path: '/api/email/send', status: 200, response_time: 445, user_id: 'user456' },
    { timestamp: '2024-01-15 09:35:21', method: 'GET', url_path: '/api/files/list', status: 200, response_time: 189, user_id: 'user123' },
    { timestamp: '2024-01-15 09:36:32', method: 'DELETE', url_path: '/api/temp/cleanup', status: 200, response_time: 67, user_id: 'system' },
    { timestamp: '2024-01-15 09:37:43', method: 'GET', url_path: '/api/metrics', status: 200, response_time: 334, user_id: 'admin' },
    { timestamp: '2024-01-15 09:38:54', method: 'POST', url_path: '/api/validate', status: 422, response_time: 89, user_id: 'user789' },
  ];

  const checkEndpoint = () => {
    if (!endpointInput.trim()) {
      setFeedback('Please enter an endpoint path');
      return;
    }

    if (endpointInput.trim() === TARGET_ENDPOINT) {
      setShowFlag(true);
      setFeedback('🎉 Correct! You found the slowest successful endpoint!');
    } else {
      setFeedback('❌ Incorrect endpoint. Look for the highest response_time with status 200.');
    }
  };

  const showHint = () => {
    setFeedback(`Performance Analysis Hint:
    
1. Filter logs for successful requests (status code 200 only)
2. Look at the response_time field for each successful request
3. Find the endpoint (url_path) with the highest response_time value
4. Ignore failed requests (status != 200) as they don't count

You can sort the logs by response_time to find the slowest one.`);
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
        Slowest Request Challenge
        {challengeCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        Analyze application logs to find the endpoint with the longest response time that completed successfully (status 200). 
        The flag will be revealed when you identify the correct endpoint.
      </p>
      
      <div className="mb-4 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-yellow-400 font-semibold mb-2">⏱️ Performance Analysis Task</h3>
        <p className="text-gray-300 text-sm mb-2">
          Search through the application logs below for requests that completed successfully (status 200).
          Find the endpoint (url_path) with the highest response_time value in milliseconds.
        </p>
        <button 
          onClick={() => setShowLogs(!showLogs)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          {showLogs ? 'Hide Application Logs' : 'Show Application Logs'}
        </button>
      </div>

      {showLogs && (
        <div className="mb-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-2">📈 Application Performance Logs</h3>
          <div className="bg-black p-3 rounded font-mono text-xs overflow-auto max-h-96">
            <div className="text-gray-400 mb-2">
              [TIMESTAMP] [METHOD] [URL_PATH] [STATUS] [RESPONSE_TIME_MS] [USER_ID]
            </div>
            {applicationLogs.map((log, index) => (
              <div 
                key={index} 
                className={`${log.status === 200 ? 'text-green-400' : log.status >= 400 ? 'text-red-400' : 'text-yellow-400'} mb-1`}
              >
                [{log.timestamp}] [{log.method}] [{log.url_path}] [{log.status}] [{log.response_time}ms] [{log.user_id}]
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Enter the slowest successful endpoint:
        </label>
        <input
          type="text"
          value={endpointInput}
          onChange={(e) => setEndpointInput(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white font-mono"
          placeholder="/api/endpoint/path"
          disabled={challengeCompleted || showFlag}
        />
        <div className="flex gap-2 mt-2">
          <button 
            onClick={checkEndpoint}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={challengeCompleted || showFlag}
          >
            Check Endpoint
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
          <h3 className="text-green-400 font-semibold mb-2">🎉 Performance Analysis Complete!</h3>
          <p className="text-white font-mono">Flag: {FLAG}</p>
          <p className="text-gray-300 text-sm mt-2">
            Endpoint {TARGET_ENDPOINT} had the longest response time (2847ms) among successful requests.
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
          💡 Tip: Focus on status 200 requests only. You can sort by response_time: 
          <code className="bg-gray-700 px-1 rounded">logs.filter(log =&gt; log.status === 200).sort((a,b) =&gt; b.response_time - a.response_time)</code>
        </div>
      )}
    </div>
  );
};

export default Challenge24SlowestRequest; 