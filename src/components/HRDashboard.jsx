import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Card, Button } from "react-bootstrap";
import { FiHome, FiBriefcase, FiUsers, FiFileText, FiLogOut, FiUserCheck } from "react-icons/fi";
import "./hr.css";

const HRDashboard = ({ user }) => {
  const navigate = useNavigate();

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
            <FiBriefcase className="me-2" /> Manage Job Postings
          </Nav.Link>
          <Nav.Link className="nav-link">
            <FiUsers className="me-2" /> Candidate Pipeline
          </Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <Navbar bg="light" expand="lg" className="shadow-sm px-3">
          <Container fluid className="d-flex justify-content-between">
            <Navbar.Brand className="fw-bold text-primary">HR Dashboard</Navbar.Brand>
            <div className="d-flex align-items-center gap-3">
              <FiUserCheck className="fs-4 text-primary" />
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                <FiLogOut className="me-1" /> Logout
              </Button>
            </div>
          </Container>
        </Navbar>

        {/* Content Area */}
        <Container fluid className="py-4">
          <h3 className="fw-bold mb-4">Welcome HR {user.name}</h3>
          <p className="text-muted mb-4">
            Manage job applications, candidate pipelines, and company job postings from here.
          </p>

          {/* Analytics Cards */}
          <Row className="g-4 mb-4">
            <Col sm={6} lg={3}>
              <Card className="dashboard-card">
                <Card.Body className="d-flex align-items-center">
                  <FiBriefcase className="icon text-primary" />
                  <div>
                    <h5>8</h5>
                    <p>Open Positions</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={3}>
              <Card className="dashboard-card">
                <Card.Body className="d-flex align-items-center">
                  <FiUsers className="icon text-success" />
                  <div>
                    <h5>132</h5>
                    <p>Candidates in Pipeline</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={3}>
              <Card className="dashboard-card">
                <Card.Body className="d-flex align-items-center">
                  <FiFileText className="icon text-warning" />
                  <div>
                    <h5>47</h5>
                    <p>Interviews Scheduled</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={3}>
              <Card className="dashboard-card">
                <Card.Body className="d-flex align-items-center">
                  <FiUserCheck className="icon text-purple" />
                  <div>
                    <h5>15</h5>
                    <p>Hires Made</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Updates */}
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-semibold mb-2">Recent HR Activities</h5>
              <ul className="text-muted mb-0">
                <li>Scheduled interview for Software Engineer position.</li>
                <li>Moved 3 candidates to the final round.</li>
                <li>Closed 1 position for Data Analyst.</li>
              </ul>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default HRDashboard;
