import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    // Basic validation
    if (!username) {
      setMessage('Please enter your email.');
      return;
    }

    if (!isValidEmail(username)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setMessage('Please enter your password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('userId', response.data.userId); // Store userId in local storage
      navigate('/todolist');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const isNewUser = true;

   // Regular expression for basic email validation
  const isValidEmail = (email) => {
    // Basic pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div>
      <img src="loginlogo.png" alt="Logo" className="logo" />
      <h1>Intern Login Task</h1>
      <div className="form-container">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="message">{message}</div>
        <div className="form-field">
          <Link to="/signup"><button type="button">Signup</button></Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
