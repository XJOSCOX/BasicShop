import React, { useState } from 'react';
import './Auth.css';

const Register = () => {
    const [form, setForm] = useState({
        name: '', email: '', password: '', phone: '',
        address: '', city: '', state: '', country: '', postalCode: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setMessage(data.message || 'Registration complete');
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                {message && <p className="auth-message">{message}</p>}
                {Object.entries(form).map(([key, value]) => (
                    <input
                        key={key}
                        name={key}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={value}
                        onChange={handleChange}
                        type={key === 'password' ? 'password' : 'text'}
                        required={['name', 'email', 'password'].includes(key)}
                    />
                ))}
                <button type="submit">Register</button>
                <p>Already have an account? <a href="/login">Login</a></p>
            </form>
        </div>
    );
};

export default Register;
