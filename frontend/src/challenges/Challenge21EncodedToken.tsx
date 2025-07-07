import React, { useState, useEffect } from 'react';
import { useFlagSubmission } from '../hooks/useFlagSubmission';

const FLAG = 'JWT-PREMIUM-ACCESS-2024';
const CHALLENGE_ID = 'encoded-token';
const CHALLENGE_POINTS = 60;

// "Accidentally" exposed JWT secret in comments - realistic scenario
/* 
   TODO: Remove this before production!
   JWT_SECRET = "super_secret_key_2024_do_not_share"
   This is used for signing tokens in development
*/

const Challenge21EncodedToken: React.FC<{onComplete?: () => void, isRetakeMode?: boolean}> = ({ onComplete, isRetakeMode = false }) => {
  const [tokenInput, setTokenInput] = useState('');
  const [decodedValue, setDecodedValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');
  const [step, setStep] = useState(1);
  const [showFlag, setShowFlag] = useState(false);
  const [currentToken, setCurrentToken] = useState('');

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

  // In retake mode, treat as if not completed
  const effectiveCompleted = challengeCompleted && !isRetakeMode;

  // Reset state when entering retake mode
  React.useEffect(() => {
    if (isRetakeMode) {
      setTokenInput('');
      setDecodedValue('');
      setFeedback('');
      setFlagInput('');
      setFlagFeedback('');
      setStep(1);
      setShowFlag(false);
      setCurrentToken('');
    }
  }, [isRetakeMode]);

  // Generate initial token with basic user role
  useEffect(() => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      user: 'testuser', 
      role: 'basic_user', 
      exp: Math.floor(Date.now() / 1000) + 3600 
    }));
    const signature = 'invalid_signature_placeholder';
    setCurrentToken(`${header}.${payload}.${signature}`);
  }, []);

  // Simple HMAC-SHA256 simulation (in real app this would be server-side)
  const createSignature = (data: string, secret: string) => {
    // This is a simplified signature for demo purposes
    // In real JWT, this would be proper HMAC-SHA256
    let hash = 0;
    const combined = data + secret;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return btoa(Math.abs(hash).toString()).replace(/[^A-Za-z0-9]/g, '').substring(0, 16);
  };

  const validateToken = (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return { valid: false, error: 'Invalid JWT format' };
      }

      const [headerB64, payloadB64, signatureB64] = parts;
      
      // Decode header and payload
      const header = JSON.parse(atob(headerB64));
      const payload = JSON.parse(atob(payloadB64));
      
      // Check if it's the expected algorithm
      if (header.alg !== 'HS256' || header.typ !== 'JWT') {
        return { valid: false, error: 'Invalid header' };
      }

      // Verify signature with the "leaked" secret
      const expectedSignature = createSignature(headerB64 + '.' + payloadB64, 'super_secret_key_2024_do_not_share');
      
      if (signatureB64 !== expectedSignature) {
        return { valid: false, error: 'Invalid signature' };
      }

      // Check if user has premium role
      if (payload.role === 'premium_user') {
        return { valid: true, payload, message: 'Premium access granted!', isPremium: true };
      } else {
        return { valid: true, payload, message: 'Token valid but insufficient privileges', isPremium: false };
      }

    } catch (error) {
      return { valid: false, error: 'Token parsing failed' };
    }
  };

  const verifyToken = () => {
    if (!tokenInput.trim()) {
      setFeedback('Please enter a JWT token');
      return;
    }

    const result = validateToken(tokenInput.trim());
    
    if (!result.valid) {
      setFeedback(`❌ Token validation failed: ${result.error}`);
      setShowFlag(false);
    } else if (result.isPremium) {
      setFeedback('🎉 Premium access granted! Flag revealed!');
      setShowFlag(true);
    } else {
      setFeedback(`⚠️ ${result.message}. You need premium_user role to access the flag.`);
      setShowFlag(false);
    }
  };

  const showHint = () => {
    setFeedback(`JWT Structure Hint:
    
1. JWT tokens have 3 parts: header.payload.signature
2. Each part is Base64 encoded
3. The payload contains user claims like role, user, exp
4. The signature is created using: HMAC-SHA256(header + "." + payload, secret)
5. You need to change the role from "basic_user" to "premium_user"
6. Don't forget to recalculate the signature with the exposed secret!

Try decoding the current token to understand its structure, then create your own.`);
  };

  const showTokenStructure = () => {
    if (currentToken) {
      const parts = currentToken.split('.');
      try {
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));
        setFeedback(`Current token structure:\nHeader: ${JSON.stringify(header, null, 2)}\nPayload: ${JSON.stringify(payload, null, 2)}\nSignature: ${parts[2]}`);
      } catch (error) {
        setFeedback('Error parsing current token');
      }
    }
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
      effectiveCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        Encoded Token Challenge
        {effectiveCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        A JWT token is being used for authentication, but the secret key has been accidentally exposed in the source code. 
        Create a valid JWT token with "premium_user" role to access the hidden flag.
      </p>
      
      <div className="mb-4 p-4 bg-blue-900 border border-blue-500 rounded-lg">
        <h3 className="text-blue-400 font-semibold mb-2">📋 Step-by-Step Challenge</h3>
        <ol className="text-blue-200 text-sm space-y-2">
          <li><strong>1.</strong> Click "Decode Current Token" to analyze the token structure</li>
          <li><strong>2.</strong> Understand what needs to change: role from "basic_user" to "premium_user"</li>
          <li><strong>3.</strong> Use the exposed secret key: <code className="bg-gray-800 px-1 rounded">super_secret_key_2024_do_not_share</code></li>
          <li><strong>4.</strong> Research JWT structure and create your own token generation method</li>
          <li><strong>5.</strong> Generate a new JWT token with the premium_user role</li>
          <li><strong>6.</strong> Enter your token in the field and verify it to get the flag!</li>
        </ol>
      </div>
      
      <div className="mb-4 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-yellow-400 font-semibold mb-2">🔍 Current Token Analysis</h3>
        <div className="font-mono text-sm text-gray-300 break-all mb-2">
          <strong>Token:</strong> {currentToken}
        </div>
        <button 
          onClick={showTokenStructure}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
        >
          Decode Current Token
        </button>
      </div>

      <div className="mb-4 p-4 bg-red-900 border border-red-500 rounded-lg">
        <h3 className="text-red-400 font-semibold mb-2">⚠️ Security Issue Found</h3>
        <p className="text-red-300 text-sm mb-2">
          The JWT secret key has been found in the source code comments! 
        </p>
        <div className="bg-gray-800 p-2 rounded font-mono text-xs text-green-400">
          {`/* JWT_SECRET = "super_secret_key_2024_do_not_share" */`}
        </div>
      </div>

      <div className="mb-4 p-4 bg-purple-900 border border-purple-500 rounded-lg">
        <h3 className="text-purple-400 font-semibold mb-2">🧠 JWT Creation Guide</h3>
        <div className="text-purple-200 text-sm space-y-3">
          <div>
            <p><strong>📝 What you need to understand:</strong></p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>JWT has 3 parts: <code>header.payload.signature</code></li>
              <li>Each part must be Base64 encoded</li>
              <li>Change role from "basic_user" to "premium_user"</li>
              <li>Recalculate signature using the exposed secret</li>
            </ul>
          </div>
          
          <div>
            <p><strong>🔧 Tools you can use:</strong></p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li><strong>Browser Console:</strong> Use <code>btoa()</code>, <code>atob()</code>, <code>JSON.stringify()</code></li>
              <li><strong>Online Tools:</strong> jwt.io, jwt-decode websites</li>
              <li><strong>JavaScript:</strong> Write your own encoding/signing functions</li>
            </ul>
          </div>
          
          <div>
            <p><strong>💡 Key functions to research:</strong></p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li><code>btoa(string)</code> - converts string to Base64</li>
              <li><code>atob(base64)</code> - converts Base64 to string</li>
              <li><code>JSON.stringify(object)</code> - converts object to JSON string</li>
              <li>Hash algorithm for signature (check challenge source code)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Enter JWT Token:
        </label>
        <textarea
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
          className="w-full h-24 p-3 rounded bg-gray-700 text-white font-mono text-sm"
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          disabled={effectiveCompleted}
        />
        <div className="flex gap-2 mt-2">
          <button 
            onClick={verifyToken}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={effectiveCompleted}
          >
            Verify Token
          </button>
          <button 
            onClick={showHint}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={effectiveCompleted}
          >
            Show Hint
          </button>
          <button 
            onClick={() => setFeedback('Try online JWT tools like jwt.io to decode and understand the token structure. You can also use browser console with atob() function to decode Base64 parts.')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={effectiveCompleted}
          >
            JWT Tools Tip
          </button>
          <button 
            onClick={() => setFeedback(`Signature Algorithm Hint:\n\nLook at the createSignature function in this challenge's source code. You need to implement the same algorithm:\n\n1. Combine header.payload string with the secret key\n2. Create a simple hash using character codes\n3. Convert to Base64 and clean up the result\n4. Take first 16 characters\n\nStudy the code in DevTools → Sources tab to understand the exact implementation.`)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={effectiveCompleted}
          >
            Signature Algorithm
          </button>
        </div>
      </div>

      {showFlag && (
        <div className="mb-4 p-4 bg-green-900 border border-green-500 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-2">🎉 Premium Access Granted!</h3>
          <p className="text-white font-mono">Flag: {FLAG}</p>
        </div>
      )}

      {(showFlag || effectiveCompleted) && (
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
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow py-2 transition-colors disabled:opacity-50"
            disabled={isSubmitting || effectiveCompleted}
          >
            {isSubmitting ? 'Submitting...' : effectiveCompleted ? 'Completed' : 'Submit Flag'}
          </button>
        </div>
      )}

      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : feedback.includes('Premium access') ? 'text-blue-400' : 'text-red-400'}`}>
        <pre className="whitespace-pre-wrap">{feedback}</pre>
      </div>

              {!showFlag && !effectiveCompleted && (
          <div className="mt-4 p-3 bg-gray-700 rounded-lg">
            <h4 className="text-yellow-400 font-semibold mb-2">🎯 Learning Objectives:</h4>
            <div className="text-gray-300 text-sm space-y-1">
              <p>• Understand JWT token structure (header.payload.signature)</p>
              <p>• Learn how to decode and encode Base64 data</p>
              <p>• Practice creating digital signatures with a secret key</p>
              <p>• Recognize security risks of exposed secrets in source code</p>
              <p>• Experience manual JWT token manipulation</p>
            </div>
            <p className="text-yellow-300 text-xs mt-2">
              💡 This is a hands-on learning challenge - no copy-paste shortcuts!
            </p>
          </div>
        )}
    </div>
  );
};

export default Challenge21EncodedToken; 