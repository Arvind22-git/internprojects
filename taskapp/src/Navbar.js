import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import your custom Navbar CSS file

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions
    onLogout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/todolist">TodoList</Link>
        </div>
        {isLoggedIn && (
          <div className="navbar-links">
            <button className="logout-btn" onClick={handleLogout}>
              <span className="logout-icon">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
