import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'general',
    title: 'General Discussion',
    description: 'Discuss anything related to software testing and quality assurance.',
    icon: '💬',
  },
  {
    id: 'automation',
    title: 'Test Automation',
    description: 'Share your automation experiences and get help with your scripts.',
    icon: '🔥',
  },
  {
    id: 'ai',
    title: 'AI in Testing',
    description: 'Discuss the latest trends in AI-powered testing solutions.',
    icon: '⭐',
  },
];

const ForumCategoryList: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text text-center">
        Testing Community
      </h1>
      <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl mx-auto">
        Join our community of testers, share knowledge, and grow together
      </p>
      <h2 className="text-2xl font-bold mb-6 text-gray-100">Discussion Forums</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => navigate(`/community/${cat.id}`)}
            className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700 hover:border-blue-400 transition-colors flex flex-col items-start text-left shadow group"
          >
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</span>
            <span className="text-xl font-bold mb-2 text-white">{cat.title}</span>
            <span className="text-gray-400 mb-4 flex-1">{cat.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ForumCategoryList; 