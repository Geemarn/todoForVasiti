const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//import User models
const User = require("../../models/User");
//import keys
const secrete = require("../../config/keys").secreteKey;
//load input validation
const validateRegisterInput = require("../../validator/register");
const validateLoginInput = require("../../validator/login");

//@route       GET "/api/user/test"
//@desc            "Test user route"
//@access          "public"
router.get("/test", (req, res) => {
  res.json({ mssg: "user route working" });
});

//@route       POST "/api/user/register"
//@desc             "Register user route"
//@access           "public"
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      res.status(400).json(errors);
    } else {
      //create new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      //hashing password with bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route       POST "/api/user/login"
//@desc             "login user route"
//@access           "public"
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const password = req.body.password;

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = "user not found";
      return res.status(404).json(errors);
    }
    //check if password match
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user found
        // create jwt payload
        const payload = {
          id: user.id,
          name: user.name
        };
        //sign in token
        jwt.sign(payload, secrete, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: "bearer " + token
          });
        });
      } else {
        errors.password = "incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route       GET "/api/user/current"
//@desc             "get current user route"
//@access           "private"
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
