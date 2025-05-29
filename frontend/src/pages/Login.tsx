import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

// Mock users for testing
const MOCK_USERS = [
  { email: 'test@example.com', password: 'test123' },
  { email: 'admin@example.com', password: 'admin123' },
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // In a real app, we would set a token in localStorage or use a state management solution
      localStorage.setItem('user', JSON.stringify({ email: user.email }));
      // Use React Router navigation instead of full page refresh
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-700 rounded bg-gray-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="text-green-500 hover:text-green-400">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Sign in
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-400">Don't have an account? </span>
              <Link to="/register" className="text-green-500 hover:text-green-400">
                Sign up
              </Link>
            </div>
          </form>

          {/* Test Accounts Info */}
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Test Accounts:</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Email: test@example.com</p>
              <p>Password: test123</p>
              <p className="mt-2">Email: admin@example.com</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login; 