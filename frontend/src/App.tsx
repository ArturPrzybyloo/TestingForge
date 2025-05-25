import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import { Learn, CourseDetail } from './pages/Learn';
import AutomationPlayground from './pages/AutomationPlayground';
import ChallengeDetail from './pages/ChallengeDetail';
import './i18n';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Outlet /></MainLayout>}>
          <Route index element={<Home />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="challenges/:id" element={<ChallengeDetail />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="community" element={<Community />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/:moduleId" element={<CourseDetail />} />
          <Route path="automation-playground" element={<AutomationPlayground />} />
          <Route path="playground" element={<AutomationPlayground />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App; 