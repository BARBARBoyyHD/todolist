// server/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
let todos = [];

// Middleware example (for debugging or future use)
router.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
});

// Get all todos
router.get('/', (req, res) => {
    res.json(todos);
});

// Add a new todo
router.post('/', (req, res) => {
    const newTodo = { id: Date.now(), text: req.body.text };
    todos.push(newTodo);
    res.json(newTodo);
});

// Delete a todo
router.delete('/:id', (req, res) => {
    todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
    res.json({ message: 'Todo deleted' });
});

module.exports = router;
