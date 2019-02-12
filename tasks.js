const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());
const databaseService = require('./databaseservice');
var bodyParser = require('body-parser');

app.get('/tasks', function (request, response) {

  databaseService.getTasks()
  
  .then(function(results) {

    response.json(results);

  })

  .catch(function(error) {

    response.status(500);
    response.json(error);

  });

});

app.post('/tasks', function (request, response) {

  const taskDescription = request.body.taskDescription;

  databaseService.saveTask(taskDescription)
  
  .then(function(results) {

    response.json(results);

  })

  .catch(function(error) {

    response.status(500);
    response.json(error);

  });
});

app.delete('/tasks/:taskId', function (request, response) {

  const taskToDelete = request.params.taskId;

  databaseService.deleteTask(taskToDelete)
  
  .then(function(results) {

    response.json(results);

  })

  .catch(function(error) {

    response.status(500);
    response.json(error);

  });

});

app.put('/tasks/:taskId', function (request, response) {

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
      completed: false
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

  const taskIdToComplete = request.params.taskId;

  const filteredTask = tasks.filter(task => task.id == taskIdToComplete);

  let taskToComplete = filteredTask[0];

  taskToComplete.completed = true;

  let taskPosition = tasks.indexOf(taskToComplete);

    for (let x = 0; x < 1; x ++) {
        tasks.splice(taskPosition, 1);
        tasks.push(taskToComplete);
    };

  response.json(tasks);

});

module.exports.handler = serverless(app);