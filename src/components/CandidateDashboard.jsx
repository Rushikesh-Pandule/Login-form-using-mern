// src/components/CandidateDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateDashboard = () => {
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
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h1 className="sidebar-title">JobPortal</h1>
                </div>
                <nav className="sidebar-nav">
                    <a href="#" className="nav-link active">Dashboard</a>
                    <a href="#" className="nav-link">Jobs</a>
                    <a href="#" className="nav-link">Profile</a>
                </nav>
            </aside>

            <div className="main-content">
                <header className="main-header">
                    <div className="search-section">
                        <input type="text" placeholder="Search jobs..." className="search-input" />
                        <button className="search-button">Search</button>
                    </div>
                    <div className="user-actions">
                        <div className="notification-bell">
                            <button className="notification-bell">
                                🔔
                                <span className="notification-count">3</span>
                            </button>
                        </div>
                        <div id="profile" className="profile-link">Profile</div>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>
                </header>

                <main className="main-content-area">
                    <h1 className="welcome-title">Welcome {user.name} ({user.role})</h1>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <h2 className="stat-title">Jobs Applied</h2>
                            <p className="stat-value">12</p>
                        </div>
                        <div className="stat-card">
                            <h2 className="stat-title">Interviews Scheduled</h2>
                            <p className="stat-value">3</p>
                        </div>
                        <div className="stat-card">
                            <h2 className="stat-title">Profile Completeness</h2>
                            <p className="stat-value">85%</p>
                        </div>
                    </div>

                    <div className="table-section">
                        <h2 className="table-title">Latest Jobs</h2>
                        <table className="job-table">
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Company</th>
                                    <th>Location</th>
                                    <th>Applied On</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Frontend Developer</td><td>Google</td><td>Bangalore</td><td>2025-09-18</td></tr>
                                <tr><td>Backend Engineer</td><td>Amazon</td><td>Hyderabad</td><td>2025-09-17</td></tr>
                                <tr><td>Data Analyst</td><td>Microsoft</td><td>Pune</td><td>2025-09-16</td></tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CandidateDashboard;