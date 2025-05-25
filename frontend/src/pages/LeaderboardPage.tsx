import MainLayout from '../layouts/MainLayout';

export default function LeaderboardPage() {
  return (
    <MainLayout>
      <h1 className="font-display text-3xl text-neonBlue mb-8">Leaderboard</h1>
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="text-accent2">#</th>
            <th className="text-neon">User</th>
            <th className="text-neonBlue">Points</th>
            <th className="text-accent">Badges</th>
          </tr>
        </thead>
        <tbody>
          {[{name:'Neo',pts:1200,badges:3},{name:'Trinity',pts:1100,badges:2},{name:'Morpheus',pts:900,badges:1}].map((u,i)=>(
            <tr key={u.name} className="bg-card rounded-xl shadow-neonBlue hover:shadow-accent transition">
              <td className="px-4 py-2 font-mono text-accent2">{i+1}</td>
              <td className="px-4 py-2 font-bold">{u.name}</td>
              <td className="px-4 py-2 text-neonBlue">{u.pts}</td>
              <td className="px-4 py-2">
                {Array(u.badges).fill(0).map((_,j)=>(
                  <span key={j} className="inline-block w-4 h-4 bg-neon rounded-full mx-1 shadow-neon"></span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
} 