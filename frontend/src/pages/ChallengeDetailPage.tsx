import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const ChallengeDetailPage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  // Placeholder for fetching challenge details based on challengeId
  const challenge = {
    id: challengeId,
    title: 'Sample Challenge Title',
    description: 'This is a detailed description of the challenge. It explains what the user needs to do, the context, and any specific rules or constraints. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    type: 'API',
    difficulty: 'Medium',
    points: 150,
    content: '<p>Challenge content goes here. This could be HTML, markdown, or plain text. For API challenges, it might include endpoint details, request formats, etc. For UI challenges, it could be a description of a vulnerable component.</p>',
    hints: [
      'Hint 1: Check the input validation.',
      'Hint 2: Look for common vulnerabilities related to the technology used.',
    ],
  };

  // Placeholder state for flag submission
  const [flag, setFlag] = React.useState('');
  const [submissionResult, setSubmissionResult] = React.useState<string | null>(null);

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for API call to submit flag
    console.log('Submitting flag:', flag, 'for challenge:', challengeId);
    // Simulate API response
    if (flag === 'CORRECT_FLAG_PLACEHOLDER') {
      setSubmissionResult('Correct! You earned ' + challenge.points + ' points.');
    } else {
      setSubmissionResult('Incorrect flag. Try again!');
    }
  };

  if (!challenge) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">Challenge not found.</div>;
  }

  return (
    <MainLayout>
      <div className="bg-card rounded-xl p-8 border border-border shadow-neonBlue">
        <h1 className="font-display text-3xl text-neonBlue mb-2">SQL Injection</h1>
        <div className="mb-4 text-accent font-mono">Difficulty: Medium</div>
        <p className="mb-6 text-gray-300">Your mission: Bypass the login form using SQL injection. <br/> <span className="text-neon">Flag format: HTB&#123;...&#125;</span></p>
        <div className="mb-6">
          <textarea className="w-full h-32 bg-dark2 border border-border rounded p-3 text-neon font-mono focus:ring-2 focus:ring-neonBlue transition" placeholder="Enter your payload or flag here..."></textarea>
        </div>
        <button className="px-6 py-2 bg-neonBlue text-dark font-bold rounded shadow-neonBlue hover:bg-accent2 hover:text-white transition">Submit</button>
        <div className="mt-6 text-success font-bold animate-pulse-neon">Correct! +200 pts</div>
      </div>
    </MainLayout>
  );
};

export default ChallengeDetailPage; 