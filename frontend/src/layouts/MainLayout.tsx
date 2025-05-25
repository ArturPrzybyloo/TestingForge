import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  AcademicCapIcon, 
  UserGroupIcon, 
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  Squares2X2Icon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import Logo from '../components/Logo';
import { useTranslation } from 'react-i18next';

interface MainLayoutProps {
  children: React.ReactNode;
}

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <div className="flex gap-2 ml-4">
      <button
        onClick={() => i18n.changeLanguage('en')}
        className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-200'}`}
      >EN</button>
      <button
        onClick={() => i18n.changeLanguage('pl')}
        className={`px-2 py-1 rounded ${i18n.language === 'pl' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-200'}`}
      >PL</button>
    </div>
  );
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <Logo />
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    <HomeIcon className="h-5 w-5 mr-1" />
                    {t('Home')}
                  </Link>
                  <Link to="/challenges" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    <BookOpenIcon className="h-5 w-5 mr-1" />
                    {t('Challenges')}
                  </Link>
                  <Link to="/automation-playground" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    <BeakerIcon className="h-5 w-5 mr-1" />
                    {t('Playground')}
                  </Link>
                  <Link to="/learn" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    <AcademicCapIcon className="h-5 w-5 mr-1" />
                    {t('Learn')}
                  </Link>
                  <Link to="/community" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    <UserGroupIcon className="h-5 w-5 mr-1" />
                    {t('Community')}
                  </Link>
                  {isLoggedIn && (
                    <Link
                      to="/dashboard"
                      className="flex items-center text-green-500 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <Squares2X2Icon className="h-5 w-5 mr-1" />
                      {t('Dashboard')}
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <LanguageSwitcher />
              <div className="ml-4 flex items-center md:ml-6">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {t('Logout')}
                  </button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/login"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {t('Login')}
                    </Link>
                    <Link
                      to="/register"
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      {t('Sign Up')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-green-500 mb-4">AI Test Forge</h3>
              <p className="text-gray-400">Master the art of software testing with AI-powered challenges and real-world scenarios.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link to="/challenges" className="text-gray-400 hover:text-white">Challenges</Link></li>
                <li><Link to="/learn" className="text-gray-400 hover:text-white">Learning Path</Link></li>
                <li><Link to="/community" className="text-gray-400 hover:text-white">Community</Link></li>
                <li><Link to="/chat" className="text-gray-400 hover:text-white">AI Chat</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link to="/docs" className="text-gray-400 hover:text-white">Documentation</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} AI Test Forge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 