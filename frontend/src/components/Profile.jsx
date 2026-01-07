import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState(user?.bio || 'Welcome to my Next Morning profile!');
    const [pic, setPic] = useState(user?.profile_pic || '');

    const token = localStorage.getItem('token');

    // Load user bookings from server
    const loadBookings = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/my-bookings', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(res.data);
        } catch (err) {
            console.error("Error loading bookings", err);
        }
    };

    useEffect(() => {
        if (token) loadBookings();
    }, [token]);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPic(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const saveProfile = async () => {
        try {
            await axios.put('http://localhost:3000/api/user/profile',
                { bio, profile_pic: pic },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const updatedUser = { ...user, bio, profile_pic: pic };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setIsEditing(false);
            window.dispatchEvent(new Event('storage'));
            alert("Profile updated!");
        } catch (err) {
            alert("Update failed");
        }
    };

    const cancelBooking = async (id) => {
        if (window.confirm("Cancel this training?")) {
            try {
                await axios.delete(`http://localhost:3000/api/bookings/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBookings(prev => prev.filter(b => b.id !== id));
            } catch (err) {
                alert("Could not cancel");
            }
        }
    };

    if (!user) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Please Login</div>;

    return (
        <div style={{ padding: '40px 5%', display: 'flex', gap: '50px', flexWrap: 'wrap', justifyContent: 'center' }}>

            {/* LEFT COLUMN: PROFILE CARD */}
            <div className="class-card" style={{ width: '350px', textAlign: 'center', height: 'fit-content' }}>
                <div className="profile-img-container">
                    <img src={pic || 'https://via.placeholder.com/150'} alt="Profile" />
                    {isEditing && (
                        <label className="photo-upload-label">
                            📷
                            <input type="file" onChange={handlePhotoUpload} style={{ display: 'none' }} accept="image/*" />
                        </label>
                    )}
                </div>

                <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>{user.username}</h2>

                {isEditing ? (
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="edit-bio-area"
                    />
                ) : (
                    <p style={{ color: '#cbd5e1', fontStyle: 'italic', marginBottom: '30px' }}>"{bio}"</p>
                )}

                <button className="btn-primary" style={{ width: '100%' }} onClick={() => isEditing ? saveProfile() : setIsEditing(true)}>
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
            </div>

            {/* RIGHT COLUMN: BOOKINGS LIST (FIXED LAYOUT) */}
            <div style={{ flex: 1, minWidth: '350px' }}>
                <h2 style={{ marginBottom: '30px', borderLeft: '5px solid var(--primary)', paddingLeft: '15px' }}>
                    My Training Schedule
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {bookings.length === 0 ? (
                        <div className="class-card" style={{textAlign: 'center', color: '#94a3b8'}}>No sessions booked yet.</div>
                    ) : (
                        bookings.map(booking => (
                            <div key={booking.id} className="class-card booking-item">
                                <div className="booking-info">
                                    <h3 style={{ margin: '0 0 5px 0', color: 'var(--primary)' }}>{booking.class_name}</h3>
                                    <div className="booking-details">
                                        <span>👤 Coach: <strong>{booking.instructor}</strong></span>
                                    </div>
                                </div>
                                <button onClick={() => cancelBooking(booking.id)} className="btn-cancel">
                                    Cancel
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;