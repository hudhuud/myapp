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

    return (
        <div>
            <h1>Task List</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task"
            />
            <button onClick={addTask}>Add Task</button>

            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.name} - {task.completed ? "Completed" : "Not completed"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
