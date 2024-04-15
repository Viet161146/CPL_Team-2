import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Auto-fill username and password when component mounts
        setEmail('team2@example.com');
        setPassword('password');
    }, []);

    const handleFormSubmit = useCallback((event) => {
        event.preventDefault();

        // Reset error state
        setError('');

        // Validate email and password
        if (email.trim() === '') {
            setError('Email cannot be blank');
            return;
        }

        if (password.trim() === '') {
            setError('Password cannot be blank');
            return;
        }

        // Simulate login success
        const username = 'team2';
        const receivedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxOTQ4Nn0sImlhdCI6MTcxMjU1NTE0MSwiZXhwIjoxNzE3NzM5MTQxfQ.Za6L4BGbNHhsn5Lattv-QQ1T9nSunAP9zMYYSyk7d30';
        setToken(receivedToken);
        localStorage.setItem('username', username);
        localStorage.setItem('token', receivedToken);
        navigate('/', { state: { username } });
    }, [email, password, navigate]);

    const handleSignUpClick = useCallback(() => {
        navigate('/signup');
    }, [navigate]);

    return (
        <div className={styles['login-container']}>
            <h2>Sign in</h2>
            <h5 className={`${styles['need-account']} ${styles['above-input']}`} onClick={handleSignUpClick}>
                Need an account?
            </h5>

            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
               
                <input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            
                <button type="submit" className={styles.button}>Sign in</button>
            </form>
        </div>
    );
};

export default Login;
