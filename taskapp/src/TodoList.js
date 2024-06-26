import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/todos', { params: { userId } });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/todos', { text: newTodoText, userId });
      console.log('Todo added:', response.data);
      fetchTodos(); // Refresh the todo list
      setNewTodoText(''); // Clear the input field
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
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter new todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
