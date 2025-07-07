import React, { useState } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'FLAG-FUZZ-MASTER';
const CHALLENGE_ID = 'form-input-fuzzer';
const CHALLENGE_POINTS = 55;

// Vulnerable form endpoints that respond differently to different payloads
const VULNERABLE_PAYLOADS = [
  { payload: '<script>alert("xss")</script>', type: 'XSS', endpoint: 'contact' },
  { payload: "'; DROP TABLE users; --", type: 'SQL_INJECTION', endpoint: 'login' },
  { payload: 'A'.repeat(1000), type: 'BUFFER_OVERFLOW', endpoint: 'profile' },
  { payload: '{{7*7}}', type: 'TEMPLATE_INJECTION', endpoint: 'comments' },
  { payload: '../../../etc/passwd', type: 'PATH_TRAVERSAL', endpoint: 'upload' }
];

const Challenge15FormInputFuzzer: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('contact');
  const [inputValue, setInputValue] = useState('');
  const [responses, setResponses] = useState<{[key: string]: string}>({});
  const [foundVulnerabilities, setFoundVulnerabilities] = useState<string[]>([]);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setSelectedEndpoint('contact');
      setInputValue('');
      setResponses({});
      setFoundVulnerabilities([]);
      setFlagInput('');
      setFeedback('');
      setShowHint(false);
    }
  }, [isRetakeMode]);

  const simulateRequest = () => {
    if (effectiveCompleted) return;
    
    const responseKey = `${selectedEndpoint}-${inputValue}`;
    
    // Check if this input triggers any vulnerability
    const vulnerability = VULNERABLE_PAYLOADS.find(v => 
      v.endpoint === selectedEndpoint && inputValue.includes(v.payload)
    );
    
    let response = '';
    if (vulnerability) {
      // Simulate vulnerable response
      switch (vulnerability.type) {
        case 'XSS':
          response = `Status: 200 OK\nContent-Type: text/html\nResponse: <div>Comment: ${inputValue}</div>\n⚠️ VULNERABILITY DETECTED: Unescaped HTML in response!`;
          break;
        case 'SQL_INJECTION':
          response = `Status: 500 Internal Server Error\nError: SQL syntax error near '${inputValue}'\nStack trace: SQLException at line 42...\n⚠️ VULNERABILITY DETECTED: SQL injection possible!`;
          break;
        case 'BUFFER_OVERFLOW':
          response = `Status: 500 Internal Server Error\nError: Buffer overflow detected\nSegmentation fault (core dumped)\n⚠️ VULNERABILITY DETECTED: Buffer overflow!`;
          break;
        case 'TEMPLATE_INJECTION':
          response = `Status: 200 OK\nProcessed: ${inputValue.replace('{{7*7}}', '49')}\n⚠️ VULNERABILITY DETECTED: Template injection - expression evaluated!`;
          break;
        case 'PATH_TRAVERSAL':
          response = `Status: 200 OK\nFile contents: root:x:0:0:root:/root:/bin/bash\n⚠️ VULNERABILITY DETECTED: Path traversal successful!`;
          break;
        default:
          response = 'Status: 200 OK\nResponse: Normal response';
      }
      
      if (!foundVulnerabilities.includes(vulnerability.type)) {
        setFoundVulnerabilities(prev => [...prev, vulnerability.type]);
      }
    } else {
      // Normal response
      response = `Status: 200 OK\nResponse: Input processed successfully\nData: ${inputValue.substring(0, 50)}${inputValue.length > 50 ? '...' : ''}`;
    }
    
    setResponses(prev => ({ ...prev, [responseKey]: response }));
  };

  const checkFlag = async () => {
    if (flagInput.trim() === FLAG) {
      const result = await submitFlag(CHALLENGE_ID, FLAG, CHALLENGE_POINTS);
      if (result.success) {
        if (result.isRetake || isRetakeMode) {
          setFeedback(`Retake completed! 🎉 Practice makes perfect!`);
        } else {
          setFeedback(`Challenge passed! 🎉 (+${result.pointsEarned} pts)`);
        }
        if (onComplete) onComplete();
      } else {
        setFeedback(`Error: ${result.message}`);
      }
    } else {
      setFeedback('Incorrect flag, try again. ❌');
    }
  };

  const allVulnerabilitiesFound = foundVulnerabilities.length === 5;

  return (
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-2xl mx-auto mt-8 ${
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-red-400">
        Form Input Fuzzer Challenge
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        You're testing a web application for security vulnerabilities. Use different fuzzing payloads to find <b>all 5 vulnerabilities</b> across different endpoints. Each endpoint may be vulnerable to different types of attacks.
      </p>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Select Endpoint:</label>
        <select
          value={selectedEndpoint}
          onChange={e => setSelectedEndpoint(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white mb-2"
          disabled={effectiveCompleted}
        >
          <option value="contact">POST /api/contact</option>
          <option value="login">POST /api/login</option>
          <option value="profile">PUT /api/profile</option>
          <option value="comments">POST /api/comments</option>
          <option value="upload">POST /api/upload</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Payload:</label>
        <textarea
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white mb-2 h-20 font-mono text-sm"
          placeholder="Enter your fuzzing payload here..."
          disabled={effectiveCompleted}
        />
        <button 
          className="w-full mb-2 bg-red-500 hover:bg-red-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50" 
          onClick={simulateRequest}
          disabled={effectiveCompleted}
        >
          🔍 Send Request
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">Response:</h3>
        <div className="bg-gray-900 rounded p-3 h-32 overflow-y-auto">
          {Object.entries(responses).length === 0 ? (
            <p className="text-gray-500 text-sm">No requests sent yet...</p>
          ) : (
            Object.entries(responses).slice(-1).map(([key, response]) => (
              <pre key={key} className="text-xs text-green-400 whitespace-pre-wrap">
                {response}
              </pre>
            ))
          )}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">
          Vulnerabilities Found: {foundVulnerabilities.length}/5
        </h3>
        <div className="flex flex-wrap gap-2">
          {['XSS', 'SQL_INJECTION', 'BUFFER_OVERFLOW', 'TEMPLATE_INJECTION', 'PATH_TRAVERSAL'].map(vuln => (
            <span
              key={vuln}
              className={`px-2 py-1 rounded text-xs ${
                foundVulnerabilities.includes(vuln) 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-600 text-gray-400'
              }`}
            >
              {vuln.replace('_', ' ')}
            </span>
          ))}
        </div>
      </div>

      {allVulnerabilitiesFound && (
        <div className="mb-4 p-3 bg-green-900 border border-green-500 rounded">
          <p className="text-green-400 font-semibold">🎉 All vulnerabilities found!</p>
          <p className="text-green-300 text-sm">Flag: <span className="font-mono">{FLAG}</span></p>
        </div>
      )}

      <button 
        className="text-sm text-blue-300 underline mb-4" 
        onClick={() => setShowHint(!showHint)}
        disabled={effectiveCompleted}
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>
      
      {showHint && (
        <div className="mb-4 text-blue-200 bg-gray-700 rounded p-3 text-sm">
          <p><b>Hint:</b> Try these attack vectors:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>XSS: HTML/JavaScript injection</li>
            <li>SQL Injection: Database query manipulation</li>
            <li>Buffer Overflow: Extremely long strings</li>
            <li>Template Injection: Expression language payloads</li>
            <li>Path Traversal: Directory traversal sequences</li>
          </ul>
        </div>
      )}

      {allVulnerabilitiesFound && (
        <div className="mt-4">
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={e => setFlagInput(e.target.value)}
            disabled={effectiveCompleted}
          />
          <button 
            className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50" 
            onClick={checkFlag}
            disabled={isSubmitting || effectiveCompleted}
          >
            {isSubmitting ? 'Submitting...' : effectiveCompleted ? 'Completed' : 'Check Flag'}
          </button>
          <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</div>
        </div>
      )}
    </div>
  );
};

export default Challenge15FormInputFuzzer; 