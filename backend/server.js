const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

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

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Использование маршрутов
app.use('/tasks', taskRoutes);

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
