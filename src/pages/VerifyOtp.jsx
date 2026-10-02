import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resendOtp, verifyOtp } from '../services/api';
import '../styles/auth.css';

export default function VerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || '';
  const [digits, setDigits] = useState(Array(6).fill(''));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(30);
  const inputs = useRef([]);

  useEffect(() => {
    if (!email) navigate('/signup', { replace: true });
  }, [email, navigate]);

  useEffect(() => {
    if (!cooldown) return undefined;
    const timer = window.setInterval(() => setCooldown((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  const updateDigit = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    if (digit && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
  };

  const verify = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await verifyOtp(email, digits.join(''));
      navigate('/login', { state: { message: 'Email verified. You can now log in.' } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not verify your code.');
    }
  };

  const resend = async () => {
    if (cooldown) return;
    setError('');
    try {
      const response = await resendOtp(email);
      setMessage(response.data.message);
      setCooldown(30);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not resend your code.');
      setCooldown(requestError.response?.data?.retryAfter || 30);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-overlay" />
      <header className="auth-navbar">
        <Link to="/" className="auth-logo"><span className="logo-symbol">✕</span><span>Garba<span>Mate</span></span></Link>
        <Link to="/login" className="nav-login-btn">Log in</Link>
      </header>
      <main className="auth-container">
        <div className="auth-card otp-card">
          <div className="card-decoration">✦</div>
          <div className="auth-heading">
            <p className="auth-small-heading">One final step</p>
            <h1>Verify Your<br /><span>Email</span></h1>
            <div className="gold-divider"><span>♡</span></div>
            <p className="auth-subtitle">Enter the 6-digit code sent to<br /><strong>{email}</strong></p>
          </div>
          <form onSubmit={verify}>
            {error && <p className="auth-message auth-message-error">{error}</p>}
            {message && <p className="auth-message">{message}</p>}
            <div className="otp-inputs">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => { inputs.current[index] = element; }}
                  value={digit}
                  inputMode="numeric"
                  maxLength={1}
                  aria-label={`Verification digit ${index + 1}`}
                  onChange={(event) => updateDigit(index, event.target.value)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                />
              ))}
            </div>
            <button type="submit" className="gold-button" disabled={digits.join('').length !== 6}>Verify Email <span>→</span></button>
          </form>
          <p className="bottom-text">Didn't receive it? <button type="button" className="resend-button" disabled={Boolean(cooldown)} onClick={resend}>{cooldown ? `Resend in ${cooldown}s` : 'Resend OTP'}</button></p>
        </div>
      </main>
    </div>
  );
}
