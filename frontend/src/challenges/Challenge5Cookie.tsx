import React, { useState, useEffect } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'ADVANCED-COOKIE-AUTH-BYPASS';
const CHALLENGE_ID = 'advanced-cookie-auth';
const CHALLENGE_POINTS = 75;

const Challenge5Cookie: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [userLevel, setUserLevel] = useState<'none' | 'user' | 'admin'>('none');
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [currentCookies, setCurrentCookies] = useState('');
  const [validationSteps, setValidationSteps] = useState<string[]>([]);

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setUserLevel('none');
      setFlagInput('');
      setFeedback('');
      setShowAdminPanel(false);
      setLoginAttempts(0);
      setCurrentCookies('');
      setValidationSteps([]);
      // Clear all challenge cookies when in retake mode
      document.cookie = "usr_sess=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = "acc_lvl=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = "jwt_tok=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = "ts_val=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = "sig_hash=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
  }, [isRetakeMode]);

  // Check cookies periodically with complex validation
  useEffect(() => {
    const checkCookies = () => {
      const cookies = document.cookie;
      setCurrentCookies(cookies);
      
      // Parse cookies
      const cookieObj: {[key: string]: string} = {};
      cookies.split(';').forEach(cookie => {
        const [key, value] = cookie.trim().split('=');
        if (key && value) cookieObj[key] = value;
      });

      const steps: string[] = [];
      let isValid = true;

      // Step 1: Check if user session exists
      if (cookieObj['usr_sess']) {
        steps.push('✓ User session found');
      } else {
        steps.push('✗ User session missing');
        isValid = false;
      }

      // Step 2: Check access level
      if (cookieObj['acc_lvl']) {
        if (cookieObj['acc_lvl'] === 'admin') {
          steps.push('✓ Admin access level detected');
        } else {
          steps.push('✗ Admin access level required');
          isValid = false;
        }
      } else {
        steps.push('✗ Access level cookie missing');
        isValid = false;
      }

      // Step 3: Check JWT token structure
      if (cookieObj['jwt_tok']) {
        try {
          const parts = cookieObj['jwt_tok'].split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            if (payload.role === 'admin' && payload.permissions === 'all') {
              steps.push('✓ Valid JWT token with admin permissions');
            } else {
              steps.push('✗ JWT token missing admin permissions');
              isValid = false;
            }
          } else {
            steps.push('✗ Invalid JWT token structure');
            isValid = false;
          }
        } catch (e) {
          steps.push('✗ JWT token parsing failed');
          isValid = false;
        }
      } else {
        steps.push('✗ JWT token missing');
        isValid = false;
      }

      // Step 4: Check timestamp validation
      if (cookieObj['ts_val']) {
        const timestamp = parseInt(cookieObj['ts_val']);
        const now = Date.now();
        const diff = Math.abs(now - timestamp);
        if (diff < 300000) { // 5 minutes
          steps.push('✓ Timestamp validation passed');
        } else {
          steps.push('✗ Timestamp validation failed (too old)');
          isValid = false;
        }
      } else {
        steps.push('✗ Timestamp validation cookie missing');
        isValid = false;
      }

      // Step 5: Check signature hash
      if (cookieObj['sig_hash']) {
        const expectedHash = btoa(`admin:${cookieObj['ts_val']}:secret_key`);
        if (cookieObj['sig_hash'] === expectedHash) {
          steps.push('✓ Signature hash verified');
        } else {
          steps.push('✗ Invalid signature hash');
          isValid = false;
        }
      } else {
        steps.push('✗ Signature hash missing');
        isValid = false;
      }

      setValidationSteps(steps);

      if (isValid) {
        setUserLevel('admin');
        setShowAdminPanel(true);
      } else if (cookieObj['usr_sess']) {
        setUserLevel('user');
        setShowAdminPanel(false);
      } else {
        setUserLevel('none');
        setShowAdminPanel(false);
      }
    };

    checkCookies();
    const interval = setInterval(checkCookies, 1000);
    return () => clearInterval(interval);
  }, []);

  const loginAsUser = () => {
    const timestamp = Date.now();
    // Set basic user session with obfuscated names
    document.cookie = `usr_sess=sess_${Math.random().toString(36).substring(7)}; path=/`;
    document.cookie = "acc_lvl=user; path=/";
    document.cookie = "jwt_tok=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsInJvbGUiOiJ1c2VyIiwicGVybWlzc2lvbnMiOiJyZWFkIn0.fake_signature; path=/";
    document.cookie = `ts_val=${timestamp}; path=/`;
    document.cookie = `sig_hash=${btoa(`user:${timestamp}:secret_key`)}; path=/`;
    
    setUserLevel('user');
    setLoginAttempts(prev => prev + 1);
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
    <div className={`bg-gray-800 rounded-xl p-6 border-2 max-w-5xl mx-auto mt-8 ${
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-red-400">
        Advanced Cookie Authentication Bypass
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        This enterprise-grade application uses multi-layered cookie authentication with JWT tokens, timestamp validation, and signature verification. 
        Your mission: bypass ALL security layers to gain administrator access. <span className="text-red-400 font-bold">({CHALLENGE_POINTS} points)</span>
      </p>
      
      {/* Mock Login System */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">🔐 Enterprise Security Portal</h3>
        <div className="flex items-center gap-4">
          <button 
            onClick={loginAsUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={effectiveCompleted}
          >
            Login as Standard User
          </button>
          <div className="text-sm text-gray-400">
            {loginAttempts > 0 && `Login attempts: ${loginAttempts}`}
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Security Status:</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-300">Access Level:</span>
            <span className={`font-bold ${
              userLevel === 'admin' ? 'text-green-400' : 
              userLevel === 'user' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {userLevel.toUpperCase()}
            </span>
          </div>
          
          {userLevel === 'user' && (
            <div className="text-yellow-400 text-sm">
              ⚠️ ADMINISTRATOR privileges required for flag access
            </div>
          )}
        </div>
      </div>

      {/* Validation Steps */}
      {validationSteps.length > 0 && (
        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">🔍 Security Validation:</h3>
          <div className="space-y-1">
            {validationSteps.map((step, index) => (
              <div key={index} className={`text-sm font-mono ${
                step.startsWith('✓') ? 'text-green-400' : 'text-red-400'
              }`}>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cookie Display */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Current Authentication Cookies:</h3>
        <div className="bg-gray-600 p-3 rounded font-mono text-sm text-green-400 break-all">
          {currentCookies || 'No authentication cookies set'}
        </div>
        <div className="mt-2 text-sm text-gray-400">
          🔧 Analyze and modify these cookies to bypass multi-layer security
        </div>
      </div>

      {/* Admin Panel */}
      {showAdminPanel && (
        <div className="mb-6 p-4 bg-green-900 border border-green-500 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-3">🎉 ADMINISTRATOR ACCESS GRANTED!</h3>
          <div className="bg-gray-800 p-3 rounded">
            <p className="text-white font-mono mb-2">Welcome, System Administrator!</p>
            <p className="text-white font-mono mb-2">All security layers bypassed successfully.</p>
            <p className="text-white font-mono">Your flag: <span className="text-yellow-400">{FLAG}</span></p>
          </div>
        </div>
      )}

      {/* Advanced Instructions */}
      <div className="mb-6 p-4 bg-blue-900 border border-blue-500 rounded-lg">
        <h3 className="text-blue-400 font-semibold mb-3">Advanced Instructions:</h3>
        <div className="text-gray-300 text-sm space-y-2">
          <div><strong>Step 1:</strong> Login as standard user to get base cookies</div>
          <div><strong>Step 2:</strong> Open Developer Tools (F12) → Application → Cookies</div>
          <div><strong>Step 3:</strong> Analyze cookie structure and naming patterns</div>
          <div><strong>Step 4:</strong> Modify access level cookie</div>
          <div><strong>Step 5:</strong> Forge JWT token with admin permissions</div>
          <div><strong>Step 6:</strong> Update timestamp validation</div>
          <div><strong>Step 7:</strong> Generate correct signature hash</div>
        </div>
      </div>

      {/* Expert Hints */}
      {userLevel === 'user' && (
        <div className="mb-6 p-4 bg-yellow-900 border border-yellow-500 rounded-lg">
          <h3 className="text-yellow-400 font-semibold mb-3">🧠 Expert Hints:</h3>
          <div className="text-gray-300 text-sm space-y-1">
            <div>• Cookie names are obfuscated: usr_sess, acc_lvl, jwt_tok, ts_val, sig_hash</div>
            <div>• JWT structure: header.payload.signature (decode the payload)</div>
            <div>• Required JWT payload: {`{"role":"admin","permissions":"all"}`}</div>
            <div>• Timestamp must be within 5 minutes of current time</div>
                         <div>• Signature hash formula: btoa('admin:' + timestamp + ':secret_key')</div>
             <div>• Use JavaScript console for Base64 encoding: btoa() and atob()</div>
           </div>
         </div>
       )}
 
       {/* Solution Template */}
       {userLevel === 'user' && (
         <div className="mb-6 p-4 bg-purple-900 border border-purple-500 rounded-lg">
           <h3 className="text-purple-400 font-semibold mb-3">💡 Console Commands Template:</h3>
           <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400">
             <div>{"// 1. Set access level"}</div>
             <div>document.cookie = "acc_lvl=admin; path=/";</div>
             <div><br/></div>
             <div>{"// 2. Create admin JWT (modify payload)"}</div>
             <div>{"// Header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"}</div>
             <div>{`// Payload: btoa(JSON.stringify({"role":"admin","permissions":"all"}))`}</div>
             <div><br/></div>
             <div>{"// 3. Update timestamp"}</div>
             <div>const ts = Date.now();</div>
             <div>document.cookie = "ts_val=" + ts + "; path=/";</div>
             <div><br/></div>
             <div>{"// 4. Generate signature"}</div>
             <div>const sig = btoa("admin:" + ts + ":secret_key");</div>
             <div>document.cookie = "sig_hash=" + sig + "; path=/";</div>
           </div>
         </div>
       )}

      {/* Flag Submission */}
      {showAdminPanel && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter the flag..."
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            disabled={effectiveCompleted}
          />
          <button 
            onClick={checkFlag}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50"
            disabled={isSubmitting || effectiveCompleted}
          >
            {isSubmitting ? 'Submitting...' : effectiveCompleted ? 'Completed' : 'Submit Flag'}
          </button>
        </div>
      )}

      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>
        {feedback}
      </div>

      {userLevel === 'none' && (
        <div className="mt-4 text-sm text-gray-400">
          🚀 Ready for the ultimate cookie challenge? Start by logging in and prepare for multi-layer security bypass!
        </div>
      )}
    </div>
  );
};

export default Challenge5Cookie; 