import React, { useState, useEffect } from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

interface SessionTimeoutWarningProps {
  timeRemaining: number; // in seconds
  onExtendSession: () => void;
  onLogout: () => void;
}

const SessionTimeoutWarning: React.FC<SessionTimeoutWarningProps> = ({
  timeRemaining,
  onExtendSession,
  onLogout
}) => {
  const [countdown, setCountdown] = useState(timeRemaining);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setCountdown(timeRemaining);
  }, [timeRemaining]);

  useEffect(() => {
    if (countdown <= 0) {
      onLogout();
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, onLogout]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-yellow-500/90 backdrop-blur-sm border border-yellow-400 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="flex items-start">
        <ExclamationTriangleIcon className="h-6 w-6 text-yellow-900 mr-3 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-yellow-900 mb-1">
            Session Expiring Soon
          </h3>
          <p className="text-sm text-yellow-800 mb-3">
            Your session will expire in <strong>{formatTime(countdown)}</strong>. 
            Extend your session to continue working.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={onExtendSession}
              className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded transition-colors"
            >
              Extend Session
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
            >
              Logout Now
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-2 text-yellow-900 hover:text-yellow-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SessionTimeoutWarning; 