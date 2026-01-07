import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [members, setMembers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [editingClass, setEditingClass] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const headers = { Authorization: `Bearer ${token}` };
        // Fetch all members
        axios.get('http://localhost:3000/api/admin/members', { headers })
            .then(res => setMembers(res.data)).catch(() => alert("Access Denied"));

        // Fetch all classes for editing
        axios.get('http://localhost:3000/api/classes')
            .then(res => setClasses(res.data.data));
    }, [token]);

    const handleUpdateClass = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/admin/classes/${editingClass.id}`, editingClass, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            alert("Class updated!");
            setEditingClass(null);
            window.location.reload();
        });
    };

    return (
        <div style={{ padding: '40px 5%' }}>
            <h1 style={{ color: 'var(--primary)' }}>Admin Dashboard</h1>

            {/* SECTION 1: Member Management  */}
            <div className="class-card" style={{ marginBottom: '40px' }}>
                <h2>User Management</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #334155', color: 'var(--primary)' }}>
                        <th style={{ padding: '15px' }}>Username</th>
                        <th style={{ padding: '15px' }}>Email</th>
                        <th style={{ padding: '15px' }}>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.map(m => (
                        <tr key={m.id} style={{ borderBottom: '1px solid #1e293b' }}>
                            <td style={{ padding: '15px' }}>{m.username}</td>
                            <td style={{ padding: '15px' }}>{m.email}</td>
                            <td style={{ padding: '15px', fontWeight: 'bold' }}>{m.role}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* SECTION 2: Class Management  */}
            <div className="class-card">
                <h2>Manage Trainings</h2>
                <div style={{ display: 'grid', gap: '15px' }}>
                    {classes.map(c => (
                        <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '15px', borderRadius: '12px' }}>
                            <span><strong>{c.class_name}</strong> ({c.instructor}) - ${c.price}</span>
                            <button onClick={() => setEditingClass(c)} className="btn-primary" style={{ padding: '5px 15px' }}>Edit</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Modal / Form */}
            {editingClass && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
                    <form className="class-card" onSubmit={handleUpdateClass} style={{ width: '400px' }}>
                        <h3>Edit: {editingClass.class_name}</h3>
                        <input style={{width:'100%', marginBottom:'10px'}} value={editingClass.instructor} onChange={e => setEditingClass({...editingClass, instructor: e.target.value})} placeholder="Instructor" />
                        <input style={{width:'100%', marginBottom:'10px'}} type="number" value={editingClass.price} onChange={e => setEditingClass({...editingClass, price: e.target.value})} placeholder="Price" />
                        <textarea style={{width:'100%', marginBottom:'10px'}} value={editingClass.description} onChange={e => setEditingClass({...editingClass, description: e.target.value})} placeholder="Description" />
                        <div style={{display:'flex', gap:'10px'}}>
                            <button type="submit" className="btn-primary">Save Changes</button>
                            <button type="button" onClick={() => setEditingClass(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;