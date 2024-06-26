import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';  // Make sure to import LoginForm if it's defined
import SignupForm from './SignupForm';  // Make sure to import SignupForm if it's defined
import TodoList from './TodoList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/" element={<LoginForm />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;