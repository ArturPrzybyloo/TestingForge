import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'JSON-ANALYSIS-MASTER';
const CHALLENGE_ID = 'json-challenge';
const CHALLENGE_POINTS = 35;

const Challenge6Json: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [answers, setAnswers] = useState({
    question1: '', // Highest transaction amount
    question2: '', // User ID with most transactions
    question3: '', // Total completed transactions
    question4: '', // Average electronics transaction
    question5: ''  // Hidden API key
  });
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setAnswers({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: ''
      });
      setFlagInput('');
      setFeedback('');
      setCompletedQuestions([]);
    }
  }, [isRetakeMode]);

  // Complex JSON data for analysis
  const salesData = {
    "company": "TechMart Inc",
    "api_info": {
      "version": "3.2",
      "endpoint": "/sales-analytics",
      "secret_key": "api_key_7x9mK2pL",
      "auth_required": true
    },
    "customers": [
      {"id": 101, "name": "Sarah Wilson", "email": "sarah@email.com", "status": "premium", "joined": "2023-01-15"},
      {"id": 102, "name": "Mike Johnson", "email": "mike@email.com", "status": "regular", "joined": "2023-02-20"},
      {"id": 103, "name": "Emma Davis", "email": "emma@email.com", "status": "premium", "joined": "2023-03-10"},
      {"id": 104, "name": "John Smith", "email": "john@email.com", "status": "regular", "joined": "2023-04-05"},
      {"id": 105, "name": "Lisa Brown", "email": "lisa@email.com", "status": "premium", "joined": "2023-05-12"}
    ],
    "sales": [
      {"id": "s001", "customer_id": 101, "amount": 1299.99, "date": "2024-01-15", "category": "electronics", "status": "completed"},
      {"id": "s002", "customer_id": 102, "amount": 89.50, "date": "2024-01-16", "category": "books", "status": "completed"},
      {"id": "s003", "customer_id": 101, "amount": 249.99, "date": "2024-01-17", "category": "clothing", "status": "completed"},
      {"id": "s004", "customer_id": 103, "amount": 799.99, "date": "2024-01-18", "category": "electronics", "status": "completed"},
      {"id": "s005", "customer_id": 101, "amount": 45.00, "date": "2024-01-19", "category": "food", "status": "completed"},
      {"id": "s006", "customer_id": 104, "amount": 199.99, "date": "2024-01-20", "category": "clothing", "status": "pending"},
      {"id": "s007", "customer_id": 102, "amount": 125.00, "date": "2024-01-21", "category": "books", "status": "completed"},
      {"id": "s008", "customer_id": 101, "amount": 1899.99, "date": "2024-01-22", "category": "electronics", "status": "completed"},
      {"id": "s009", "customer_id": 103, "amount": 75.50, "date": "2024-01-23", "category": "food", "status": "completed"},
      {"id": "s010", "customer_id": 105, "amount": 599.99, "date": "2024-01-24", "category": "electronics", "status": "completed"},
      {"id": "s011", "customer_id": 102, "amount": 350.00, "date": "2024-01-25", "category": "electronics", "status": "completed"},
      {"id": "s012", "customer_id": 104, "amount": 25.99, "date": "2024-01-26", "category": "food", "status": "completed"},
      {"id": "s013", "customer_id": 103, "amount": 155.00, "date": "2024-01-27", "category": "clothing", "status": "failed"},
      {"id": "s014", "customer_id": 105, "amount": 425.00, "date": "2024-01-28", "category": "electronics", "status": "completed"}
    ]
  };

  const correctAnswers = {
    question1: "1899.99", // Highest completed transaction amount
    question2: "101", // Customer ID with most completed transactions (Sarah Wilson - 4 transactions)
    question3: "12", // Total number of completed transactions
    question4: "853.99", // Average amount of completed electronics transactions: (1299.99+799.99+1899.99+599.99+350.00+425.00)/6 = 853.996...
    question5: "api_key_7x9mK2pL" // Hidden API key in api_info
  };

  const handleAnswerChange = (questionKey: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionKey]: value
    }));
  };

  const checkAnswer = (questionNum: number, questionKey: string) => {
    const userAnswer = answers[questionKey as keyof typeof answers].trim();
    const correctAnswer = correctAnswers[questionKey as keyof typeof correctAnswers];
    
    if (userAnswer === correctAnswer) {
      setCompletedQuestions(prev => [...prev, questionNum]);
      setFeedback(`✓ Question ${questionNum} correct!`);
    } else {
      setFeedback(`✗ Question ${questionNum} incorrect. Try again.`);
    }
  };

  const allQuestionsComplete = completedQuestions.length === 5;

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
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-6xl mx-auto mt-8 ${
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        Sales Data Detective Challenge
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        You're a data analyst investigating suspicious sales patterns. Analyze the complex JSON dataset below and answer 5 critical questions to prove your analytical skills. No automated tools - pure manual analysis required!
        <span className="text-blue-400 font-bold"> ({CHALLENGE_POINTS} points)</span>
      </p>
      
      {/* Data Display */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Sales Data JSON:</h3>
        <div className="bg-gray-600 p-3 rounded font-mono text-xs text-green-400 max-h-72 overflow-auto">
          {JSON.stringify(salesData, null, 2)}
        </div>
        <div className="mt-2 text-sm text-gray-400">
          ⚠️ Manually analyze this data - no automated tools provided. Use your JSON analysis skills!
        </div>
      </div>

      {/* Questions */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Question 1 */}
        <div className={`p-4 rounded-lg border-2 ${completedQuestions.includes(1) ? 'border-green-500 bg-green-900' : 'border-gray-600 bg-gray-700'}`}>
          <h4 className="text-white font-semibold mb-2">Question 1:</h4>
          <p className="text-gray-300 text-sm mb-3">What is the highest amount among completed sales? (format: 1234.56)</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={answers.question1}
              onChange={(e) => handleAnswerChange('question1', e.target.value)}
              className="flex-1 p-2 rounded bg-gray-600 text-white text-sm"
              placeholder="Enter amount..."
              disabled={effectiveCompleted || completedQuestions.includes(1)}
            />
            <button 
              onClick={() => checkAnswer(1, 'question1')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50"
              disabled={effectiveCompleted || completedQuestions.includes(1)}
            >
              {completedQuestions.includes(1) ? '✓' : 'Check'}
            </button>
          </div>
        </div>

        {/* Question 2 */}
        <div className={`p-4 rounded-lg border-2 ${completedQuestions.includes(2) ? 'border-green-500 bg-green-900' : 'border-gray-600 bg-gray-700'}`}>
          <h4 className="text-white font-semibold mb-2">Question 2:</h4>
          <p className="text-gray-300 text-sm mb-3">Which customer ID has the most completed sales?</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={answers.question2}
              onChange={(e) => handleAnswerChange('question2', e.target.value)}
              className="flex-1 p-2 rounded bg-gray-600 text-white text-sm"
              placeholder="Enter customer ID..."
              disabled={effectiveCompleted || completedQuestions.includes(2)}
            />
            <button 
              onClick={() => checkAnswer(2, 'question2')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50"
              disabled={effectiveCompleted || completedQuestions.includes(2)}
            >
              {completedQuestions.includes(2) ? '✓' : 'Check'}
            </button>
          </div>
        </div>

        {/* Question 3 */}
        <div className={`p-4 rounded-lg border-2 ${completedQuestions.includes(3) ? 'border-green-500 bg-green-900' : 'border-gray-600 bg-gray-700'}`}>
          <h4 className="text-white font-semibold mb-2">Question 3:</h4>
          <p className="text-gray-300 text-sm mb-3">How many sales have status "completed"? (count only)</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={answers.question3}
              onChange={(e) => handleAnswerChange('question3', e.target.value)}
              className="flex-1 p-2 rounded bg-gray-600 text-white text-sm"
              placeholder="Enter count..."
              disabled={effectiveCompleted || completedQuestions.includes(3)}
            />
            <button 
              onClick={() => checkAnswer(3, 'question3')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50"
              disabled={effectiveCompleted || completedQuestions.includes(3)}
            >
              {completedQuestions.includes(3) ? '✓' : 'Check'}
            </button>
          </div>
        </div>

        {/* Question 4 */}
        <div className={`p-4 rounded-lg border-2 ${completedQuestions.includes(4) ? 'border-green-500 bg-green-900' : 'border-gray-600 bg-gray-700'}`}>
          <h4 className="text-white font-semibold mb-2">Question 4:</h4>
          <p className="text-gray-300 text-sm mb-3">What's the average amount of completed electronics sales? (format: 123.45)</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={answers.question4}
              onChange={(e) => handleAnswerChange('question4', e.target.value)}
              className="flex-1 p-2 rounded bg-gray-600 text-white text-sm"
              placeholder="Enter average..."
              disabled={effectiveCompleted || completedQuestions.includes(4)}
            />
            <button 
              onClick={() => checkAnswer(4, 'question4')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50"
              disabled={effectiveCompleted || completedQuestions.includes(4)}
            >
              {completedQuestions.includes(4) ? '✓' : 'Check'}
            </button>
          </div>
        </div>

        {/* Question 5 */}
        <div className={`p-4 rounded-lg border-2 ${completedQuestions.includes(5) ? 'border-green-500 bg-green-900' : 'border-gray-600 bg-gray-700'} md:col-span-2`}>
          <h4 className="text-white font-semibold mb-2">Question 5:</h4>
          <p className="text-gray-300 text-sm mb-3">What is the secret API key stored in api_info? (exact value)</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={answers.question5}
              onChange={(e) => handleAnswerChange('question5', e.target.value)}
              className="flex-1 p-2 rounded bg-gray-600 text-white text-sm"
              placeholder="Enter API key..."
              disabled={effectiveCompleted || completedQuestions.includes(5)}
            />
            <button 
              onClick={() => checkAnswer(5, 'question5')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50"
              disabled={effectiveCompleted || completedQuestions.includes(5)}
            >
              {completedQuestions.includes(5) ? '✓' : 'Check'}
            </button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6 p-4 bg-purple-900 border border-purple-500 rounded-lg">
        <h3 className="text-purple-400 font-semibold mb-3">Progress: {completedQuestions.length}/5 questions answered</h3>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`p-2 rounded text-center text-sm ${
              completedQuestions.includes(i) ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-400'
            }`}>
              Q{i} {completedQuestions.includes(i) ? '✓' : '?'}
            </div>
          ))}
        </div>
        {allQuestionsComplete && (
          <div className="mt-3 p-3 bg-green-800 rounded text-center">
            <p className="text-green-400 font-semibold">🎉 All questions answered correctly!</p>
            <p className="text-white font-mono mt-1">Your flag: {FLAG}</p>
          </div>
        )}
      </div>

      {/* Flag Submission */}
      {allQuestionsComplete && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter the complete flag..."
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            disabled={effectiveCompleted}
          />
          <button 
            onClick={checkFlag}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50"
            disabled={isSubmitting || effectiveCompleted}
          >
            {isSubmitting ? 'Submitting...' : effectiveCompleted ? 'Completed' : 'Submit Flag'}
          </button>
        </div>
      )}

      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : feedback.includes('✓') ? 'text-blue-400' : 'text-red-400'}`}>
        {feedback}
      </div>

      {!allQuestionsComplete && (
        <div className="mt-4 text-sm text-gray-400">
          💡 Analyze the JSON data carefully and answer all 5 questions correctly to unlock the flag. No shortcuts!
        </div>
      )}
    </div>
  );
};

export default Challenge6Json; 