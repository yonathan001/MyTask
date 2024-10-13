const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));


const taskSchema = new mongoose.Schema({
  task: { type: String, required: true }
});

const Task = mongoose.model('Task', taskSchema);

// API routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task({ task: req.body.task });
  await newTask.save();
  res.json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
