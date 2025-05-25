import React from 'react';

const AdminDashboardPage: React.FC = () => {
  // Placeholder for admin statistics
  const stats = {
    totalUsers: 120,
    activeChallenges: 25,
    totalSubmissions: 567,
    pendingFlags: 3,
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">Total Users</h3>
          <p className="text-3xl font-bold text-blue-500 dark:text-blue-400 mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">Active Challenges</h3>
          <p className="text-3xl font-bold text-green-500 dark:text-green-400 mt-2">{stats.activeChallenges}</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">Total Submissions</h3>
          <p className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mt-2">{stats.totalSubmissions}</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">Pending Flags</h3>
          <p className="text-3xl font-bold text-red-500 dark:text-red-400 mt-2">{stats.pendingFlags}</p>
        </div>
      </div>
      {/* Further charts or quick actions can be added here */}
    </div>
  );
};

export default AdminDashboardPage; 