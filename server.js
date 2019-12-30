const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

//import outer
const user = require("./routes/api/user");
const todos = require("./routes/api/todo");

mongoose
  .connect("mongodb://localhost/TodoDb")
  .then(() => console.log("DATABASE CONNECTED"))
  .catch(err => console.log(err));

//config body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport midleware
app.use(passport.initialize());
//passport config
require("./config/passport")(passport);

// use router
app.use("/api/user", user);
app.use("/api/todos", todos);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on PORT: ${port}`));
