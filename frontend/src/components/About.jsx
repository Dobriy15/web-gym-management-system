import React from 'react';

const About = () => {
    return (
        <div style={{ padding: '80px 10%', textAlign: 'center' }}>
            <h1 style={{ color: 'var(--primary)', fontSize: '3.5rem' }}>Since 2018</h1>
            <p style={{ fontSize: '1.3rem', lineHeight: '1.8', color: '#cbd5e1' }}>
                Next Morning Gym was founded with a single mission: to create a premium fitness
                environment for those who treat their health as a priority. Located in the heart
                of the city, we combine science-based training with a motivating atmosphere.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '60px' }}>
                <div className="class-card"><h3>Elite Coaches</h3><p>Certified experts in various disciplines.</p></div>
                <div className="class-card"><h3>24/7 Access</h3><p>Train whenever you want, day or night.</p></div>
                <div className="class-card"><h3>Community</h3><p>Join a group of like-minded high achievers.</p></div>
            </div>
        </div>
    );
};

export default About;