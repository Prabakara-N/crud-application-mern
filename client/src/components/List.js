import axios from "axios";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { baseURL } from "../utils/constant";
import { toast } from "react-toastify";

const List = ({ id, task, setUpdateUI, updateMode }) => {
  const removeTask = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      setUpdateUI((prevState) => !prevState);
      toast.success("Task Deleted");
    });
  };
  return (
    <li className="flex items-center justify-between bg-slate-200 py-2 px-4 rounded-lg mb-3">
      {task}
      <div className="flex items-center gap-2 text-2xl cursor-pointer">
        <AiFillEdit
          className="text-green-500 hover:text-green-600 transition-all duration-200"
          onClick={() => updateMode(id, task)}
        />
        <MdDelete
          className="text-red-500 hover:text-red-600 transition-all duration-200"
          onClick={removeTask}
        />
      </div>
    </li>
  );
};

export default List;
