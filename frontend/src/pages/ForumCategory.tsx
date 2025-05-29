import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChatBubbleLeftRightIcon, 
  UserIcon, 
  ClockIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface ForumTopic {
  id: string;
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
  isSticky?: boolean;
}

const ForumCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t } = useTranslation();

  // Mock data for topics based on category
  const getCategoryData = (id: string) => {
    switch (id) {
      case 'general':
        return {
          title: t('General Discussion'),
          description: t('Discuss anything related to software testing and quality assurance.'),
          topics: [
            {
              id: '1',
              title: t('Best practices for test case design'),
              author: 'TestMaster',
              replies: 15,
              lastActivity: '2 hours ago',
              isSticky: true,
            },
            {
              id: '2',
              title: t('How to handle flaky tests?'),
              author: 'QAEngineer',
              replies: 8,
              lastActivity: '4 hours ago',
            },
            {
              id: '3',
              title: t('Testing mobile applications - tips and tricks'),
              author: 'MobileTester',
              replies: 23,
              lastActivity: '1 day ago',
            },
          ],
        };
      case 'automation':
        return {
          title: t('Test Automation'),
          description: t('Share your automation experiences and get help with your scripts.'),
          topics: [
            {
              id: '4',
              title: t('Selenium WebDriver best practices'),
              author: 'AutomationGuru',
              replies: 42,
              lastActivity: '1 hour ago',
              isSticky: true,
            },
            {
              id: '5',
              title: t('Page Object Model implementation'),
              author: 'CodeTester',
              replies: 18,
              lastActivity: '3 hours ago',
            },
            {
              id: '6',
              title: t('API testing with REST Assured'),
              author: 'APITester',
              replies: 12,
              lastActivity: '6 hours ago',
            },
          ],
        };
      case 'ai-testing':
        return {
          title: t('AI in Testing'),
          description: t('Discuss the latest trends in AI-powered testing solutions.'),
          topics: [
            {
              id: '7',
              title: t('Machine Learning for test case generation'),
              author: 'AIExpert',
              replies: 7,
              lastActivity: '2 hours ago',
              isSticky: true,
            },
            {
              id: '8',
              title: t('Visual testing with AI'),
              author: 'VisionTester',
              replies: 14,
              lastActivity: '5 hours ago',
            },
            {
              id: '9',
              title: t('Chatbots for testing automation'),
              author: 'BotMaster',
              replies: 9,
              lastActivity: '1 day ago',
            },
          ],
        };
      default:
        return {
          title: t('Unknown Category'),
          description: t('Category not found'),
          topics: [],
        };
    }
  };

  const categoryData = getCategoryData(categoryId || '');

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Back button */}
      <Link 
        to="/community" 
        className="inline-flex items-center text-green-500 hover:text-green-400 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        {t('Back to Community')}
      </Link>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryData.title}</h1>
        <p className="text-gray-400">{categoryData.description}</p>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {categoryData.topics.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('No topics yet')}</h3>
            <p className="text-gray-400">{t('Be the first to start a discussion!')}</p>
          </div>
        ) : (
          categoryData.topics.map((topic) => (
            <div 
              key={topic.id} 
              className={`bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors ${
                topic.isSticky ? 'border-l-4 border-green-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {topic.isSticky && (
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded mr-2">
                        {t('Sticky')}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold hover:text-green-400 cursor-pointer">
                      {topic.title}
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-400 space-x-4">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 mr-1" />
                      {topic.author}
                    </div>
                    <div className="flex items-center">
                      <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                      {topic.replies} {t('replies')}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {topic.lastActivity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Topic Button */}
      <div className="mt-8 text-center">
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          {t('Start New Topic')}
        </button>
      </div>
    </div>
  );
};

export default ForumCategory; 