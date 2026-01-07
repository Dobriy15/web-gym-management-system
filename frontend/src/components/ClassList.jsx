import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClassList = () => {
    const [classes, setClasses] = useState([]);
    const [activeDay, setActiveDay] = useState('Monday');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    useEffect(() => {
        axios.get('http://localhost:3000/api/classes').then(res => setClasses(res.data.data));
    }, []);

    const handleBook = (id) => {
        const token = localStorage.getItem('token');
        if (!token) return alert("Please Login!");
        axios.post('http://localhost:3000/api/bookings', { class_id: id }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => alert("Booked!"));
    };

    return (
        <div style={{ padding: '40px 5%' }}>
            <div className="day-bar">
                {days.map(d => (
                    <button key={d}
                            style={{ background: activeDay === d ? 'var(--primary)' : '#1e293b', color: activeDay === d ? '#000' : '#fff' }}
                            onClick={() => setActiveDay(d)}>
                        {d}
                    </button>
                ))}
            </div>

            <div className="classes-grid">
                {classes.filter(c => c.day_of_week === activeDay).map(c => (
                    <div key={c.id} className="class-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ color: 'var(--primary)', margin: 0 }}>{c.class_name}</h3>
                            <span className="time-tag">{c.start_time}</span>
                        </div>
                        <p style={{ color: '#94a3b8', margin: '15px 0', fontSize: '0.9rem' }}>{c.description}</p>
                        <div style={{ marginBottom: '20px', fontSize: '0.85rem' }}>
                            <p><strong>Coach:</strong> {c.instructor}</p>
                            <p><strong>Duration:</strong> {c.duration}</p>
                        </div>
                        <button className="btn-primary" style={{ width: '100%' }} onClick={() => handleBook(c.id)}>Book Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassList;