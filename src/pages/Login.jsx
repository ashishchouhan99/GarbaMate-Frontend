import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useAuth } from "../context/AuthContext";
import { apiError, toast } from "../lib/toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    setMessage('');
    setSubmitting(true);
    const startedAt = Date.now();
    const toastId = toast.loading('Signing you in…');
    const request = login(formData);
    const finishToast = (type, message) => {
      const remaining = Math.max(0, 600 - (Date.now() - startedAt));
      window.setTimeout(() => toast[type](message, { id: toastId }), remaining);
      return remaining;
    };
    request
      .then(() => {
        const remaining = finishToast('success', 'Welcome back!');
        window.setTimeout(() => navigate(location.state?.from || '/dashboard', { replace: true }), remaining);
      })
      .catch((error) => {
        const message = apiError(error, 'Unable to sign in. Please try again.');
        finishToast('error', message);
        setMessage(message);
      })
      .finally(() => setSubmitting(false));
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
              disabled={submitting}
            >
              {submitting ? 'Signing in…' : 'Login'}
              <span>→</span>
            </button>

          </form>

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