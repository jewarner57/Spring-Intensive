const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.getuser = (req, res) => {
  if (!req.user) {
    res.status(401)
    return res.json({ message: 'not authorized' })
  }

  User.findOne({ _id: req.params.id })
    .then((user) => res.send(user))
    .catch((err) => console.log(err))
}

// SIGN UP POST
exports.signup = (req, res) => {
  // Create User and JWT
  const newuser = new User(req.body);

  User.findOne({ email: newuser.email })
    .then((user) => {
      // If user already exists return an error
      if (user) { return res.status(409).send({ err: 'Email already in use.' }) }
      // save user and send token
      newuser
        .save()
        .then((user) => {
          const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
          res.cookie('vfToken', token, { maxAge: 900000, httpOnly: true });
          res.json({ user: user._id })
        })
        .catch((err) => {
          console.log(err.message);
          return res.status(400).send({ err });
        });
    })
    .catch((err) => res.status(400).send({ err }))
}

// LOGOUT
exports.signout = (req, res) => {
  res.clearCookie('vfToken');
  res.json({ message: 'Logout Successful' })
}

// LOGIN
exports.signin = (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  // Find this user name
  User.findOne({ email }, 'email password')
    .then((user) => {
      if (!user) {
        // User not found
        return res.status(403).send({ message: 'Wrong Email or Password' });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(403).send({ message: 'Wrong Email or password' });
        }
        // Create a token
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET, {
          expiresIn: '30 days',
        });
        // Set a cookie
        res.cookie('vfToken', token, { maxAge: 900000, httpOnly: true });
        res.json({ message: 'Login Successful' })
      });
    })
    .catch((err) => {
      console.log(err);
    })
}
