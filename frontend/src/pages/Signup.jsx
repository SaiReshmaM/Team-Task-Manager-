import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await api.post('/auth/signup', { username, password });
            setSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed! Username might be taken.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create an Account</h2>
                <p style={styles.subtitle}>Join Team Task Manager today</p>
                
                {error && <div style={styles.error}>{error}</div>}
                {success && <div style={styles.success}>{success}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input type="text" style={styles.input} value={username} onChange={e => setUsername(e.target.value)} required placeholder='e.g., "admin_user" for Admin' />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input type="password" style={styles.input} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Choose a password" />
                    </div>
                    <button type="submit" style={styles.button}>Signup</button>
                </form>
                <p style={styles.footerText}>
                    Already have an account? <Link to="/login" style={styles.link}>Log in here</Link>
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
    button: { padding: '0.75rem', borderRadius: '6px', border: 'none', background: '#28a745', color: '#fff', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' },
    error: { background: '#ffdddd', color: '#d8000c', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' },
    success: { background: '#d4edda', color: '#155724', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' },
    footerText: { marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' },
    link: { color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }
};

export default Signup;
