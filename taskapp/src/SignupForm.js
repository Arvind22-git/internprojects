import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './Form.css';

const SignupForm = () => {
  const navigate = useNavigate(); // Correct usage of useNavigate hook

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    // Basic validation for email
    if (!isValidEmail(username)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    // Basic validation for password
    if (!isValidPassword(password)) {
      setMessage('Password must be at least 8 characters long.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        password,
      });
      console.log('Signup successful:', response.data);
      
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Signup error:', error);
    }
  };
  
  
  // Regular expression for basic email validation
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Basic password validation (at least 8 characters)
  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  return (
  <div>
      <img src="loginlogo.png" alt="Logo" className="logo" />
      <h1>Intern Signup Task</h1>
      <div className="form-container">
        <h3>Signup</h3>
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
            <button type="submit">Signup</button>
          </div>
        </form>
        <div className="message">{message}</div>
        <div className="form-field">
          <Link to="/login"><button type="button">Login</button></Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;