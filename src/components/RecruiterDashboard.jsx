// src/components/RecruiterDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Card, Button } from "react-bootstrap";
import { FiHome, FiBriefcase, FiUser, FiLogOut, FiUsers, FiCheckCircle, FiFileText } from "react-icons/fi";
import "./recruiter.css";

const RecruiterDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard", { credentials: "include" });
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
    await fetch("http://localhost:5000/api/auth/logout", { method: "POST", credentials: "include" });
    navigate("/signin");
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">JobPortal</h2>
        <Nav className="flex-column mt-4">
          <Nav.Link className="nav-link active">
            <FiHome className="me-2" /> Dashboard
          </Nav.Link>
          <Nav.Link className="nav-link">
            <FiBriefcase className="me-2" /> Jobs
          </Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <Navbar bg="light" expand="lg" className="shadow-sm px-3">
          <Container fluid className="d-flex justify-content-between">
            <Navbar.Brand className="fw-bold text-primary">Recruiter Dashboard</Navbar.Brand>
            <div className="d-flex align-items-center gap-3">
              <FiUser className="fs-4 text-primary" />
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                <FiLogOut className="me-1" /> Logout
              </Button>
            </div>
          </Container>
        </Navbar>

        {/* Content Area */}
        <Container fluid className="py-4">
          <h3 className="fw-bold mb-4">Welcome Recruiter {user.name}</h3>

          {/* Analytics Cards */}
          <Row className="g-4 mb-4">
            <Col sm={6} lg={3}>
              <Card className="dashboard-card">
                <Card.Body className="d-flex align-items-center">
                  <FiBriefcase className="icon text-primary" />
                  <div>
                    <h5>12</h5>
                    <p>Active Jobs</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={3}>
              <Card className="dashboard-card">
                <Card.Body className="d-flex align-items-center">
                  <FiUsers className="icon text-success" />
                  <div>
                    <h5>245</h5>
                    <p>Applicants</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={3}>
              <Card className="dashboard-card">
                <Card.Body className="d-flex align-items-center">
                  <FiFileText className="icon text-warning" />
                  <div>
                    <h5>58</h5>
                    <p>Resumes Reviewed</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={3}>
              <Card className="dashboard-card">
                <Card.Body className="d-flex align-items-center">
                  <FiCheckCircle className="icon text-purple" />
                  <div>
                    <h5>18</h5>
                    <p>Hires Made</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Activities */}
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-semibold mb-2">Recent Activities</h5>
              <p className="text-muted mb-0">
                Track recruiter activity logs, job postings, and candidate updates here.
              </p>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
