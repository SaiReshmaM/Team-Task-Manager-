import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const { user } = useContext(AuthContext);
    
    // Create form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [projectId, setProjectId] = useState('');
    const [assigneeUsername, setAssigneeUsername] = useState('');

    useEffect(() => {
        fetchTasks();
        if (user.role === 'ADMIN') {
            fetchProjects();
        }
    }, [user.role]);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tasks', { title, description, dueDate, projectId, assigneeUsername });
            setTitle(''); setDescription(''); setDueDate(''); setProjectId(''); setAssigneeUsername('');
            fetchTasks();
        } catch (err) {
            alert(err.response?.data?.error || "Error creating task");
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const taskToUpdate = tasks.find(t => t.id === id);
            await api.put(`/tasks/${id}`, { ...taskToUpdate, status: newStatus });
            fetchTasks();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "Error updating task status");
        }
    };

    const getBadgeClass = (status) => {
        if (status === 'TODO') return 'badge-todo';
        if (status === 'IN_PROGRESS') return 'badge-inprogress';
        return 'badge-done';
    };

    return (
        <div className="container">
            <h2>Tasks Board</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Manage and update your assigned tasks.</p>
            
            {user.role === 'ADMIN' && (
                <form onSubmit={handleCreate} className="form-inline">
                    <div className="form-group" style={{ flex: '1.5' }}>
                        <label className="form-label">Task Title</label>
                        <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required placeholder="What needs to be done?" />
                    </div>
                    <div className="form-group" style={{ flex: '2' }}>
                        <label className="form-label">Description</label>
                        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} placeholder="Details..." />
                    </div>
                    <div className="form-group" style={{ minWidth: '150px' }}>
                        <label className="form-label">Due Date</label>
                        <input type="date" className="form-control" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
                    </div>
                    <div className="form-group" style={{ minWidth: '150px' }}>
                        <label className="form-label">Project</label>
                        <select className="form-control" value={projectId} onChange={e => setProjectId(e.target.value)} required>
                            <option value="">Select...</option>
                            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group" style={{ minWidth: '150px' }}>
                        <label className="form-label">Assignee</label>
                        <input type="text" className="form-control" placeholder="Username" value={assigneeUsername} onChange={e => setAssigneeUsername(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ height: 'fit-content', padding: '0.75rem 1.5rem' }}>Add Task</button>
                </form>
            )}
            
            <div className="grid-layout">
                {tasks.map(t => (
                    <div key={t.id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{t.title}</h3>
                            <span className={`badge ${getBadgeClass(t.status)}`}>{t.status.replace('_', ' ')}</span>
                        </div>
                        
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem', minHeight: '40px' }}>
                            {t.description || 'No description provided.'}
                        </p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                            <span><strong>Due:</strong> {t.dueDate}</span>
                            <span><strong>Assignee:</strong> <span style={{ color: 'var(--primary)' }}>{t.assigneeUsername || 'Unassigned'}</span></span>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Update Status:</label>
                            <select 
                                className="form-control" 
                                style={{ width: 'auto', padding: '0.5rem' }}
                                value={t.status} 
                                onChange={e => handleStatusUpdate(t.id, e.target.value)}
                            >
                                <option value="TODO">TODO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>
                    </div>
                ))}
                {tasks.length === 0 && <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1' }}>No tasks found.</p>}
            </div>
        </div>
    );
};

export default Tasks;
