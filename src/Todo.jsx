import React, { useState, useRef, useEffect } from "react";
import AxiosService from "./common/ApiService";
import "./Todo.css"; 
import {useParams,useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import useLogout from "./hooks/useLogout";
function Todo() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const inputRef = useRef(null);
  let params =useParams()
  let logout = useLogout()

let navigate =useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AxiosService.post(`todos/create`, {
        todo: input,
      });

      setData((prevData) => [...prevData, response.data.todo]);
      setInput("");
      inputRef.current.focus();
      getData()
    } catch (error) {
      console.error("Error creating todo:", error);
      if(error.response.status===401)
      {
        logout()
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await AxiosService.delete(`todos/delete/${id}`);
      const newData = data.filter((item) => item._id !== id);
      setData(newData);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleCompleted = async (id, completed) => {
    try {
      const response = await AxiosService.put(`todos/update/${id}`, {
        completed: !completed,
      });

      const updatedData = data.map((item) =>
        item._id === id ? { ...item, completed: response.data.todo.completed } : item
      );

      setData(updatedData);
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  const getData = async () => {
    try {
      const response = await AxiosService.get(`todos/get`);
      console.log(response.data);  // Log the response data
  
      const todos = response.data.todo.map((todo) => ({ ...todo, completed: todo.completed || false }));
      setData(todos);
    } catch (error) {
      console.error("Error fetching data:", error);
      if(error.response.status===401)
      {
        logout()
      }
    }
  };

  const handelLogout=()=>{
    navigate("/")
  }
  
  useEffect(() => {
    getData()

  }, []);

  return (
    <>
    <div>
      {/* <button onClick={handelLogout}>Signout</button> */}
    </div>
    <div className="todo-container">
    <div className="container">
<div><h3>ADD YOUR TODAY TASKS</h3></div>

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          placeholder="Create Your TODO Here"
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button  className="todo-btn" type="submit">ADD</button>
      </form>
      <hr />

      <ul className="todo-list">
        {data.map((todo) => (
          <li key={todo?._id} className={todo?.completed ? "completed" : ""}>
            <span className="todo-text">{todo?.todo}</span>
            <div className="todo-actions">
              <button className="done" onClick={() => handleCompleted(todo?._id, todo?.completed)}>
                Done
              </button>
              <button className="delete" onClick={() => handleDelete(todo?._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
    </> );
}

export default Todo;
