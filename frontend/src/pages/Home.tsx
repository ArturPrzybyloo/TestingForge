import React from 'react';
import { Link } from 'react-router-dom';
import {
  CodeBracketIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  SparklesIcon,
  CommandLineIcon,
  BeakerIcon,
  CpuChipIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
          {t('Master Software Testing with AI')}
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {t('Level up your testing skills with interactive challenges, real-world scenarios, and AI-powered learning.')}
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/challenges"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            {t('Browse Challenges')}
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            {t('Get Started')}
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-800 rounded-2xl my-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('Why Choose AI Test Forge?')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <CodeBracketIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('Real-World Challenges')}</h3>
              <p className="text-gray-400">{t('Practice with scenarios that mirror actual testing situations.')}</p>
            </div>
            <div className="text-center p-6">
              <RocketLaunchIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('AI-Powered Learning')}</h3>
              <p className="text-gray-400">{t('Get personalized feedback and guidance from our AI assistant.')}</p>
            </div>
            <div className="text-center p-6">
              <UserGroupIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('Active Community')}</h3>
              <p className="text-gray-400">{t('Connect with other testers and share your experiences.')}</p>
            </div>
            <div className="text-center p-6">
              <SparklesIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('Stay Current')}</h3>
              <p className="text-gray-400">{t('Learn the latest testing techniques and tools.')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Challenge Preview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('Try a Sample Challenge')}</h2>
          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4">{t('API Testing Challenge')}</h3>
            <p className="text-gray-300 mb-6">
              {t('Test a REST API endpoint that manages user profiles. Your task is to:')}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>{t('Verify the GET /users endpoint returns correct user data')}</li>
              <li>{t('Test POST /users with invalid data handling')}</li>
              <li>{t('Implement proper error handling')}</li>
            </ul>
            <Link
              to="/challenges"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {t('Try This Challenge')}
            </Link>
          </div>
        </div>
      </section>

      {/* Who is this for Section */}
      <section className="py-20 bg-gray-800 rounded-2xl my-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('Who is this for?')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">{t('Beginner Testers')}</h3>
              <p className="text-gray-400">
                {t('Start your testing journey with fundamental concepts and basic challenges.')}
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">{t('Mid-Level Testers')}</h3>
              <p className="text-gray-400">
                {t('Enhance your skills with advanced scenarios and automation challenges.')}
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">{t('Senior Testers')}</h3>
              <p className="text-gray-400">
                {t('Master AI testing and lead complex testing initiatives.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">{t('Technologies Covered')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gray-800 rounded-xl">
            <CommandLineIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold">{t('Selenium')}</h3>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-xl">
            <BeakerIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold">{t('Playwright')}</h3>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-xl">
            <CpuChipIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold">{t('Postman')}</h3>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-xl">
            <ServerIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold">{t('AI Testing')}</h3>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-800 rounded-2xl my-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('What Our Users Say')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <p className="text-gray-300 mb-4">
                {t('The AI-powered challenges helped me improve my testing skills significantly. Highly recommended!')}
              </p>
              <p className="font-semibold">- Sarah K., QA Engineer</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <p className="text-gray-300 mb-4">
                {t('Best platform for learning modern testing techniques. The community is incredibly supportive.')}
              </p>
              <p className="font-semibold">- Michael R., Test Automation Lead</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <p className="text-gray-300 mb-4">
                {t('The real-world scenarios are exactly what I needed to prepare for my testing career.')}
              </p>
              <p className="font-semibold">- David L., Junior Tester</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home; 