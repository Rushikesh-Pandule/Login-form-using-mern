// src/components/SuperAdminDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiHome, FiLogOut, FiUser } from "react-icons/fi";
import './superadmin.css';

const SuperAdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard', { credentials: 'include' });
        if (res.status === 401) {
          navigate('/signin');
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        navigate('/signin');
      }
    };
    fetchDashboardData();
  }, [navigate]);

  const handleLogout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', { method: 'POST', credentials: 'include' });
    navigate('/signin');
  };

  if (!user) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">JobPortal</h1>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-link active"><FiHome className="icon"/> Dashboard</a>
          <a href="#" className="nav-link"><FiUsers className="icon"/> Manage Users</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="main-header">
          <div className="user-actions">
            <div className="profile-link"><FiUser className="icon"/> Profile</div>
            <button onClick={handleLogout} className="logout-button"><FiLogOut className="icon"/> Logout</button>
          </div>
        </header>

        <main className="main-content-area">
          <h1 className="welcome-title">Welcome Super Admin {user.name}</h1>
          <p className="welcome-text">This is the super admin dashboard. You have full control over the system.</p>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
