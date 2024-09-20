import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    // Получение всех задач при загрузке компонента
    useEffect(() => {
        axios.get('http://localhost:5000/tasks')
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    }, []);

    // Добавление новой задачи
    const addTask = () => {
        if (newTask.trim()) {
            axios.post('http://localhost:5000/tasks', { name: newTask, completed: false })
                .then(res => {
                    setTasks([...tasks, res.data]);
                    setNewTask('');
                })
                .catch(err => console.error(err));
        }
    };

    // Обновление состояния задачи (выполнено/не выполнено)
    const toggleTaskCompletion = (taskId, completed) => {
        axios.put(`http://localhost:5000/tasks/${taskId}`, { completed: !completed })
            .then(res => {
                setTasks(tasks.map(task =>
                    task._id === taskId ? { ...task, completed: !completed } : task
                ));
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>Task List</h1>
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add new task"
                />
                <button onClick={addTask}>Add Task</button>
            </div>

            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <span className={task.completed ? 'completed' : ''}>
                            {task.name}
                        </span>
                        <button onClick={() => toggleTaskCompletion(task._id, task.completed)}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
