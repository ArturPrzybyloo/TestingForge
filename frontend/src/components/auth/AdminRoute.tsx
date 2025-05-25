import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// This component assumes that it will be nested within a ProtectedRoute
// So, user is already authenticated. We just need to check for admin status.
const AdminRoute: React.FC = () => {
  const { user, isLoading, isAuthenticated } = useAuth(); // isLoading and isAuthenticated might be useful
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not loading and not authenticated, ProtectedRoute should have already redirected.
  // But as a safeguard, or if this route is used independently (not recommended pattern here):
  if (!isAuthenticated) {
     return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but not an admin, redirect to a non-admin page (e.g., dashboard or home)
  if (!user?.isAdmin) {
    // Could also redirect to an "Unauthorized" page
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />; // Render child admin route element
};

export default AdminRoute; 