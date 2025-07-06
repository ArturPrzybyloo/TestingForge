import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import ForumCategory from './pages/ForumCategory';
import { Learn, CourseDetail } from './pages/Learn';
import AutomationPlayground from './pages/AutomationPlayground';
import ChallengeDetail from './pages/ChallengeDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerification from './pages/EmailVerification';
import './i18n';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout><Outlet /></MainLayout>}>
            <Route index element={<Home />} />
            
            {/* Protected Routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="challenges" element={<Challenges />} />
              <Route path="challenges/:id" element={<ChallengeDetail />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="learn" element={<Learn />} />
              <Route path="learn/:moduleId" element={<CourseDetail />} />
              <Route path="automation-playground" element={<AutomationPlayground />} />
              <Route path="playground" element={<AutomationPlayground />} />
            </Route>
            
            {/* Public Routes */}
            <Route path="community" element={<Community />} />
            <Route path="community/forum/:categoryId" element={<ForumCategory />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App; 