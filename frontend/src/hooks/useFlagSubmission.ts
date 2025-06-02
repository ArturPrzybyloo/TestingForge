import { useState, useCallback } from 'react';
import api from '../services/api';

interface FlagSubmissionResult {
  success: boolean;
  message: string;
  pointsEarned?: number;
  totalPoints?: number;
  newLevel?: string;
}

interface UseFlagSubmissionReturn {
  isSubmitting: boolean;
  error: string | null;
  submitFlag: (challengeId: string, flag: string) => Promise<FlagSubmissionResult>;
  isCompleted: (challengeId: string) => boolean;
}

export const useFlagSubmission = (): UseFlagSubmissionReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitFlag = useCallback(async (challengeId: string, flag: string): Promise<FlagSubmissionResult> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.post('/submissions', {
        challengeId,
        flag: flag.trim()
      });

      if (response.data && response.data.success) {
        // Update localStorage as backup
        const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
        localStorage.setItem('forge_completed_challenges', JSON.stringify({ 
          ...done, 
          [challengeId]: true 
        }));

        return {
          success: true,
          message: response.data.message || 'Flag submitted successfully!',
          pointsEarned: response.data.pointsEarned,
          totalPoints: response.data.totalPoints,
          newLevel: response.data.newLevel
        };
      } else {
        throw new Error(response.data?.message || 'Unknown error occurred');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit flag';
      setError(errorMessage);
      
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const isCompleted = useCallback((challengeId: string): boolean => {
    // Check localStorage for now (can be enhanced to check API)
    const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
    return Boolean(done[challengeId]);
  }, []);

  return {
    isSubmitting,
    error,
    submitFlag,
    isCompleted
  };
}; 