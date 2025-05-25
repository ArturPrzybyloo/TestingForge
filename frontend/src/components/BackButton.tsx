import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const BackButton: React.FC = () => {
  return (
    <Link 
      to="/challenges" 
      className="inline-flex items-center gap-2 text-accent hover:text-neon transition-colors mb-6"
    >
      <ArrowLeftIcon className="w-5 h-5" />
      <span>Back to Challenges</span>
    </Link>
  );
};

export default BackButton; 