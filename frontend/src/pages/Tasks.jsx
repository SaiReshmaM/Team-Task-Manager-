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

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Tasks</h2>
            {user.role === 'ADMIN' && (
                <form onSubmit={handleCreate} style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                    <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                    <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
                    <select value={projectId} onChange={e => setProjectId(e.target.value)} required>
                        <option value="">Select Project</option>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <input type="text" placeholder="Assignee Username" value={assigneeUsername} onChange={e => setAssigneeUsername(e.target.value)} />
                    <button type="submit">Create Task</button>
                </form>
            )}
            <ul>
                {tasks.map(t => (
                    <li key={t.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #eee' }}>
                        <strong>{t.title}</strong> ({t.status}) - Due: {t.dueDate} <br/>
                        {t.description} <br/>
                        <em>Assigned to: {t.assigneeUsername || 'Unassigned'}</em> <br/>
                        <select value={t.status} onChange={e => handleStatusUpdate(t.id, e.target.value)} style={{ marginTop: '0.5rem' }}>
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
