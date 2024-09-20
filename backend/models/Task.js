const mongoose = require('mongoose');

// Схема задачи
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// Экспорт модели
module.exports = mongoose.model('Task', TaskSchema);
