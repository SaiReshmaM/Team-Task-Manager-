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
        <div className="auth-container">
            <div className="card auth-card">
                <h2>Welcome Back</h2>
                <p>Login to your account</p>
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '500', textDecoration: 'none' }}>Sign up here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
