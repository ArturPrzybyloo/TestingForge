import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  AcademicCapIcon, 
  UserGroupIcon, 
  BookOpenIcon,
  Squares2X2Icon,
  BeakerIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Logo from '../components/Logo';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <div className="flex gap-1">
      <button
        onClick={() => i18n.changeLanguage('en')}
        className={`px-2 py-1 rounded text-xs ${i18n.language === 'en' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-200'}`}
      >EN</button>
      <button
        onClick={() => i18n.changeLanguage('pl')}
        className={`px-2 py-1 rounded text-xs ${i18n.language === 'pl' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-200'}`}
      >PL</button>
    </div>
  );
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" onClick={closeMobileMenu}>
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <HomeIcon className="h-4 w-4 mr-1" />
                  {t('Home')}
                </Link>
                {isAuthenticated && (
                  <>
                    <Link to="/challenges" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <BookOpenIcon className="h-4 w-4 mr-1" />
                      {t('Challenges')}
                    </Link>
                    <Link to="/automation-playground" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <BeakerIcon className="h-4 w-4 mr-1" />
                      {t('Playground')}
                    </Link>
                    <Link to="/learn" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <AcademicCapIcon className="h-4 w-4 mr-1" />
                      {t('Learn')}
                    </Link>
                  </>
                )}
                <Link to="/community" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <UserGroupIcon className="h-4 w-4 mr-1" />
                  {t('Community')}
                </Link>
                {isAuthenticated && (
                  <Link
                    to="/dashboard"
                    className="flex items-center text-green-500 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <Squares2X2Icon className="h-4 w-4 mr-1" />
                    {t('Dashboard')}
                  </Link>
                )}
              </div>
            </div>

            {/* Right side - Language switcher and auth buttons */}
            <div className="flex items-center space-x-2">
              {/* Language Switcher - always visible */}
              <LanguageSwitcher />
              
              {/* Auth buttons - desktop */}
              <div className="hidden md:flex items-center space-x-3">
                {isAuthenticated ? (
                  <>
                    <span className="text-green-400 text-sm whitespace-nowrap">
                      {user?.username}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                    >
                      {t('Logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                    >
                      {t('Login')}
                    </Link>
                    <Link
                      to="/register"
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
                    >
                      {t('Sign Up')}
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile auth buttons - visible on small screens */}
              <div className="flex md:hidden items-center space-x-2">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white px-2 py-1 rounded-md text-xs font-medium"
                  >
                    {t('Logout')}
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-300 hover:text-white px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {t('Login')}
                    </Link>
                    <Link
                      to="/register"
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md text-xs font-medium transition-colors"
                    >
                      {t('Sign Up')}
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-300 hover:text-white p-2 rounded-md"
                >
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-700 rounded-md mt-2">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  <HomeIcon className="h-5 w-5 mr-2" />
                  {t('Home')}
                </Link>
                {isAuthenticated && (
                  <>
                    <Link
                      to="/challenges"
                      onClick={closeMobileMenu}
                      className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    >
                      <BookOpenIcon className="h-5 w-5 mr-2" />
                      {t('Challenges')}
                    </Link>
                    <Link
                      to="/automation-playground"
                      onClick={closeMobileMenu}
                      className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    >
                      <BeakerIcon className="h-5 w-5 mr-2" />
                      {t('Playground')}
                    </Link>
                    <Link
                      to="/learn"
                      onClick={closeMobileMenu}
                      className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    >
                      <AcademicCapIcon className="h-5 w-5 mr-2" />
                      {t('Learn')}
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={closeMobileMenu}
                      className="flex items-center text-green-500 hover:text-green-400 px-3 py-2 rounded-md text-base font-medium"
                    >
                      <Squares2X2Icon className="h-5 w-5 mr-2" />
                      {t('Dashboard')}
                    </Link>
                  </>
                )}
                <Link
                  to="/community"
                  onClick={closeMobileMenu}
                  className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  {t('Community')}
                </Link>
                
                {/* Mobile user info */}
                {isAuthenticated && (
                  <div className="px-3 py-2 border-t border-gray-600 mt-2">
                    <span className="text-green-400 text-sm">
                      {user?.username}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
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
                {isAuthenticated ? (
                  <>
                    <li><Link to="/challenges" className="text-gray-400 hover:text-white">Challenges</Link></li>
                    <li><Link to="/learn" className="text-gray-400 hover:text-white">Learning Path</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login" className="text-gray-400 hover:text-white">Challenges (Login Required)</Link></li>
                    <li><Link to="/login" className="text-gray-400 hover:text-white">Learning Path (Login Required)</Link></li>
                  </>
                )}
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