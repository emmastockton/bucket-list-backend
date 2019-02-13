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

  const taskToComplete = request.params.taskId;

  databaseService.completeTask(taskToComplete)
  
  .then(function(results) {

    response.json(results);

  })

  .catch(function(error) {

    response.status(500);
    response.json(error);

  });

});

module.exports.handler = serverless(app);