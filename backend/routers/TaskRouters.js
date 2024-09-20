const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Получение всех задач
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Добавление новой задачи
router.post('/', async (req, res) => {
    const newTask = new Task(req.body);
    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Обновление состояния задачи
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.completed = req.body.completed;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

module.exports = router;
