import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    login(formData).then(() => navigate(location.state?.from || '/dashboard', { replace: true })).catch((error) => setMessage(error.response?.data?.message || 'Could not log in.'));
  };

  const [message, setMessage] = useState(location.state?.message || '');

  return (
    <div className="auth-page">

      {/* Background overlay */}
      <div className="auth-overlay"></div>

      {/* Navbar */}
      <header className="auth-navbar">

        <Link to="/" className="auth-logo">
          <span className="logo-symbol">✕</span>
          <span>
            Garba<span>Mate</span>
          </span>
        </Link>

        <div className="auth-nav-right">
          <span>Don't have an account?</span>

          <Link to="/signup" className="nav-login-btn">
            Sign Up
          </Link>
        </div>

      </header>

      {/* Login Card */}
      <main className="auth-container">

        <div className="auth-card">

          {/* Decorative top */}
          <div className="card-decoration">✦</div>

          <div className="auth-heading">

            <p className="auth-small-heading">
              Welcome Back!
            </p>

            <h1>
              Log In to
              <br />
              <span>GarbaMate</span>
            </h1>

            <div className="gold-divider">
              <span>♡</span>
            </div>

            <p className="auth-subtitle">
              Continue your Garba journey
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {message && <p className="auth-message">{message}</p>}

            {/* Email */}
            <div className="input-group">

              <span className="input-icon">
                ✉
              </span>

              <input
                type="email"
                name="email"
                placeholder="Email or Phone Number"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* Password */}
            <div className="input-group">

              <span className="input-icon">
                🔒
              </span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "◉" : "○"}
              </button>

            </div>

            {/* Remember + Forgot */}
            <div className="login-options">

              <label>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password">
                Forgot password?
              </Link>

            </div>

            {/* Login */}
            <button
              type="submit"
              className="gold-button"
            >
              Login
              <span>→</span>
            </button>

          </form>

          {/* Divider */}
          <div className="or-divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          {/* Google */}
          <button className="google-button">
            <strong>G</strong>
            Continue with Google
          </button>

          {/* Signup */}
          <p className="bottom-text">
            Don't have an account?{" "}
            <Link to="/signup">
              Sign Up
            </Link>
          </p>

          {/* Bottom decoration */}
          <div className="card-corner left"></div>
          <div className="card-corner right"></div>

        </div>

      </main>

    </div>
  );
};

export default Login;