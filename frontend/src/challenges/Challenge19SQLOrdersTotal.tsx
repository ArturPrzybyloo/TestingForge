import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'SQL-ORDERS-TOTAL-440';
const CHALLENGE_ID = 'sql-orders-total';
const CHALLENGE_POINTS = 30;

const Challenge19SQLOrdersTotal: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [sqlInput, setSqlInput] = useState('');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFlag, setShowFlag] = useState(false);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // Mock database data
  const ordersData = [
    { order_id: 1, customer_name: 'John Doe', amount: 150 },
    { order_id: 2, customer_name: 'Jane Smith', amount: 200 },
    { order_id: 3, customer_name: 'John Doe', amount: 75 },
    { order_id: 4, customer_name: 'Bob Johnson', amount: 300 },
    { order_id: 5, customer_name: 'John Doe', amount: 125 },
    { order_id: 6, customer_name: 'Alice Brown', amount: 180 },
    { order_id: 7, customer_name: 'John Doe', amount: 90 },
  ];

  const executeQuery = () => {
    try {
      const query = sqlInput.trim().toLowerCase();
      
      if (!query) {
        setQueryResult({ error: 'Please enter a SQL query' });
        return;
      }

      // Simple SQL parser for this specific challenge
      if (query.includes('select') && query.includes('sum') && query.includes('amount') && 
          query.includes('from') && query.includes('orders') && 
          query.includes('where') && query.includes('customer_name') && 
          query.includes('john doe')) {
        
        // Calculate the sum for John Doe
        const johnDoeOrders = ordersData.filter(order => order.customer_name === 'John Doe');
        const totalAmount = johnDoeOrders.reduce((sum, order) => sum + order.amount, 0);
        
        setQueryResult({
          success: true,
          data: [{ 'SUM(amount)': totalAmount }],
          message: `Query executed successfully. Total amount: ${totalAmount}`
        });
        
        if (totalAmount === 440) {
          setShowFlag(true);
          setFeedback('Excellent! You found the correct total. The flag is revealed!');
        }
      } else if (query.includes('select') && query.includes('*') && query.includes('from') && query.includes('orders')) {
        // Show all data if they want to explore
        setQueryResult({
          success: true,
          data: ordersData,
          message: 'Showing all orders data'
        });
      } else {
        setQueryResult({
          error: 'Invalid query. Make sure to use SELECT SUM(amount) FROM orders WHERE customer_name = \'John Doe\''
        });
      }
    } catch (error) {
      setQueryResult({ error: 'SQL syntax error' });
    }
  };

  const showHint = () => {
    setSqlInput("SELECT SUM(column_name) FROM table_name WHERE condition;");
    setQueryResult(null);
    setShowFlag(false);
    setFeedback('Hint: Use SUM() function with the amount column, filter by customer_name = \'John Doe\'');
  };

  const showTableStructure = () => {
    setSqlInput("SELECT * FROM orders;");
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
        SQL Orders Total Challenge
        {challengeCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        Calculate the total amount of all orders placed by "John Doe" using SQL SUM function.
      </p>
      
      <div className="mb-4 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-yellow-400 font-semibold mb-2">📊 Table Structure: orders</h3>
        <div className="font-mono text-sm text-gray-300">
          <div className="grid grid-cols-3 gap-4 mb-2 font-bold">
            <span>order_id</span>
            <span>customer_name</span>
            <span>amount</span>
          </div>
          <div className="text-gray-400">
            <div className="grid grid-cols-3 gap-4">
              <span>INTEGER</span>
              <span>VARCHAR</span>
              <span>DECIMAL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          SQL Query:
        </label>
        <textarea
          value={sqlInput}
          onChange={(e) => setSqlInput(e.target.value)}
          className="w-full h-32 p-3 rounded bg-gray-700 text-white font-mono text-sm"
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
          <h3 className="text-green-400 font-semibold mb-2">🎉 Correct! Flag Found!</h3>
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

      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : feedback.includes('Excellent') ? 'text-blue-400' : 'text-red-400'}`}>
        {feedback}
      </div>

      {!showFlag && !challengeCompleted && (
        <div className="mt-4 text-sm text-gray-400">
          💡 Hint: Use the SUM() function to calculate the total amount for all orders where customer_name equals 'John Doe'.
        </div>
      )}
    </div>
  );
};

export default Challenge19SQLOrdersTotal; 