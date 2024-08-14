const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, enum: ["pending", "complete"], default: "pending" },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  todos: [todoSchema],
});

module.exports = mongoose.model("Project", projectSchema);
