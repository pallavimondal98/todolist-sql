// Importing necessary modules and styles for the React component.
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './App.css'
import { API_BASE_URL } from './Config';

// Functional component definition.
const App = () => {

  // State variables for managing task input and existing tasks.
  const [newTask, setNewTask] = useState([]);
  const [task, setTask] = useState('');

  // Asynchronous function to add a new todo item to the server.
  const addTodo = async () => {
    if (task) {
      const newTodo = await axios.post(`${API_BASE_URL}/addTodo`, { task });
      setNewTask([...newTask, newTodo.data]);
      console.log(newTask);
      setTask("");
      
    }
    fetchTodos();
  }

  // Asynchronous function to fetch all todos from the server.
  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/getTodos`);
      // const response = await axios.get(`http://localhost:5000/getTodos`);

      console.log(res.data);
      setNewTask(res.data);
    } catch (error) {
      console.log("unable to fetch data",error)
    }
  };

  // useEffect hook to fetch todos.
  useEffect(() => {
    fetchTodos();
  }, []);

  // Asynchronous function to delete a todo item from the server.
  const deleteTodo = async (id) => {
    await axios.delete(`${API_BASE_URL}/deleteTodo/${id}`);
    setNewTask(newTask.filter((todo) => todo.ID !== id));
    alert("Data deleted")
  }

  return (
    <div className="container">
      {/*text header */}
      <h1>To Do List App</h1>
      <div className="sec-Container row d-flex">
        <div className="leftContainer col-6">
          <div className="input-group">
            <span className="input-group-text" id="inputGroup-sizing-default">Add Task</span>
            <input type="text" className="form-control" placeholder="Type your todo's here" value={task}
              onChange={e => setTask(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
            <button type="button" className="btn btn-warning" onClick={addTodo}>Add</button>
          </div>
          <div className="verticalLine"></div>
        </div>
        {/* Added tasks */}
        <div className="rightContainer col-6">
          <h5 className="d-flex">Your tasks</h5>
          {newTask.map((todo) => (
            <div className='row' key={todo.ID}>
              <div className='col-auto'>
                <div className="input-group p-1">
                  <input type="text" className="form-control disabled" disabled id="autoSizingInputGroup"
                    placeholder="Example task" value={todo.Task} />
                  <button className='btn btn-danger input-group-text' onClick={() => deleteTodo(todo.ID)}>X</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}
export default App; 
