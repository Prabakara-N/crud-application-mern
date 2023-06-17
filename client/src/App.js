import React, { useEffect, useState } from "react";
import "./styles/App.css";
import "./styles/normalize.css";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateID, setUpdateID] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
      setUpdateUI(!updateUI);
    });
  }, [updateUI]);

  const addTask = (e) => {
    e.preventDefault();
    if (!value) {
      toast.error("Please add a Task");
    } else {
      axios.post(`${baseURL}/save`, { task: value }).then((res) => {
        console.log(res.data);
        toast.success("Task Added");
        setValue("");
      });
    }
  };

  const updateMode = (id, text) => {
    setValue(text);
    setUpdateID(id);
  };

  const updateTask = (e) => {
    e.preventDefault();
    axios.put(`${baseURL}/update/${updateID}`, { task: value }).then((res) => {
      setUpdateUI(!updateUI);
      setUpdateID(null);
      setValue("");
      toast.success("Task Updated");
    });
  };

  return (
    <main>
      <ToastContainer
        position="top-right"
        pauseOnHover={false}
        transition={Slide}
        draggable={true}
      />
      <h1>CRUD Application</h1>
      <form
        className="flex items-center gap-3 mb-6"
        onSubmit={updateID ? updateTask : addTask}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="px-3 py-2 rounded-md border-solid border-[1px] border-gray-300 w-[350px]"
          placeholder="Add Task"
        />
        <button type="submit" className="bg-blue-700 rounded-lg p-2 text-white">
          {updateID ? "Update Task" : "Add Task"}
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;
