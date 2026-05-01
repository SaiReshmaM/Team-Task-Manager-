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
        <div style={{ padding: '2rem' }}>
            <h2>Projects (Admin Only)</h2>
            <form onSubmit={handleCreate} style={{ marginBottom: '2rem' }}>
                <input type="text" placeholder="Project Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                <button type="submit">Create Project</button>
            </form>
            <ul>
                {projects.map(p => (
                    <li key={p.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #eee' }}>
                        <strong>{p.name}</strong> - {p.description} <br/>
                        <em>Members: {p.memberUsernames?.join(', ') || 'None'}</em> <br/>
                        <button onClick={() => handleAddMember(p.id)}>Add Member</button>
                        <button onClick={() => handleDelete(p.id)} style={{ color: 'red', marginLeft: '1rem' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Projects;
