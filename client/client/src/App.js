import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Route, Link } from "react-router-dom";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects/1/")
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      
      <Route exact path="/">
        <div className="App">
          <div>
            <h3>{projects.name}</h3>
            <p>{projects.description}</p>
            <p>{projects.completed ? "IT IS DONE" : "KEEP WORKING"}</p>
          </div>
        </div>
      </Route>
    </>
  );
}

export default App;
