const serverless = require('serverless-http');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
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

app.get('/tasks/doneTasks', function (request, response) {

  databaseService.getDoneTasks()
  
  .then(function(results) {

    response.json(results);

  })

  .catch(function(error) {

    response.status(500);
    response.json(error);

  });  
});

app.post('/tasks', function (request, response) {

  const Description = request.body.Description;

  databaseService.saveTask(Description)
  
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

app.put('/tasks/:TaskID', function (request, response) {

  const taskToComplete = request.params.TaskID;

  databaseService.completeTask(taskToComplete)
  
  .then(function(results) {

    response.json(results);

  })

  .catch(function(error) {

    response.status(500);
    response.json(error);

  });

});

app.put('/tasks/editTask/:editedDescription', function (request, response) {

  const editedTask = request.params.editedDescription;

  const identifier = request.params.TaskID;

  databaseService.editTask(editedTask, identifier)
  
  .then(function(results) {

    response.json(results);

  })

  .catch(function(error) {

    response.status(500);
    response.json(error);

  });

});

module.exports.handler = serverless(app);