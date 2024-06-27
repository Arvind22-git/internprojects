import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5000/api/todos?userId=${userId}`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post('http://localhost:5000/api/todos', { text: newTodo, userId });
      setTodos([...todos, response.data]);
      setNewTodo('');
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

  const updateTodo = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/todos/${editingTodoId}`, { text: editingText });
      setTodos(todos.map(todo => todo._id === editingTodoId ? response.data : todo));
      setEditingTodoId(null);
      setEditingText('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        placeholder="New Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {editingTodoId === todo._id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <span>{todo.text}</span>
            )}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            {editingTodoId === todo._id ? (
              <button onClick={updateTodo}>Save</button>
            ) : (
              <button onClick={() => {
                setEditingTodoId(todo._id);
                setEditingText(todo.text);
              }}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
