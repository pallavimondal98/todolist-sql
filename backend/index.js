//Import required modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
// require('dotenv').config()


// Initialize the app
const app = express();
app.use(express.json());
app.use(cors());

//Create the connection
// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'message' //this will be the data base name in create database - in phpmyadmin
// })
const db = mysql.createPool({
  host: 'roundhouse.proxy.rlwy.net',
  user: 'root',
  password: 'GyMTEbGDYAvXNkPycmJNkNgUXazgHqBq',
  database: 'railway',
  port: 34922 //this will be the data base name in create database - in phpmyadmin
})

// Express endpoint to handle POST requests for adding a new todo.
app.post('/addTodo', (req, res)=>{
    const task = req.body.task;
    const sql = "INSERT INTO todo (`Task`) VALUES (?)"; //(todo)this will be the table name for the data
    db.query(sql, [task], (err, data)=>{
      if(err) return res.json({'Error': err.message});
      return res.json(data);
    })

});

// Express endpoint to handle GET requests for retrieving all todos
app.get('/getTodos', (req, res) => {
    const sql = 'SELECT * FROM todo';
    db.query(sql, (err, data)=>{
      if(err) return res.status(500).json({'Error': err.message});
      return res.status(200).json(data);
    })
});

// Express endpoint to handle DELETE requests for deleting a specific todo by ID.
app.delete('/deleteTodo/:id', (req, res) => {
  const sql = "DELETE FROM todo WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data)=>{
    if(err) return res.json({'Error': err.message});
    return res.json(data);
  })
});

  // Starting the Express server on port 5000 and logging a message.
app.listen(5000, ()=>{
    console.log('Server Started!');
})