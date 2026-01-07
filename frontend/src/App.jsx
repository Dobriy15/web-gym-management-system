import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Hook for translation
import Home from './components/Home';
import About from './components/About';
import ClassList from './components/ClassList';
import Profile from './components/Profile';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';
import './App.css';
import './i18n'; // Import i18n configuration

function App() {
    const { t, i18n } = useTranslation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    // Sync user state with localStorage (Level 2/3 requirement)
    useEffect(() => {
        const handleStorage = () => setUser(JSON.parse(localStorage.getItem('user')));
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const logout = () => {
        localStorage.clear();
        setUser(null);
        window.location.href = '/';
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'pl' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <Router>
            <nav className="navbar">
                <Link to="/" className="nav-logo">NEXT MORNING</Link>

                <div className="nav-links">
                    {/* Navigation links using translations (Level 3) */}
                    <Link to="/">{t('home')}</Link>
                    <Link to="/about">{t('about')}</Link>
                    <Link to="/classes">{t('trainings')}</Link>

                    {user ? (
                        <div className="nav-user-controls">
                            {/* Role-based access: Admin Only (Level 3) */}
                            {user.role === 'Admin' && (
                                <Link to="/admin" className="admin-tag">Admin Panel</Link>
                            )}

                            <Link to="/profile" className="profile-btn">
                                <img
                                    src={user.profile_pic || 'https://via.placeholder.com/150'}
                                    className="nav-profile-img"
                                    alt="avatar"
                                />
                                <span>{user.username}</span>
                            </Link>

                            <button onClick={logout} className="btn-logout">{t('logout')}</button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-primary">{t('login')}</Link>
                    )}

                    {/* Language Switcher (Level 3 Requirement) */}
                    <button
                        onClick={toggleLanguage}
                        className="btn-secondary"
                        style={{ padding: '5px 12px', fontSize: '0.8rem' }}
                    >
                        {i18n.language === 'en' ? 'PL 🇵🇱' : 'EN 🇺🇸'}
                    </button>
                </div>
            </nav>

            {/* Routes for Single Page Application (Level 3) */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/classes" element={<ClassList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </Router>
    );
}

export default App;