const serverless = require('serverless-http');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/tasks', function (request, response) {

  let tasks = [
    {
      description: "Climb Mt Kilimanjaro",
      id: 1,
      completed: false
    },
    {
      description: "Do the Inca Trail",
      id: 2,
      completed: false
    },
    {
      description: "Go skydiving",
      id: 3,
      completed: true
    },
    {
      description: "Learn how to play an instrument",
      id: 4,
      completed: false
    },
    {
      description: "Get a dog",
      id: 5,
      completed: false
    }
  ];

  response.json(tasks);

});

app.delete('/tasks/:taskId', function (request, response) {

  const taskToBeDeleted = request.params.taskId;

  let someResponse = {
    message: "You tried to delete task ID = " + taskToBeDeleted
  };

  if(taskToBeDeleted > 5) {
    response.status(404);
    someResponse = {
      message: "Task " + taskToBeDeleted + " does not exist"
    };
  }

  response.json(someResponse);

});

app.post('/tasks', function (request, response) {

  const newTask = request.body.enteredTask;

  const taskResponse = {
    message: "The new task is " + newTask
  };

  response.json(taskResponse);

});

module.exports.handler = serverless(app);