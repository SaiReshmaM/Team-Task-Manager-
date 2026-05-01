import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { username, password });
            login(res.data.token, res.data.username, res.data.role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed! Check your credentials.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>
                <p style={styles.subtitle}>Login to your account</p>
                {error && <div style={styles.error}>{error}</div>}
                
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input type="text" style={styles.input} value={username} onChange={e => setUsername(e.target.value)} required placeholder="Enter username" />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input type="password" style={styles.input} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter password" />
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
                </form>
                <p style={styles.footerText}>
                    Don't have an account? <Link to="/signup" style={styles.link}>Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', backgroundColor: '#f4f7f6' },
    card: { background: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
    title: { margin: '0 0 0.5rem 0', color: '#333' },
    subtitle: { margin: '0 0 1.5rem 0', color: '#666', fontSize: '0.9rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.3rem' },
    label: { fontSize: '0.85rem', fontWeight: 'bold', color: '#444' },
    input: { padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem', outline: 'none' },
    button: { padding: '0.75rem', borderRadius: '6px', border: 'none', background: '#007bff', color: '#fff', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' },
    error: { background: '#ffdddd', color: '#d8000c', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' },
    footerText: { marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' },
    link: { color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }
};

export default Login;
