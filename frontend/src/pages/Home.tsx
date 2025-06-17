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
  CheckCircleIcon,
  PlayIcon,
  BookOpenIcon,
  ChartBarIcon,
  UsersIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  BugAntIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
          {t('home.hero.title')}
        </h1>
        <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
          {t('home.hero.description')}
        </p>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          {t('home.hero.subtitle')}
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to={isAuthenticated ? "/challenges" : "/login"}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            {isAuthenticated ? t('Browse Challenges') : t('Login to Browse Challenges')}
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            {t('Get Started')}
          </Link>
        </div>
      </section>

      {/* Registration Benefits Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-2xl my-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{t('home.benefits.title')}</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t('home.benefits.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <CheckCircleIcon className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{t('home.benefits.challenges.title')}</h3>
                <p className="text-gray-300">{t('home.benefits.challenges.description')}</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <BookOpenIcon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{t('home.benefits.learning.title')}</h3>
                <p className="text-gray-300">{t('home.benefits.learning.description')}</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <PlayIcon className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{t('home.benefits.playground.title')}</h3>
                <p className="text-gray-300">{t('home.benefits.playground.description')}</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <ChartBarIcon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{t('home.benefits.progress.title')}</h3>
                <p className="text-gray-300">{t('home.benefits.progress.description')}</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <UsersIcon className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{t('home.benefits.community.title')}</h3>
                <p className="text-gray-300">{t('home.benefits.community.description')}</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <AcademicCapIcon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{t('home.benefits.certificates.title')}</h3>
                <p className="text-gray-300">{t('home.benefits.certificates.description')}</p>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="text-center mt-16 p-8 bg-gray-800/30 rounded-xl border border-gray-600">
              <h3 className="text-2xl font-bold mb-4">{t('home.cta.title')}</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                {t('home.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  {t('home.cta.register')}
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  {t('home.cta.login')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-800 rounded-2xl my-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('home.whyChoose.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <CodeBracketIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('home.whyChoose.realWorld.title')}</h3>
              <p className="text-gray-400">{t('home.whyChoose.realWorld.description')}</p>
            </div>
            <div className="text-center p-6">
              <WrenchScrewdriverIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('home.whyChoose.handson.title')}</h3>
              <p className="text-gray-400">{t('home.whyChoose.handson.description')}</p>
            </div>
            <div className="text-center p-6">
              <UserGroupIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('home.whyChoose.community.title')}</h3>
              <p className="text-gray-400">{t('home.whyChoose.community.description')}</p>
            </div>
            <div className="text-center p-6">
              <SparklesIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('home.whyChoose.current.title')}</h3>
              <p className="text-gray-400">{t('home.whyChoose.current.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Challenge Preview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('home.sampleChallenge.title')}</h2>
          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4">{t('home.sampleChallenge.apiTitle')}</h3>
            <p className="text-gray-300 mb-6">
              {t('home.sampleChallenge.description')}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>{t('home.sampleChallenge.task1')}</li>
              <li>{t('home.sampleChallenge.task2')}</li>
              <li>{t('home.sampleChallenge.task3')}</li>
            </ul>
            <Link
              to={isAuthenticated ? "/challenges" : "/login"}
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {isAuthenticated ? t('home.sampleChallenge.try') : t('Login to Try Challenges')}
            </Link>
          </div>
        </div>
      </section>

      {/* Who is this for Section */}
      <section className="py-20 bg-gray-800 rounded-2xl my-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('home.audience.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <BugAntIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">{t('home.audience.beginner.title')}</h3>
              <p className="text-gray-400">
                {t('home.audience.beginner.description')}
              </p>
            </div>
            <div className="text-center p-6">
              <ClipboardDocumentCheckIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">{t('home.audience.midLevel.title')}</h3>
              <p className="text-gray-400">
                {t('home.audience.midLevel.description')}
              </p>
            </div>
            <div className="text-center p-6">
              <RocketLaunchIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">{t('home.audience.senior.title')}</h3>
              <p className="text-gray-400">
                {t('home.audience.senior.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">{t('home.technologies.title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gray-800 rounded-xl">
            <CommandLineIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold">{t('home.technologies.selenium')}</h3>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-xl">
            <BeakerIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold">{t('home.technologies.playwright')}</h3>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-xl">
            <CpuChipIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold">{t('home.technologies.postman')}</h3>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-xl">
            <ServerIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold">{t('home.technologies.devtools')}</h3>
          </div>
        </div>
      </section>

      {/* Future Roadmap Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl my-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('home.roadmap.title')}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('home.roadmap.description')}
          </p>
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">{t('home.roadmap.aiCourse.title')}</h3>
            <p className="text-gray-300 mb-6">
              {t('home.roadmap.aiCourse.description')}
            </p>
            <div className="text-sm text-gray-400">
              {t('home.roadmap.aiCourse.note')}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-800 rounded-2xl my-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('home.testimonials.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <p className="text-gray-300 mb-4">
                {t('home.testimonials.sarah')}
              </p>
              <p className="font-semibold">- Sarah K., QA Engineer</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <p className="text-gray-300 mb-4">
                {t('home.testimonials.michael')}
              </p>
              <p className="font-semibold">- Michael R., Test Automation Lead</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <p className="text-gray-300 mb-4">
                {t('home.testimonials.david')}
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