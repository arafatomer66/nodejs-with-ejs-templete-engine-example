// app.js
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const tasks = require('./data.json');

// Routes
app.get('/', (req, res) => {
  res.render('index', { tasks: tasks.tasks });
});

app.get('/tasks/new', (req, res) => {
  res.render('new');
});

app.post('/tasks', (req, res) => {
  const { name } = req.body;
  const newTask = {
    id: tasks.tasks.length + 1,
    name: name,
  };
  tasks.tasks.push(newTask);
  res.redirect('/');
});

app.get('/tasks/:id/edit', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.tasks.find((task) => task.id === id);
  if (!task) {
    return res.send('Task not found.');
  }
  res.render('edit', { task: task });
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.tasks.find((task) => task.id === id);
  if (!task) {
    return res.send('Task not found.');
  }
  task.name = req.body.name;
  res.redirect('/');
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.send('Task not found.');
  }
  tasks.tasks.splice(taskIndex, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
