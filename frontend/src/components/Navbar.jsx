import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#333', color: '#fff' }}>
            <h2>Team Task Manager</h2>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {user ? (
                    <>
                        <Link to="/dashboard" style={{ color: '#fff' }}>Dashboard</Link>
                        {user.role === 'ADMIN' && <Link to="/projects" style={{ color: '#fff' }}>Projects</Link>}
                        <Link to="/tasks" style={{ color: '#fff' }}>Tasks</Link>
                        <span>Welcome, {user.username} ({user.role})</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: '#fff' }}>Login</Link>
                        <Link to="/signup" style={{ color: '#fff' }}>Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
