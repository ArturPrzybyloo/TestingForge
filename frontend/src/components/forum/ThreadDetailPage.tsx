import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Post {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

const getPosts = (categoryId: string, threadId: string): Post[] => {
  const data = localStorage.getItem(`forum_posts_${categoryId}_${threadId}`);
  if (data) return JSON.parse(data);
  // Seed with example posts
  const example = [
    { id: '1', author: 'admin', content: 'Welcome to the thread!', createdAt: new Date().toISOString() },
  ];
  localStorage.setItem(`forum_posts_${categoryId}_${threadId}`, JSON.stringify(example));
  return example;
};

const ThreadDetailPage: React.FC = () => {
  const { categoryId, threadId } = useParams<{ categoryId: string; threadId: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categoryId && threadId) setPosts(getPosts(categoryId, threadId));
  }, [categoryId, threadId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [posts]);

  const handleNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim() || !categoryId || !threadId) return;
    const newPost = {
      id: Date.now().toString(),
      author: author.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...posts, newPost];
    setPosts(updated);
    localStorage.setItem(`forum_posts_${categoryId}_${threadId}`, JSON.stringify(updated));
    setAuthor('');
    setContent('');
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-400 hover:text-blue-300">&larr; Back to threads</button>
      <h2 className="text-2xl font-bold mb-6 text-green-400">Thread</h2>
      <div className="space-y-4 mb-8">
        {posts.map(post => (
          <div key={post.id} className="bg-gray-800 rounded-lg p-4 border-2 border-gray-700 shadow">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-white">{post.author}</span>
              <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <div className="text-gray-300 whitespace-pre-line">{post.content}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form className="bg-gray-700 rounded-lg p-4" onSubmit={handleNewPost}>
        <input
          className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
          placeholder="Your name"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <textarea
          className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
          placeholder="Write your reply..."
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={3}
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 font-medium shadow" type="submit">Post Reply</button>
      </form>
    </section>
  );
};

export default ThreadDetailPage; 