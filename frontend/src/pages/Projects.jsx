import { useState, useEffect } from 'react';
import api from '../utils/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

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
            await api.post('/projects', { name, description });
            setName('');
            setDescription('');
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await api.delete(`/projects/${id}`);
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddMember = async (projectId) => {
        const username = prompt("Enter username to add:");
        if (username) {
            try {
                await api.post(`/projects/${projectId}/members/${username}`);
                fetchProjects();
            } catch (err) {
                alert(err.response?.data?.error || "Error adding member");
            }
        }
    };

    return (
        <div className="container">
            <h2>Projects Management</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Create projects and assign members. (Admin Only)</p>
            
            <form onSubmit={handleCreate} className="form-inline">
                <div className="form-group">
                    <label className="form-label">Project Name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g., Q3 Marketing" />
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description..." />
                </div>
                <button type="submit" className="btn btn-primary">Create Project</button>
            </form>
            
            <div className="grid-layout">
                {projects.map(p => (
                    <div key={p.id} className="card">
                        <h3 style={{ marginBottom: '0.5rem' }}>{p.name}</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>{p.description || 'No description provided.'}</p>
                        
                        <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                            <strong>Members:</strong> <span style={{ color: 'var(--primary)' }}>{p.memberUsernames?.join(', ') || 'None'}</span>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleAddMember(p.id)} className="btn btn-outline btn-sm">Add Member</button>
                            <button onClick={() => handleDelete(p.id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
