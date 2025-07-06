import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import api from '../services/api';

const EmailVerification: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Invalid verification link');
      setLoading(false);
      return;
    }

    verifyEmail();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const verifyEmail = async () => {
    try {
      setLoading(true);
      
      // Debug: log the API URL and token
      console.log('🔍 API Base URL:', api.defaults.baseURL);
      console.log('🔍 Verification token:', token);
      console.log('🔍 Full API URL:', `${api.defaults.baseURL}/auth/verify-email/${token}`);
      
      const response = await api.get(`/auth/verify-email/${token}`);
      
      console.log('✅ API Response:', response.data);
      
      if (response.data && response.data.success) {
        setSuccess(true);
        setMessage(response.data.message);
        // Auto-redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError('Email verification failed');
      }
    } catch (err: any) {
      console.error('❌ Email verification error:', err);
      console.error('❌ Error response:', err.response?.data);
      console.error('❌ Error status:', err.response?.status);
      setError(err.response?.data?.message || `Email verification failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            {loading && (
              <>
                <ArrowPathIcon className="mx-auto h-16 w-16 text-blue-500 animate-spin mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Verifying Email...
                </h2>
                <p className="text-gray-400">
                  Please wait while we verify your email address.
                </p>
              </>
            )}

            {success && (
              <>
                <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Email Verified Successfully!
                </h2>
                <div className="bg-green-500/10 border border-green-500 rounded-lg p-4 mb-6">
                  <p className="text-green-400 text-sm">
                    {message}
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-400">
                    Your email has been verified. You can now log in to your account.
                  </p>
                  <p className="text-sm text-gray-500">
                    You will be redirected to the login page in 3 seconds...
                  </p>
                  <Link
                    to="/login"
                    className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center inline-block"
                  >
                    Go to Login Now
                  </Link>
                </div>
              </>
            )}

            {error && !loading && (
              <>
                <XCircleIcon className="mx-auto h-16 w-16 text-red-500 mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Verification Failed
                </h2>
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6">
                  <p className="text-red-400 text-sm">
                    {error}
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-400">
                    The verification link may have expired or is invalid. Please try registering again or request a new verification email.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/register"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                    >
                      Register Again
                    </Link>
                    <Link
                      to="/login"
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmailVerification; 