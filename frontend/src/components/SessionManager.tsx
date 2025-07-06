import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SessionTimeoutWarning from './SessionTimeoutWarning';

const SessionManager: React.FC = () => {
  const { sessionWarning, extendSession, logout } = useAuth();

  if (!sessionWarning?.show) {
    return null;
  }

  return (
    <SessionTimeoutWarning
      timeRemaining={sessionWarning.timeRemaining}
      onExtendSession={extendSession}
      onLogout={logout}
    />
  );
};

export default SessionManager; 