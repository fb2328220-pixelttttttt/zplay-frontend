import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/users/all');
      setUsers(data);
    } catch (err) {
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <p className={styles.greeting}>Welcome back,</p>
            <h1 className={styles.userName}>{user?.name}</h1>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className={styles.main}>
        {/* Quick actions */}
        <div className={styles.actions}>
          <Link to="/change-password" className={styles.actionBtn}>
            🔑 Change Password
          </Link>
          <button onClick={fetchUsers} className={styles.refreshBtn}>
            🔄 Refresh
          </button>
        </div>

        {/* My Info Card */}
        <div className={styles.myInfoCard}>
          <h2 className={styles.sectionTitle}>My Account</h2>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Name</span>
            <span className={styles.infoValue}>{user?.name}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Phone</span>
            <span className={styles.infoValue}>{user?.phone}</span>
          </div>
        </div>

        {/* Users Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2 className={styles.sectionTitle}>All Users</h2>
            <span className={styles.userCount}>{users.length} users</span>
          </div>

          {loading && (
            <div className={styles.loadingState}>Loading users...</div>
          )}

          {error && (
            <div className={styles.errorBox}>{error}</div>
          )}

          {!loading && !error && users.length === 0 && (
            <div className={styles.emptyState}>No users found.</div>
          )}

          {!loading && users.length > 0 && (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>#</th>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Phone</th>
                    <th className={styles.th}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, index) => (
                    <tr key={u._id} className={styles.tr}>
                      <td className={styles.td}>{index + 1}</td>
                      <td className={styles.td}>
                        <div className={styles.nameCell}>
                          <div className={styles.avatar}>
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <span>{u.name}</span>
                        </div>
                      </td>
                      <td className={styles.td}>{u.phone}</td>
                      <td className={styles.td}>
                        {new Date(u.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
