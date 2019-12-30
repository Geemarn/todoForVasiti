const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    Default: Date.now
  }
});

module.exports = mongoose.model("todo", todoSchema);
