import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'SQL-LOGIN-FREQ-USER-1001';
const CHALLENGE_ID = 'sql-login-frequency';
const CHALLENGE_POINTS = 40;

const Challenge20SQLLoginFrequency: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [sqlInput, setSqlInput] = useState('');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFlag, setShowFlag] = useState(false);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // Mock database data - 30 days ago to today
  const getDateDaysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  };

  const loginsData = [
    // User 1001 - Most frequent (8 logins in last 30 days)
    { user_id: 1001, login_date: getDateDaysAgo(2) },
    { user_id: 1001, login_date: getDateDaysAgo(5) },
    { user_id: 1001, login_date: getDateDaysAgo(8) },
    { user_id: 1001, login_date: getDateDaysAgo(12) },
    { user_id: 1001, login_date: getDateDaysAgo(15) },
    { user_id: 1001, login_date: getDateDaysAgo(18) },
    { user_id: 1001, login_date: getDateDaysAgo(22) },
    { user_id: 1001, login_date: getDateDaysAgo(28) },
    
    // User 1002 - Second most frequent (6 logins)
    { user_id: 1002, login_date: getDateDaysAgo(1) },
    { user_id: 1002, login_date: getDateDaysAgo(7) },
    { user_id: 1002, login_date: getDateDaysAgo(14) },
    { user_id: 1002, login_date: getDateDaysAgo(20) },
    { user_id: 1002, login_date: getDateDaysAgo(25) },
    { user_id: 1002, login_date: getDateDaysAgo(29) },
    
    // User 1003 - Less frequent (4 logins)
    { user_id: 1003, login_date: getDateDaysAgo(3) },
    { user_id: 1003, login_date: getDateDaysAgo(10) },
    { user_id: 1003, login_date: getDateDaysAgo(17) },
    { user_id: 1003, login_date: getDateDaysAgo(24) },
    
    // User 1004 - Least frequent (2 logins)
    { user_id: 1004, login_date: getDateDaysAgo(6) },
    { user_id: 1004, login_date: getDateDaysAgo(19) },
    
    // Old logins (more than 30 days ago) - should be excluded
    { user_id: 1005, login_date: getDateDaysAgo(35) },
    { user_id: 1005, login_date: getDateDaysAgo(40) },
  ];

  const executeQuery = () => {
    try {
      const query = sqlInput.trim().toLowerCase();
      
      if (!query) {
        setQueryResult({ error: 'Please enter a SQL query' });
        return;
      }

      // Check for proper SQL structure
      if (query.includes('select') && query.includes('user_id') && 
          query.includes('from') && query.includes('logins') && 
          query.includes('where') && query.includes('login_date') && 
          query.includes('group by') && query.includes('user_id') && 
          query.includes('order by') && query.includes('count') && 
          query.includes('desc') && query.includes('limit')) {
        
        // Filter data for last 30 days
        const thirtyDaysAgo = getDateDaysAgo(30);
        const recentLogins = loginsData.filter(login => login.login_date >= thirtyDaysAgo);
        
        // Group by user_id and count
        const userCounts = recentLogins.reduce((acc: any, login) => {
          acc[login.user_id] = (acc[login.user_id] || 0) + 1;
          return acc;
        }, {});
        
        // Sort by count descending and get top user
        const sortedUsers = Object.entries(userCounts)
          .map(([user_id, count]) => ({ user_id: parseInt(user_id), count }))
          .sort((a: any, b: any) => b.count - a.count);
        
        const topUser = sortedUsers[0];
        
        setQueryResult({
          success: true,
          data: [{ user_id: topUser.user_id }],
          message: `Query executed successfully. Most frequent user: ${topUser.user_id} with ${topUser.count} logins`
        });
        
        if (topUser.user_id === 1001) {
          setShowFlag(true);
          setFeedback('Perfect! You found the user with the most frequent logins. The flag is revealed!');
        }
      } else if (query.includes('select') && query.includes('*') && query.includes('from') && query.includes('logins')) {
        // Show all data if they want to explore
        setQueryResult({
          success: true,
          data: loginsData,
          message: 'Showing all login data'
        });
      } else if (query.includes('select') && query.includes('count') && !query.includes('group by')) {
        setQueryResult({
          error: 'Remember to use GROUP BY when using aggregate functions like COUNT()'
        });
      } else {
        setQueryResult({
          error: 'Invalid query. Make sure to use SELECT, FROM, WHERE (with date filter), GROUP BY, ORDER BY, and LIMIT'
        });
      }
    } catch (error) {
      setQueryResult({ error: 'SQL syntax error' });
    }
  };

  const showHint = () => {
    setSqlInput(`SELECT user_id FROM logins
WHERE login_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY user_id
ORDER BY COUNT(*) DESC
LIMIT ?;`);
    setQueryResult(null);
    setShowFlag(false);
    setFeedback('Hint: Use GROUP BY user_id, ORDER BY COUNT(*) DESC, and LIMIT to get the top user. Replace ? with 1.');
  };

  const showTableStructure = () => {
    setSqlInput("SELECT * FROM logins;");
    setQueryResult(null);
    setFeedback('Table structure query loaded. This will show you all the data.');
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
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-4xl mx-auto mt-8 ${
      challengeCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        SQL Login Frequency Challenge
        {challengeCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        Find the user_id of the user who logged in most frequently in the last 30 days using GROUP BY, COUNT, and ORDER BY.
      </p>
      
      <div className="mb-4 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-yellow-400 font-semibold mb-2">📊 Table Structure: logins</h3>
        <div className="font-mono text-sm text-gray-300">
          <div className="grid grid-cols-2 gap-4 mb-2 font-bold">
            <span>user_id</span>
            <span>login_date</span>
          </div>
          <div className="text-gray-400">
            <div className="grid grid-cols-2 gap-4">
              <span>INTEGER</span>
              <span>DATE</span>
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-400">
          <p>💡 Remember: You need to filter for the last 30 days using DATE_SUB or similar date functions.</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          SQL Query:
        </label>
        <textarea
          value={sqlInput}
          onChange={(e) => setSqlInput(e.target.value)}
          className="w-full h-40 p-3 rounded bg-gray-700 text-white font-mono text-sm"
          placeholder="Enter your SQL query here..."
          disabled={challengeCompleted}
        />
        <div className="flex gap-2 mt-2">
          <button 
            onClick={executeQuery}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={challengeCompleted}
          >
            Execute Query
          </button>
          <button 
            onClick={showHint}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={challengeCompleted}
          >
            Show Hint
          </button>
          <button 
            onClick={showTableStructure}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={challengeCompleted}
          >
            Show All Data
          </button>
        </div>
      </div>

      {queryResult && (
        <div className="mb-4 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-2">Query Result:</h3>
          {queryResult.error ? (
            <div className="text-red-400 font-mono text-sm">{queryResult.error}</div>
          ) : (
            <div>
              <div className="text-green-400 mb-2">{queryResult.message}</div>
              <div className="bg-gray-800 p-3 rounded font-mono text-sm overflow-auto">
                <pre>{JSON.stringify(queryResult.data, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      )}

      {showFlag && (
        <div className="mb-4 p-4 bg-green-900 border border-green-500 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-2">🎉 Excellent! Flag Found!</h3>
          <p className="text-white font-mono">Flag: {FLAG}</p>
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

      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : feedback.includes('Perfect') ? 'text-blue-400' : 'text-red-400'}`}>
        {feedback}
      </div>

      {!showFlag && !challengeCompleted && (
        <div className="mt-4 text-sm text-gray-400">
          💡 Hint: Use GROUP BY user_id, COUNT(*) to count logins, ORDER BY COUNT(*) DESC to sort by frequency, and LIMIT 1 to get the top user.
        </div>
      )}
    </div>
  );
};

export default Challenge20SQLLoginFrequency; 