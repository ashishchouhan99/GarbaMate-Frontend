import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useAuth } from "../context/AuthContext";
import { apiError, toast } from "../lib/toast";

const Signup = () => {

  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    if (!termsAccepted) {
      setMessage('You must agree to the Terms & Conditions to create an account.');
      return;
    }

    setMessage('');
    signup({ name: formData.name, email: formData.email, phone: formData.phone, password: formData.password })
      .then((data) => { toast.success('Account created successfully.'); navigate('/verify-otp', { state: { email: data.email } }); })
      .catch((error) => { const message = apiError(error, 'Unable to create your account. Please try again.'); setMessage(message); toast.error(message); });
  };

  const [message, setMessage] = useState('');

  return (
    <div className="auth-page">

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

          <span>
            Already have an account?
          </span>

          <Link to="/login" className="nav-login-btn">
            Login
          </Link>

        </div>

      </header>

      {/* Signup */}
      <main className="auth-container">

        <div className="auth-card signup-card">

          <div className="card-decoration">
            ✦
          </div>

          <div className="auth-heading">

            <p className="auth-small-heading">
              Join the Celebration
            </p>

            <h1>
              Create Your
              <br />
              <span>GarbaMate</span>
            </h1>

            <div className="gold-divider">
              <span>♡</span>
            </div>

            <p className="auth-subtitle">
              Find your perfect Garba partner
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {message && <p className="auth-message">{message}</p>}

            {/* Name */}
            <div className="input-group">

              <span className="input-icon">
                ♙
              </span>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">
              <span className="input-icon">☎</span>
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            </div>

            {/* Email */}
            <div className="input-group">

              <span className="input-icon">
                ✉
              </span>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
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
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "◉" : "○"}
              </button>

            </div>

            {/* Confirm Password */}
            <div className="input-group">

              <span className="input-icon">
                🔒
              </span>

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? "◉" : "○"}
              </button>

            </div>

            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>
                I agree to{" "}
                <Link to="/terms-and-conditions" onClick={(e) => e.stopPropagation()}>
                  Terms &amp; Conditions
                </Link>
              </span>
            </label>

            {/* Signup */}
            <button
              type="submit"
              className="gold-button"
            >
              Sign Up
              <span>→</span>
            </button>

          </form>

          <p className="bottom-text">

            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>

          </p>

          <div className="card-corner left"></div>
          <div className="card-corner right"></div>

        </div>

      </main>

    </div>
  );
};

export default Signup;