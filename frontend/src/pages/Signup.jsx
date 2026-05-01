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
        <div className="auth-container">
            <div className="card auth-card">
                <h2>Create an Account</h2>
                <p>Join Team Task Manager today</p>
                
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required placeholder='e.g., "admin_user" for Admin' />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Choose a password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Signup</button>
                </form>
                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '500', textDecoration: 'none' }}>Log in here</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
