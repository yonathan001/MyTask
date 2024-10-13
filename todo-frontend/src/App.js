import React, { useEffect, useState } from 'react';

import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => {
        setTasks(response.data);
        setError(''); // Clear error message
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setError('Failed to load tasks. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Add a new task
  const addTask = () => {
    if (task) {
      axios.post('http://localhost:5000/tasks', { task })
        .then((response) => {
          setTasks([...tasks, response.data]);
          setTask('');
          setError(''); // Clear error message
        })
        .catch((error) => {
          console.error('Error adding task:', error);
          setError('Failed to add task. Please try again later.');
        });
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
        setError(''); // Clear error message
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
        setError('Failed to delete task. Please try again later.');
      });
  };

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
          className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition duration-300"
        >
          Add Task
        </button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="w-full max-w-md list-none p-0">
          {tasks.map((task) => (
            <li key={task._id} className="flex justify-between items-center bg-white shadow-md p-4 mb-2 rounded-md">
              <span>{task.task}</span>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500 hover:text-red-600 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
