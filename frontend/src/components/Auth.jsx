import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const validate = () => {
        const { email, password, username } = formData;
        if (!isLogin && username.length < 3) return "Username min 3 characters";
        if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
        if (password.length < 6) return "Password min 6 characters";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const vError = validate();
        if (vError) return setError(vError);

        // ВАЖНО: Проверь, что порт бэкенда совпадает (3000 или 5000)
        const url = `http://localhost:3000/api/auth/${isLogin ? 'login' : 'register'}`;

        try {
            const res = await axios.post(url, formData);
            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify({
                    username: res.data.username,
                    role: res.data.role
                }));
                window.location.href = '/'; // Перенаправление на главную
            } else {
                alert("Success! Now please login.");
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.error || "Server connection error");
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
            <h2>{isLogin ? "Login" : "Register"}</h2>
            {error && <div style={{ color: 'red', border: '1px solid red', padding: '10px', marginBottom: '10px' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {!isLogin && (
                    <input type="text" placeholder="Username" onChange={e => setFormData({...formData, username: e.target.value})} required />
                )}
                <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />
                <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} required />
                <button type="submit" style={{ padding: '10px', background: '#333', color: '#fff' }}>
                    {isLogin ? "Enter" : "Create Account"}
                </button>
            </form>
            <p style={{ marginTop: '20px', cursor: 'pointer', color: 'blue' }} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Register" : "Have an account? Login"}
            </p>
        </div>
    );
};

export default Auth;