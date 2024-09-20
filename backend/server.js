const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/myappdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB:'));
db.once('open', function() {
    console.log('Подключено к базе данных MongoDB');
});

app.use(cors());
app.use(bodyParser.json());

// Модель данных списка задач
const TaskSchema = new mongoose.Schema({
    name: String,
    completed: Boolean
});

const Task = mongoose.model('Task', TaskSchema);

// Маршрут для получения всех задач
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({});
    res.json(tasks);
});

// Маршрут для добавления новой задачи
app.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
