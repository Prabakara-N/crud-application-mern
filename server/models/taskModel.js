const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Please add Task"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
