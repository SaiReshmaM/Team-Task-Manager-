import { useState, useEffect } from 'react';
import api from '../utils/api';

const Dashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/dashboard/stats');
                setStats(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    if (!stats) return <div className="container">Loading dashboard...</div>;

    return (
        <div className="container">
            <h2>Dashboard</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Overview of your team's task performance.</p>
            
            <div className="stats-grid">
                <div className="card stat-card">
                    <div className="stat-title">Total Tasks</div>
                    <div className="stat-value" style={{ color: 'var(--primary)' }}>{stats.totalTasks}</div>
                </div>
                <div className="card stat-card">
                    <div className="stat-title">Completed</div>
                    <div className="stat-value text-success">{stats.completedTasks}</div>
                </div>
                <div className="card stat-card">
                    <div className="stat-title">Pending</div>
                    <div className="stat-value text-warning">{stats.pendingTasks}</div>
                </div>
                <div className="card stat-card">
                    <div className="stat-title">Overdue</div>
                    <div className="stat-value text-danger">{stats.overdueTasks}</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
