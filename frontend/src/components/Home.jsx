import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');

    return (
        <div style={{ textAlign: 'center', padding: '120px 20px' }}>
            <h1 style={{ fontSize: '4.5rem', color: 'var(--primary)', fontWeight: '900' }}>NEXT MORNING</h1>
            <p style={{ maxWidth: '700px', margin: '20px auto 40px', color: '#94a3b8', fontSize: '1.2rem' }}>
                Step into the best gym in the city. Founded in 2018, we provide elite equipment
                and expert coaching to transform your body and mind.
            </p>
            <div className="home-btns">
                <button className="btn-primary" onClick={() => navigate(isLoggedIn ? '/classes' : '/login')}>
                    Join the Club
                </button>
                <button style={{ background: '#334155', color: '#fff' }} onClick={() => navigate('/about')}>
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default Home;