import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!phone || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Combine country code + phone
    const fullPhone = `251${phone}`;
    const result = await login(fullPhone, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.logoBox}>
            <ZPlayLogo />
          </div>
          <p className={styles.signInLabel}>Sign In</p>
          <h1 className={styles.welcomeTitle}>Welcome Back!</h1>
          <p className={styles.signInSub}>
            Sign in with your <span className={styles.brandLink}>Zplaybet account</span> credentials to continue.
          </p>
        </div>

        {/* Form Section */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {error && <div className={styles.errorBox}>{error}</div>}

          {/* Phone Field */}
          <div className={styles.phoneWrapper}>
            <span className={styles.countryCode}>251</span>
            <input
              type="tel"
              className={styles.phoneInput}
              placeholder="912345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              maxLength={9}
              inputMode="numeric"
              autoComplete="tel"
            />
          </div>

          {/* Password Field */}
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button
            type="submit"
            className={styles.loginBtn}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {/* Footer Links */}
        <div className={styles.footer}>
          <Link to="/change-password" className={styles.footerLink}>
            Forgot Password?
          </Link>
          <span className={styles.footerDivider}>|</span>
          <Link to="/register" className={styles.footerLink}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

// Inline SVG logo matching the ZPlay brand style
function ZPlayLogo() {
  return (
    <svg
      viewBox="0 0 200 80"
      xmlns="http://www.w3.org/2000/svg"
      width="180"
      height="72"
      aria-label="ZPlay logo"
    >
      <defs>
        <linearGradient id="zGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="playGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      {/* Z letter */}
      <text
        x="10"
        y="65"
        fontSize="72"
        fontWeight="900"
        fontFamily="Arial Black, sans-serif"
        fill="url(#zGrad)"
        style={{ letterSpacing: '-2px' }}
      >
        Z
      </text>
      {/* PLAY text */}
      <text
        x="72"
        y="60"
        fontSize="38"
        fontWeight="800"
        fontFamily="Arial Black, sans-serif"
        fill="url(#playGrad)"
        style={{ letterSpacing: '1px' }}
      >
        PLAY
      </text>
    </svg>
  );
}
