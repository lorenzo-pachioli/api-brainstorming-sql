require('./config/mongoDB');

const express = require('express');
const app = express();
const http = require('http');
const cors = require("cors");
const epicsRoutes = require('./app/routes/EpicsRoutes');
const loginRoutes = require('./app/routes/LoginRoutes');
const projectsRoutes = require('./app/routes/ProjectsRoutes');
const storiesRoutes = require('./app/routes/StoriesRoutes');
const tasksRoutes = require('./app/routes/TasksRoutes');
const usersRoutes = require('./app/routes/UsersRoutes');
const { returnError } = require('./utils/response');
const bodyParser = require("body-parser");
app.set(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);


// Routes
app.use('/epics', epicsRoutes);
app.use('/login', loginRoutes);
app.use('/projects', projectsRoutes);
app.use('/stories', storiesRoutes);
app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);
app.use(returnError);

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log('Connected');
})
