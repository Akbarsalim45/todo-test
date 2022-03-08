import React, { useState, useEffect } from "react";

import "./App.css";
import Axios from "axios";
function App() {
  const [input, setInput] = useState({
    status: "pending",
  });
  const [todo, setTodo] = useState([]);
  //   let details = { status: "pending" };
  useEffect(async () => {
    let response = await Axios.get("http://localhost:3010/");
    let result = await response.data;

    if (result.status == "ok") {
      setTodo(result.data);
      console.log(result.data);
    }
  }, [todo]);
  const handleInputs = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value, id: Date.now() });
  };
  const addList = async (e) => {
    e.preventDefault();

    if (input.date == null && input.description == null) {
      alert("fill all fields");
      return;
    }
    setTodo([...todo, input]);

    let response = Axios.post("http://localhost:3010/", input);
    
    setInput({ status:"pending"});
  };
  const handleStatus = async (key, id) => {
    let res = todo.map((item, index) => {
      if (item.status == "completed") return item;
      if (index === key) {
        return { ...item, status: "completed" };
      }
      return item;
    });

    setTodo(res);
    let response = await Axios.put(`http://localhost:3010/${id}`);
    let result = await response.data;
    if (result.status == "ok") {
      setTodo(result.data);
      console.log(result.data);
    }
  };
  const handleDelete = async (key, id) => {
    setTodo(todo.filter((item, index) => key != index));
    let response = await Axios.delete(`http://localhost:3010/${id}`);
  };
  let result = todo.map((item, index) => {
    if (todo.length != 0) {
      return (
        <li>
          <span>{item.date}</span>
          <span>{item.description}</span>
          <span>{item.status}</span>
          <button onClick={() => handleStatus(index, item.id)}>update </button>
          <button onClick={() => handleDelete(index, item.id)}>del</button>
        </li>
      );
    }
  });

  return (
    <div className="container">
      <div className="inner-container">
        <div className="input-container">
          <form>
            <div className="form-input">
              <label htmlFor="">Date</label>
              <input
                type="date"
                name="date"
                onChange={handleInputs}
                value={input.date}
              />
            </div>
            <div className="form-input">
              <label htmlFor="">Description</label>
              <input
                type="text"
                name="description"
                onChange={handleInputs}
                value={input.description}
              />
            </div>
            <button type="submit" onClick={addList}>
              Add
            </button>
          </form>
        </div>
        <div className="list-container">
          <ul>{result}</ul>
        </div>
      </div>
    </div>
  );
}
export default App;
