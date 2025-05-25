import MainLayout from '../layouts/MainLayout';

export default function DashboardPage() {
  return (
    <MainLayout>
      <h1 className="font-display text-4xl text-neon mb-8 tracking-wider">Active Challenges</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {[1,2,3].map(i => (
          <div key={i} className="bg-card rounded-xl p-6 border border-border shadow-neonBlue hover:shadow-accent transition group relative overflow-hidden">
            <div className="absolute right-4 top-4 text-xs text-accent2 font-mono">#{i}</div>
            <h2 className="font-display text-2xl text-neonBlue mb-2">SQL Injection {i}</h2>
            <p className="text-gray-300 mb-4">Find and exploit the SQLi vulnerability in the login form. Difficulty: <span className="text-accent">Medium</span></p>
            <div className="flex items-center gap-4">
              <span className="bg-dark2 px-3 py-1 rounded-full text-neon text-xs font-bold">+200 pts</span>
              <button className="ml-auto px-4 py-2 bg-neonBlue text-dark font-bold rounded shadow-neonBlue hover:bg-accent2 hover:text-white transition">Start</button>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
} 