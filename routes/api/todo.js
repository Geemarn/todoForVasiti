const express = require("express");
const router = express.Router();

//import Todo model
const Todo = require("../../models/Todo");

//@route       GET "/api/todos/test"
//@desc            "Test user route"
//@access          "public"
router.get("/test", (req, res) => {
  res.json({ mssg: "todos route working" });
});

//@route       POST "/api/todos/"
//@desc             "create todo item route"
//@access           "public"
router.post("/", (req, res) => {
  const newTodo = {
    task: req.body.task
  };
  Todo.find().then(todo => {
    new Todo(newTodo)
      .save()
      .then(todo => res.json(todo))
      .catch(err => res.json({ err: "Cannot post todo" }));
  });
});

//@route       GET "/api/todos/all"
//@desc            "get todo item route"
//@access          "public"
router.get("/", (req, res) => {
  Todo.find()
    .sort({ date: -1 })
    .then(todos => {
      res.json(todos);
    })
    .catch(err => res.status(404).json({ errMessage: "No tasks found" }));
});

//@route       DELETE "/api/todos/:id"
//@desc               "delete todo item route by id"
//@access             "public"
router.delete("/:id", (req, res) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then(todo => {
      res.json(todo);
    })
    .catch(err => res.status(404).json({ errMessage: "cannot delete post" }));
});

//@route       EDIT "/api/todos/:id"
//@desc               "edit todo item route by id"
//@access             "public"
router.put("/:id", (req, res) => {
  Todo.findOneAndUpdate(
    { _id: req.params.id },
    { task: req.body.task },
    { new: true }
  ).then(todo => {
    todo.save().then(task => {
      res.json(task);
    });
  });
});

module.exports = router;
