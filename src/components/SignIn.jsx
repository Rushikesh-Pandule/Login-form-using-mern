import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signin.css'; // custom styles for Poppins + extra polish

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
      credentials: 'include'
    });
    const data = await res.json();
    if (res.ok) {
      navigate('/dashboard');
    } else {
      alert(data.message);
    }
  };

  return (
    <Container 
      fluid 
      className="d-flex align-items-center justify-content-center signin-bg"
    >
      <Card className="signin-card shadow-lg border-0 rounded-4 p-4">
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">JobPortal</h2>
            <p className="text-muted">Sign in to your account</p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label className="fw-semibold">Select your role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="rounded-pill"
              >
                <option value="" disabled>Select your role</option>
                <option value="super_admin">Super Admin</option>
                <option value="employer">Employer</option>
                <option value="recruiter">Recruiter</option>
                <option value="hr">HR</option>
                <option value="candidate">Candidate</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-pill"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-pill"
              />
            </Form.Group>
            <div className="d-grid gap-2 mt-4">
              <Button variant="primary" type="submit" className="rounded-pill signin-btn">
                Sign In
              </Button>
            </div>
          </Form>
          <div className="text-center mt-3 text-muted">
            Don’t have an account?{" "}
            <a href="/signup" className="text-decoration-none fw-semibold link-primary">
              Sign Up
            </a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignIn;
