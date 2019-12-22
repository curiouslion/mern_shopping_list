const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User model
const Item = require("../../models/User");

// @route POST api/users
// @desc Register new user
// @access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password)
    return res.status(400).json({ msg: "Please Enter all fields" }); // res.send("Please Enter all fields") and res.json({ msg: "Please Enter all fields"})

  // Check for existing user
  User.findOne({ email }) // ({ email:email ===> req.body.email value })
    .then(user => {
      if (!user) return res.status(400).json({ msg: "User does not exists" });

      // Validate Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });

        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          }
        );
      });
    });
});

// @route GET api/auth/user
// @desc Register new user
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password") // in response it exclude the password field
    .then(user => res.json(user));
});

// export default router // es6
module.exports = router;
