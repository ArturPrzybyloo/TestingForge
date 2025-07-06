import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

interface FlagSubmissionResult {
  success: boolean;
  message: string;
  pointsEarned?: number;
  totalPoints?: number;
  newLevel?: string;
  isRetake?: boolean;
}

interface UseFlagSubmissionReturn {
  isSubmitting: boolean;
  error: string | null;
  submitFlag: (challengeId: string, flag: string, points?: number) => Promise<FlagSubmissionResult>;
  isCompleted: (challengeId: string) => boolean;
}

export const useFlagSubmission = (): UseFlagSubmissionReturn => {
  const { isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<{[key: string]: boolean}>({});

  const submitFlag = useCallback(async (challengeId: string, flag: string, points: number = 20): Promise<FlagSubmissionResult> => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (isAuthenticated) {
        // Send to backend for authenticated users
        const response = await api.post('/submissions', {
          challengeId,
          flag: flag.trim(),
          points
        });

        if (response.data && response.data.success) {
          // Update local state only for first completion
          if (!response.data.isRetake) {
            setCompletedChallenges(prev => ({ 
              ...prev, 
              [challengeId]: true 
            }));
          }
          
          return {
            success: true,
            message: response.data.message || 'Flag submitted successfully!',
            pointsEarned: response.data.pointsEarned || 0,
            totalPoints: response.data.totalPoints,
            newLevel: response.data.newLevel,
            isRetake: response.data.isRetake || false
          };
        } else {
          throw new Error(response.data?.message || 'Unknown error occurred');
        }
      } else {
        // For non-authenticated users, always allow retakes
        const wasAlreadyCompleted = completedChallenges[challengeId];
        
        if (!wasAlreadyCompleted) {
          setCompletedChallenges(prev => ({ 
            ...prev, 
            [challengeId]: true 
          }));
          
          const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
          localStorage.setItem('forge_completed_challenges', JSON.stringify({ 
            ...done, 
            [challengeId]: true 
          }));
        }

        return {
          success: true,
          message: wasAlreadyCompleted 
            ? 'Great! You completed the challenge again! 🎉 (Login to track progress across sessions)'
            : 'Flag submitted successfully! (Login to track progress across sessions)',
          pointsEarned: wasAlreadyCompleted ? 0 : points,
          totalPoints: points,
          newLevel: 'Guest',
          isRetake: wasAlreadyCompleted
        };
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
  }, [isAuthenticated, completedChallenges]);

  // Load completed challenges on mount
  useEffect(() => {
    const loadCompletedChallenges = async () => {
      if (isAuthenticated) {
        try {
          const response = await api.get('/submissions/my-progress');
          if (response.data && response.data.data) {
            const progress = response.data.data;
            const completedObj: {[key: string]: boolean} = {};
            progress.completedChallenges.forEach((completion: any) => {
              completedObj[completion.challengeId] = true;
            });
            setCompletedChallenges(completedObj);
          }
        } catch (err) {
          console.error('Error loading user progress:', err);
          // Fallback to localStorage
          const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
          setCompletedChallenges(done);
        }
      } else {
        // Load from localStorage for non-authenticated users
        const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
        setCompletedChallenges(done);
      }
    };

    loadCompletedChallenges();
  }, [isAuthenticated]);

  const isCompleted = useCallback((challengeId: string): boolean => {
    return Boolean(completedChallenges[challengeId]);
  }, [completedChallenges]);

  return {
    isSubmitting,
    error,
    submitFlag,
    isCompleted
  };
}; 