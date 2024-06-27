import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const userId = localStorage.getItem('userId'); // Get userId from local storage

  useEffect(() => {
    if (userId) {
      fetchTodos();
    } else {
      console.error('User ID not found');
    }
  }, [userId]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/todos?userId=${userId}`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodoText) return;
    try {
      const response = await axios.post('http://localhost:5000/api/todos', { text: newTodoText, userId });
      setTodos([...todos, response.data.todo]);
      setNewTodoText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
   <div>
      <h1>Todo List</h1>
      <div className="form-container">
        <form onSubmit={addTodo}>
          <div className="form-field">
            <input
              type="text"
              placeholder="Add a new todo"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <button type="submit">Add Todo</button>
          </div>
        </form>
        <ul>
          {todos.map(todo => (
            <li key={todo._id}>
              {todo.text} <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
