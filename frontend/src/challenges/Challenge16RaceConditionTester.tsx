import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'FLAG-BANK-HEIST';
const CHALLENGE_ID = 'race-condition-tester';
const CHALLENGE_POINTS = 35;

// Banking system simulation
interface Account {
  id: string;
  name: string;
  balance: number;
}

interface TransferLog {
  id: number;
  message: string;
  timestamp: number;
  type: 'info' | 'success' | 'error';
}

const Challenge16RaceConditionTester: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 'A', name: 'Alice', balance: 1000 },
    { id: 'B', name: 'Bob', balance: 500 },
    { id: 'C', name: 'Your Account', balance: 0 }
  ]);
  
  const [transferAmount, setTransferAmount] = useState('200');
  const [transferLogs, setTransferLogs] = useState<TransferLog[]>([]);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [step, setStep] = useState(1);
  const [raceConditionSuccess, setRaceConditionSuccess] = useState(false);
  const [normalTransferDone, setNormalTransferDone] = useState(false);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setAccounts([
        { id: 'A', name: 'Alice', balance: 1000 },
        { id: 'B', name: 'Bob', balance: 500 },
        { id: 'C', name: 'Your Account', balance: 0 }
      ]);
      setTransferAmount('200');
      setTransferLogs([]);
      setFlagInput('');
      setFeedback('');
      setStep(1);
      setRaceConditionSuccess(false);
      setNormalTransferDone(false);
    }
  }, [isRetakeMode]);

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const newLog: TransferLog = {
      id: Date.now() + Math.random(),
      message,
      timestamp: Date.now(),
      type
    };
    setTransferLogs(prev => [...prev, newLog]);
  };

  const simulateTransfer = async (from: string, to: string, amount: number, isRaceCondition: boolean = false): Promise<boolean> => {
    const fromAcc = accounts.find(a => a.id === from);
    const toAcc = accounts.find(a => a.id === to);
    
    if (!fromAcc || !toAcc) return false;
    
    const currentBalance = fromAcc.balance;
    addLog(`Checking balance: ${fromAcc.name} has $${currentBalance}`, 'info');
    
    // Simulate processing delay (vulnerability window)
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 50));
    
    // Check if we still have enough (vulnerable in race condition!)
    if (currentBalance >= amount) {
      // Update accounts
      setAccounts(prev => prev.map(acc => {
        if (acc.id === from) return { ...acc, balance: acc.balance - amount };
        if (acc.id === to) return { ...acc, balance: acc.balance + amount };
        return acc;
      }));
      
      addLog(`✅ Transfer successful: $${amount} from ${fromAcc.name} to ${toAcc.name}`, 'success');
      return true;
    } else {
      addLog(`❌ Transfer failed: Insufficient funds`, 'error');
      return false;
    }
  };

  const executeNormalTransfer = async () => {
    if (effectiveCompleted) return;
    
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      addLog(`❌ Invalid amount: ${transferAmount}`, 'error');
      return;
    }
    
    addLog(`🔄 Starting normal transfer: $${amount}`, 'info');
    await simulateTransfer('A', 'C', amount);
    
    setNormalTransferDone(true);
    setStep(2);
    setFeedback('Good! Now try the race condition attack to see what happens...');
  };

  const executeRaceCondition = async () => {
    if (effectiveCompleted) return;
    
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    addLog(`🚀 Starting race condition attack: 3 concurrent transfers of $${amount}`, 'info');
    
    // Execute 3 concurrent transfers from Alice to Your Account
    const promises = [
      simulateTransfer('A', 'C', amount, true),
      simulateTransfer('A', 'C', amount, true),
      simulateTransfer('A', 'C', amount, true)
    ];
    
    const results = await Promise.all(promises);
    const successCount = results.filter(r => r).length;
    
    if (successCount > 1) {
      const totalMoney = accounts.reduce((sum, acc) => sum + acc.balance, 0);
      addLog(`🎉 RACE CONDITION EXPLOIT SUCCESSFUL! ${successCount} transfers completed`, 'success');
      addLog(`💰 Money created: $${totalMoney - 1500}`, 'success');
      addLog(`🏆 Flag revealed: ${FLAG}`, 'success');
      setRaceConditionSuccess(true);
      setStep(3);
      setFeedback(`Amazing! You exploited the race condition and created $${totalMoney - 1500} out of thin air!`);
    } else {
      addLog(`⚠️ Race condition didn't work this time. Try again!`, 'info');
      setFeedback('Race conditions are timing-dependent. Try again - it might work on the next attempt!');
    }
  };

  const resetSimulation = () => {
    if (effectiveCompleted) return;
    
    setAccounts([
      { id: 'A', name: 'Alice', balance: 1000 },
      { id: 'B', name: 'Bob', balance: 500 },
      { id: 'C', name: 'Your Account', balance: 0 }
    ]);
    setTransferLogs([]);
    setStep(1);
    setRaceConditionSuccess(false);
    setNormalTransferDone(false);
    setFeedback('');
    addLog('🔄 Simulation reset', 'info');
  };

  const checkFlag = async () => {
    if (flagInput.trim() === FLAG) {
      const result = await submitFlag(CHALLENGE_ID, FLAG, CHALLENGE_POINTS);
      if (result.success) {
        if (result.isRetake || isRetakeMode) {
          setFeedback(`Retake completed! 🎉 You've mastered race conditions!`);
        } else {
          setFeedback(`Challenge passed! 🎉 (+${result.pointsEarned} pts) You're now a race condition expert!`);
        }
        if (onComplete) onComplete();
      } else {
        setFeedback(`Error: ${result.message}`);
      }
    } else {
      setFeedback('Incorrect flag. The flag should be visible in the logs after a successful race condition attack. ❌');
    }
  };

  const totalMoney = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-4xl mx-auto mt-8 ${
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-purple-400">
        Banking Race Condition Challenge
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      
      <div className="mb-6 p-4 bg-blue-900 border border-blue-500 rounded">
        <h3 className="text-lg font-semibold text-blue-300 mb-2">🎯 Your Mission</h3>
        <p className="text-blue-200 text-sm mb-2">
          You discovered a banking system with a race condition vulnerability. Your goal is to exploit it and create money out of thin air!
        </p>
        <div className="text-blue-200 text-sm">
          <p><strong>Step 1:</strong> Try a normal transfer first</p>
          <p><strong>Step 2:</strong> Then execute a race condition attack</p>
          <p><strong>Step 3:</strong> Extract the flag from the logs</p>
        </div>
      </div>

      {/* Account Balances */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {accounts.map(acc => (
          <div key={acc.id} className="bg-gray-700 rounded p-4 text-center">
            <h3 className="font-semibold text-blue-400 mb-1">{acc.name}</h3>
            <p className="text-2xl font-bold text-green-400">${acc.balance}</p>
          </div>
        ))}
      </div>
      
      <div className="mb-4 p-3 bg-yellow-900 border border-yellow-600 rounded">
        <p className="text-yellow-300 text-sm">
          <strong>Total Money in System:</strong> ${totalMoney}
          {totalMoney > 1500 && <span className="text-red-400 ml-2">⚠️ MONEY CREATED: +${totalMoney - 1500}</span>}
        </p>
      </div>

      {/* Transfer Controls */}
      <div className="mb-6 p-4 bg-gray-700 rounded">
        <h3 className="text-lg font-semibold text-white mb-3">Transfer Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Transfer Amount:</label>
            <input
              type="number"
              value={transferAmount}
              onChange={e => setTransferAmount(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white"
              disabled={effectiveCompleted}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">From: Alice → Your Account</label>
            <div className="text-gray-400 text-sm">Alice has ${accounts.find(a => a.id === 'A')?.balance || 0}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={executeNormalTransfer}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
              disabled={effectiveCompleted}
            >
              Normal Transfer
            </button>
            <button
              onClick={executeRaceCondition}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
              disabled={effectiveCompleted || !normalTransferDone}
            >
              🚀 Race Attack
            </button>
          </div>
        </div>
      </div>

      {step >= 2 && (
        <div className="mb-4 p-3 bg-purple-900 border border-purple-500 rounded">
          <p className="text-purple-300 text-sm">
            <strong>💡 How Race Conditions Work:</strong> The system checks Alice's balance, then waits (~100ms) for processing, 
            then deducts the money. If you send multiple transfers at the same time, they might all pass the balance check 
            before any of them deduct the money!
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={resetSimulation}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
          disabled={effectiveCompleted}
        >
          🔄 Reset
        </button>
        {step >= 2 && (
          <div className="text-sm text-gray-400 flex items-center">
            Keep trying the race attack - timing matters!
          </div>
        )}
      </div>

      {/* Transaction Logs */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">Transaction Logs</h3>
        <div className="bg-gray-900 rounded p-3 h-48 overflow-y-auto">
          {transferLogs.length === 0 ? (
            <p className="text-gray-500 text-sm">No transactions yet. Start with a normal transfer!</p>
          ) : (
            transferLogs.map(log => (
              <div key={log.id} className="text-xs mb-1">
                <span className="text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                <span className={`ml-2 ${
                  log.type === 'success' ? 'text-green-400' : 
                  log.type === 'error' ? 'text-red-400' : 'text-gray-300'
                }`}>
                  {log.message}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Flag Input */}
      {raceConditionSuccess && (
        <div className="mb-4 p-4 bg-green-900 border border-green-500 rounded">
          <h3 className="text-green-400 font-semibold mb-2">🎉 Race Condition Successful!</h3>
          <p className="text-green-300 text-sm mb-3">
            You've successfully exploited the race condition! The flag is visible in the transaction logs above.
          </p>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            placeholder="Enter the flag from the logs..."
            value={flagInput}
            onChange={e => setFlagInput(e.target.value)}
            disabled={effectiveCompleted}
          />
          <button 
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50" 
            onClick={checkFlag}
            disabled={isSubmitting || effectiveCompleted}
          >
            {isSubmitting ? 'Submitting...' : effectiveCompleted ? 'Completed' : 'Submit Flag'}
          </button>
        </div>
      )}

      <div className={`min-h-[24px] text-sm mt-2 ${
        feedback.includes('passed') || feedback.includes('Amazing') ? 'text-green-400' : 
        feedback.includes('❌') || feedback.includes('Error') ? 'text-red-400' : 'text-yellow-400'
      }`}>
        {feedback}
      </div>
    </div>
  );
};

export default Challenge16RaceConditionTester; 