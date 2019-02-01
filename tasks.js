const serverless = require('serverless-http');
const express = require('express');
const app = express();

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
})

module.exports.handler = serverless(app);