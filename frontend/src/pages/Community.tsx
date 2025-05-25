import React from 'react';
import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  CalendarIcon,
  FireIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ForumCategory {
  id: string;
  title: string;
  description: string;
  topics: number;
  posts: number;
  icon: React.ReactNode;
}

interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
  icon: React.ReactNode;
}

const Community: React.FC = () => {
  const { t } = useTranslation();

  const forumCategories: ForumCategory[] = [
    {
      id: 'general',
      title: t('General Discussion'),
      description: t('Discuss anything related to software testing and quality assurance.'),
      topics: 156,
      posts: 1234,
      icon: <ChatBubbleLeftRightIcon className="h-8 w-8 text-green-500" />,
    },
    {
      id: 'automation',
      title: t('Test Automation'),
      description: t('Share your automation experiences and get help with your scripts.'),
      topics: 89,
      posts: 567,
      icon: <FireIcon className="h-8 w-8 text-blue-500" />,
    },
    {
      id: 'ai-testing',
      title: t('AI in Testing'),
      description: t('Discuss the latest trends in AI-powered testing solutions.'),
      topics: 45,
      posts: 234,
      icon: <StarIcon className="h-8 w-8 text-green-500" />,
    },
  ];

  const upcomingEvents: Event[] = [
    {
      id: 'webinar-1',
      title: t('Introduction to AI Testing'),
      date: '2024-03-15',
      type: t('Webinar'),
      icon: <CalendarIcon className="h-6 w-6 text-blue-500" />,
    },
    {
      id: 'workshop-1',
      title: t('Hands-on Selenium Workshop'),
      date: '2024-03-20',
      type: t('Workshop'),
      icon: <CalendarIcon className="h-6 w-6 text-green-500" />,
    },
    {
      id: 'meetup-1',
      title: t('Testing Community Meetup'),
      date: '2024-03-25',
      type: t('Meetup'),
      icon: <CalendarIcon className="h-6 w-6 text-purple-500" />,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
          {t('Testing Community')}
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {t('Join our community of testers, share knowledge, and grow together')}
        </p>
      </section>

      {/* Forum Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-2xl font-bold mb-8">{t('Discussion Forums')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {forumCategories.map((category) => (
            <Link
              key={category.id}
              to={`/community/forum/${category.id}`}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center mb-4">
                {category.icon}
                <h3 className="text-xl font-semibold ml-3">{category.title}</h3>
              </div>
              <p className="text-gray-400 mb-4">{category.description}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{category.topics} {t('topics')}</span>
                <span>{category.posts} {t('posts')}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-gray-800 rounded-2xl py-12 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">{t('Upcoming Events')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-700 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  {event.icon}
                  <span className="ml-2 text-sm font-medium text-gray-400">
                    {event.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-400">{event.date}</p>
                <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  {t('Register Now')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <UserGroupIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">1,234</h3>
            <p className="text-gray-400">{t('Active Members')}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <TrophyIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">567</h3>
            <p className="text-gray-400">{t('Completed Challenges')}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">2,345</h3>
            <p className="text-gray-400">{t('Forum Posts')}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Community; 