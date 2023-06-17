const TaskModel = require("../models/taskModel");

const getTasks = async (req, res) => {
  const tasks = await TaskModel.find();
  res.status(200).json(tasks);
};

const saveTask = (req, res) => {
  const { task } = req.body;

  TaskModel.create({ task })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  TaskModel.findByIdAndUpdate(id, { task })
    .then(() => res.status(200).json({ message: "Updated Successfully" }))
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const deleteTask = (req, res) => {
  const { id } = req.params;

  TaskModel.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Deleted Successfully" }))
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = { getTasks, saveTask, updateTask, deleteTask };
