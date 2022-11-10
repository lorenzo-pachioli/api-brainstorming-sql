require('./config/mongoDB');

const express = require('express');
const app = express();
const http = require('http');
const cors = require("cors");
const epicsRoutes = require('./epics/routes/EpicsRoutes');
const loginRoutes = require('./login/routes/LoginRoutes');
const projectsRoutes = require('./projects/routes/ProjectsRoutes');
const storiesRoutes = require('./stories/routes/StoriesRoutes');
const tasksRoutes = require('./tasks/routes/TasksRoutes');
const usersRoutes = require('./users/routes/UsersRoutes');
app.set(express.json());
app.use(cors());

const server = http.createServer(app);


// Routes
app.use('/epics', epicsRoutes);
app.use('/login', loginRoutes);
app.use('/projects', projectsRoutes);
app.use('/stories', storiesRoutes);
app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log('Connected');
})
