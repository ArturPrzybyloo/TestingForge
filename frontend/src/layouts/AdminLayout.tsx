import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { Cog8ToothIcon, UsersIcon, ChartBarIcon, ArrowLeftOnRectangleIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();

  const navLinkClasses = (
    { isActive }: { isActive: boolean; isPending?: boolean } // isPending is optional from NavLink
    ): string => {
    return `flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:text-primary-dark hover:bg-primary-light dark:hover:bg-neutral-700 dark:hover:text-neutral-100 ${isActive ? 'bg-primary-light dark:bg-neutral-700 text-primary-dark dark:text-white' : 'bg-transparent text-neutral-700 dark:text-neutral-200'}`;
  };

  return (
    <div className="min-h-screen flex bg-neutral-100 dark:bg-neutral-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-neutral-800 shadow-md flex-shrink-0 flex flex-col">
        <div className="p-4 border-b dark:border-neutral-700">
          <Link to="/admin" className="text-2xl font-bold text-primary dark:text-primary-light">
            Admin Panel
          </Link>
          {user && <p className="text-xs text-neutral-500 dark:text-neutral-400">Logged in as {user.username}</p>}
        </div>
        <nav className="mt-4 px-2 flex-grow">
          <NavLink to="/admin/dashboard" className={navLinkClasses} end>
            <ChartBarIcon className="h-5 w-5 mr-3" /> Stats
          </NavLink>
          <NavLink to="/admin/users" className={navLinkClasses}>
            <UsersIcon className="h-5 w-5 mr-3" /> Users
          </NavLink>
          <NavLink to="/admin/challenges" className={navLinkClasses}>
            <Cog8ToothIcon className="h-5 w-5 mr-3" /> Challenges
          </NavLink>
          {/* Add more admin nav links here (e.g., Badges, Settings) */}
        </nav>
        <div className="px-2 pb-4">
            <hr className="my-4 border-neutral-200 dark:border-neutral-700" />
            <NavLink to="/" className={navLinkClasses}>
                <HomeIcon className="h-5 w-5 mr-3" /> Go to Site
            </NavLink>
            <button 
                onClick={logout}
                className={`${navLinkClasses({isActive: false, isPending: false})} w-full text-left`}
            >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" /> Logout
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        <header className="bg-white dark:bg-neutral-800 shadow-sm p-4">
          {/* Could add breadcrumbs or page title here */}
          <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">Admin Dashboard</h1>
        </header>
        <main className="flex-grow p-6 overflow-auto">
          <Outlet /> {/* Admin page content will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 