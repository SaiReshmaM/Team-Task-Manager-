import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="navbar-brand">Team Task Manager</Link>
            <div className="navbar-links">
                {user ? (
                    <>
                        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Dashboard</Link>
                        {user.role === 'ADMIN' && <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>Projects</Link>}
                        <Link to="/tasks" className={`nav-link ${isActive('/tasks')}`}>Tasks</Link>
                        <span className="user-greeting">Hi, {user.username} ({user.role})</span>
                        <button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={`nav-link ${isActive('/login')}`}>Login</Link>
                        <Link to="/signup" className={`btn btn-primary btn-sm`}>Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
