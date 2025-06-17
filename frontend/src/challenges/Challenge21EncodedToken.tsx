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

const Challenge21EncodedToken: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [tokenInput, setTokenInput] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFlag, setShowFlag] = useState(false);
  const [currentToken, setCurrentToken] = useState('');

  const { submitFlag, isSubmitting, isCompleted } = useFlagSubmission();
  const challengeCompleted = isCompleted(CHALLENGE_ID);

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
      challengeCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <h2 className="text-2xl font-bold mb-2 text-blue-400">
        Encoded Token Challenge
        {challengeCompleted && <span className="text-green-500 ml-2">✓</span>}
      </h2>
      <p className="text-gray-300 mb-4">
        A JWT token is being used for authentication, but the secret key has been accidentally exposed in the source code. 
        Create a valid JWT token with "premium_user" role to access the hidden flag.
      </p>
      
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

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Enter JWT Token:
        </label>
        <textarea
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
          className="w-full h-24 p-3 rounded bg-gray-700 text-white font-mono text-sm"
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          disabled={challengeCompleted}
        />
        <div className="flex gap-2 mt-2">
          <button 
            onClick={verifyToken}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={challengeCompleted}
          >
            Verify Token
          </button>
          <button 
            onClick={showHint}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={challengeCompleted}
          >
            Show Hint
          </button>
          <button 
            onClick={() => setFeedback('Try online JWT tools like jwt.io to decode and understand the token structure. You can also use browser console with atob() function to decode Base64 parts.')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            disabled={challengeCompleted}
          >
            JWT Tools Tip
          </button>
        </div>
      </div>

      {showFlag && (
        <div className="mb-4 p-4 bg-green-900 border border-green-500 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-2">🎉 Premium Access Granted!</h3>
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

      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : feedback.includes('Premium access') ? 'text-blue-400' : 'text-red-400'}`}>
        <pre className="whitespace-pre-wrap">{feedback}</pre>
      </div>

      {!showFlag && !challengeCompleted && (
        <div className="mt-4 text-sm text-gray-400">
          💡 Hint: The secret key is exposed in the source code comments above. Use browser DevTools or online JWT tools to decode the current token, modify the role, and create a new signature.
        </div>
      )}
    </div>
  );
};

export default Challenge21EncodedToken; 