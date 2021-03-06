const mysql = require("mysql");

function getDatabaseConnection() {
    return mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });
}

function getTasks() {

    const connection = getDatabaseConnection();

    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM Tasks WHERE Completed = 0", function(error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end(function() {
                    return resolve(results);
                });
            }
        });
    });
 };

 function getDoneTasks() {

    const connection = getDatabaseConnection();

    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM Tasks WHERE Completed = 1", function(error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end(function() {
                    return resolve(results);
                });
            }
        });
    });
 };

 function saveTask(Description) {

    const connection = getDatabaseConnection();

    return new Promise(function(resolve, reject) {
        
        const postData = {Description: Description, UserID: 1, Completed: false};
        connection.query('INSERT INTO Tasks SET ?', postData, function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end(function() {
                    return resolve(results);
                });
            } 
        });

    });
 };

 function deleteTask(taskIdToDelete) {

    const connection = getDatabaseConnection();

    return new Promise(function(resolve, reject) {

        connection.query('DELETE FROM Tasks WHERE TaskID = ?', taskIdToDelete, function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end(function() {
                    return resolve(results);
                });
            }
        });
    });
 };

 function completeTask(taskIdToComplete) {

    const connection = getDatabaseConnection();

    return new Promise(function(resolve, reject) {

        connection.query("UPDATE Tasks SET Completed = 1 WHERE TaskID = ?", taskIdToComplete, function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end(function() {
                    return resolve(results);
                });
            }
        });
    });
 };

 function editTask(editedDecription, identifier) {

    const connection = getDatabaseConnection();

    return new Promise(function(resolve, reject) {

        connection.query("UPDATE Tasks SET Description = ? WHERE TaskID = ?", editedDecription, identifier, function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end(function() {
                    return resolve(results);
                });
            }
        });
    });
 };
 

 module.exports = {
     getTasks,
     getDoneTasks,
     saveTask,
     deleteTask,
     completeTask,
     editTask
 };