// src/App.jsx

import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CandidateDashboard from './components/CandidateDashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import RecruiterDashboard from './components/RecruiterDashboard';
import HRDashboard from './components/HRDashboard';

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard', { credentials: 'include' });
        if (res.status === 401) {
          navigate('/signin');
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/signin');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render the correct dashboard based on the user's role
  switch (user?.role) {
    case 'super_admin':
      return <SuperAdminDashboard user={user} />;
    case 'employer':
      return <EmployerDashboard user={user} />;
    case 'recruiter':
      return <RecruiterDashboard user={user} />;
    case 'hr':
      return <HRDashboard user={user} />;
    case 'candidate':
    default:
      return <CandidateDashboard user={user} />;
  }
};

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<ProtectedRoutes />} />
      <Route path="/dashboard" element={<ProtectedRoutes />} />
    </Routes>
  );
}

export default App;