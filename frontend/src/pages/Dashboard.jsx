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

    if (!stats) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Dashboard</h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
                    <h3>Total Tasks</h3>
                    <p style={{ fontSize: '2rem' }}>{stats.totalTasks}</p>
                </div>
                <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
                    <h3>Completed</h3>
                    <p style={{ fontSize: '2rem', color: 'green' }}>{stats.completedTasks}</p>
                </div>
                <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
                    <h3>Pending</h3>
                    <p style={{ fontSize: '2rem', color: 'orange' }}>{stats.pendingTasks}</p>
                </div>
                <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
                    <h3>Overdue</h3>
                    <p style={{ fontSize: '2rem', color: 'red' }}>{stats.overdueTasks}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
