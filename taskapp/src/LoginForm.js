import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      navigate('/todolist'); // Redirect to todolist page after successful login
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Add logic to conditionally render signup link
  const isNewUser = true; // Replace with your logic to determine if new user

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {isNewUser && (
        <p>
          Not registered? <Link to="/signup">Signup here</Link>
        </p>
      )}
    </div>
  );
};

export default LoginForm;
