import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // custom styles for Poppins + modern theme

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      navigate('/signin');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header text-center">
          <h1 className="signup-title">JobPortal</h1>
          <p className="signup-subtitle">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select"
            required
          >
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
            <option value="recruiter">Recruiter</option>
            <option value="hr">HR</option>
            <option value="super_admin">Super Admin</option>
          </select>

          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>

        <p className="signin-link-text text-center">
          Already have an account?{" "}
          <a href="/signin" className="signin-link">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
