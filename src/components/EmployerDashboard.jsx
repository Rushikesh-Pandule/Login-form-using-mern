// src/components/EmployerDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt, FaTachometerAlt, FaUsers } from "react-icons/fa";
import "./EmployerDashboard.css";

const EmployerDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard", {
          credentials: "include",
        });
        if (res.status === 401) {
          navigate("/signin");
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        navigate("/signin");
      }
    };
    fetchDashboardData();
  }, [navigate]);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/signin");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="dashboard-container">
      <Row>
        {/* Sidebar */}
        <Col md={3} lg={2} className="sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">JobPortal</h2>
          </div>
          <Nav className="flex-column sidebar-nav">
            <Nav.Link href="#" className="nav-link active">
              <FaTachometerAlt className="me-2" /> Dashboard
            </Nav.Link>
            <Nav.Link href="#" className="nav-link">
              <FaUsers className="me-2" /> Manage Recruiters
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9} lg={10} className="main-content">
          <header className="main-header d-flex justify-content-end align-items-center">
            <div className="user-actions d-flex align-items-center">
              <FaUserCircle size={28} className="me-2 profile-icon" />
              <span className="me-3">{user.name}</span>
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                <FaSignOutAlt className="me-1" /> Logout
              </Button>
            </div>
          </header>

          <main className="main-content-area">
            <h1 className="welcome-title">Welcome Employer {user.name}</h1>
            <p>This is your dashboard to manage recruiters and job listings.</p>
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployerDashboard;
