const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Media = require('../models/media')

exports.user = (req, res) => {
  const { _id, email, username } = req.user
  return res.send({ user: { _id, email, username } })
}

exports.getuserprofile = async (req, res) => {
  // find a user with given id and return it
  const userID = req.params.id
  let userFields = 'username createdAt'

  // If the current user gets their own profile
  // display their email
  if (userID === req.user._id) {
    userFields = 'username createdAt email'
  }

  try {
    const user = await User.findOne({ _id: userID }, userFields)
    const media = await Media.find({ author: userID }).populate('author', 'username')

    if (user) {
      return res.send({ user, media })
    }
    res.status(404).send({ err: 'No profile found.' })
  } catch (err) {
    res.status(400).send({ err: 'Something went wrong finding the profile.', message: err })
  }
}

// SIGN UP POST
exports.signup = async (req, res) => {
  // Create User and JWT
  const newuser = new User(req.body);

  try {
    // Check if username exists
    const emailExists = await User.findOne({ email: newuser.email })
    if (emailExists) { return res.status(403).send({ err: 'Email already in use.' }) }
    // Check if email exists
    const usernameExists = await User.findOne({ username: newuser.username })
    if (usernameExists) { return res.status(403).send({ err: 'Username already in use.' }) }

    // save user
    await newuser.save()
    const user = await User.findOne(newuser._id, 'email username')

    // send token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
    res.cookie('vfToken', token, { maxAge: 900000, httpOnly: true });
    res.json({ message: 'Account Creation Successful.', user })
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message });
  }
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
  User.findOne({ email }, 'email password username')
    .then((user) => {
      if (!user) {
        // User not found
        return res.status(403).send({ err: 'Wrong Email or Password' });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(403).send({ err: 'Wrong Email or password' });
        }
        // Create a token
        const token = jwt.sign(
          {
            _id: user._id, email: user.email, username: user.username,
          }, process.env.SECRET,
          {
            expiresIn: '30 days',
          },
        );

        // create a new user object without the password field
        const resUser = {
          _id: user._id,
          email: user.email,
          username: user.username,
        }

        // Set a cookie
        res.cookie('vfToken', token, { maxAge: 900000, httpOnly: true });
        res.json({ message: 'Login Successful', user: resUser })
      });
    })
    .catch((err) => {
      console.log(err);
    })
}
