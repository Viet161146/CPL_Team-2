// Signup.js
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = useCallback((event) => {
        event.preventDefault();

        // Reset error state
        setError('');

        // Validate email, username, and password
        if (email.trim() === '') {
            setError('Email cannot be blank');
            return;
        }
        if (username.trim() === '') {
            setError('Username cannot be blank');
            return;
        }
        if (password.trim() === '') {
            setError('Password cannot be blank');
            return;
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Invalid email format');
            return;
        }

        // Simulate sign up success
        const userToken =
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxODE1OX0sImlhdCI6MTcxMjA0NjMyMiwiZXhwIjoxNzE3MjMwMzIyfQ.VB_sPjx8K6SPkJBr8CZaiI_-9sogz3FS1ylPZ1tg4JA"; // Fix cứng token ở đây
        // Lưu token vào localStorage
        localStorage.setItem('token', userToken);
        localStorage.setItem('username', username);
        // Chuyển hướng người dùng đến trang chính (home page)
        navigate('/', { state: { username } });
    }, [username, email, password, navigate]);

    const handleSignInClick = useCallback(() => {
        // Redirect user to sign in page
        navigate('/login');
    }, [navigate]);

    return (
        <div className={styles['login-container']}>
            <h2>Sign up</h2>
            <h5 className={`${styles['need-account']} ${styles['above-input']}`} onClick={handleSignInClick}>
                Have an account?
            </h5>

            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleFormSubmit}>
                {/* Input username */}
                <input
                    type="text"
                    placeholder="Username"
                    className={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {/* Input email */}
                <input
                    type="text"
                    placeholder="Email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/* Input password */}
                <input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* Submit button */}
                <button type="submit" className={styles.button}>Sign up</button>
            </form>
        </div>
    );
};

export default Signup;
