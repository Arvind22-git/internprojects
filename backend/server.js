const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Todo = require('./models/Todo');
const User = require('./models/User');
const app = express();

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/todotest';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Signup route
app.post('/api/auth/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user already exists
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all todos for a specific user
app.get('/api/todos', async (req, res) => {
  const { userId } = req.query;
  try {
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new todo
app.post('/api/todos', async (req, res) => {
  const { text, userId } = req.body; // Assuming userId is sent from frontend
  try {
    if (!text) {
      return res.status(400).json({ message: 'Todo text is required' });
    }

    const newTodo = new Todo({ text, user: userId }); // Assign userId to the user field of Todo
    await newTodo.save();
    res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
  } catch (error) {
    console.error('Error saving todo:', error);
    res.status(500).json({ message: 'Failed to save todo' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Todo ID' });
    }

    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Failed to delete todo' });
  }
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  
  // Validate if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Todo ID' });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { text }, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Failed to update todo' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
