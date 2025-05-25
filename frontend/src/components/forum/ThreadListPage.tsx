import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Thread {
  id: string;
  title: string;
  author: string;
  createdAt: string;
}

const getThreads = (categoryId: string): Thread[] => {
  const data = localStorage.getItem(`forum_threads_${categoryId}`);
  if (data) return JSON.parse(data);
  // Seed with example threads
  const example = [
    { id: '1', title: 'Welcome to the forum!', author: 'admin', createdAt: new Date().toISOString() },
    { id: '2', title: 'How do you test APIs?', author: 'qa_user', createdAt: new Date().toISOString() },
  ];
  localStorage.setItem(`forum_threads_${categoryId}`, JSON.stringify(example));
  return example;
};

const ThreadListPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (categoryId) setThreads(getThreads(categoryId));
  }, [categoryId]);

  const handleNewThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !categoryId) return;
    const newThread = {
      id: Date.now().toString(),
      title: title.trim(),
      author: author.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newThread, ...threads];
    setThreads(updated);
    localStorage.setItem(`forum_threads_${categoryId}`, JSON.stringify(updated));
    setTitle('');
    setAuthor('');
    setShowForm(false);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-400 hover:text-blue-300">&larr; Back to categories</button>
      <h2 className="text-3xl font-bold mb-6 text-green-400">Threads</h2>
      <button
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 font-medium shadow"
        onClick={() => setShowForm(f => !f)}
      >
        {showForm ? 'Cancel' : 'New Thread'}
      </button>
      {showForm && (
        <form className="mb-8 bg-gray-700 rounded-lg p-4" onSubmit={handleNewThread}>
          <input
            className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
            placeholder="Thread title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
            placeholder="Your name"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
          <button className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 font-medium shadow" type="submit">Create Thread</button>
        </form>
      )}
      <div className="space-y-4">
        {threads.length === 0 && <div className="text-gray-400">No threads yet. Be the first to post!</div>}
        {threads.map(thread => (
          <button
            key={thread.id}
            onClick={() => navigate(`/community/forum/${categoryId}/${thread.id}`)}
            className="w-full text-left bg-gray-800 rounded-lg p-4 border-2 border-gray-700 hover:border-blue-400 transition-colors shadow"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-lg text-white">{thread.title}</span>
              <span className="text-xs text-gray-400">{new Date(thread.createdAt).toLocaleString()}</span>
            </div>
            <div className="text-sm text-gray-400">by {thread.author}</div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ThreadListPage; 