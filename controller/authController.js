const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password, password2 } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      console.log('User already exists');
      res.status(400).json({ msg: 'user exists' });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              //   res.redirect('/users/login');
              console.log(user + ' register successful');
              res.status(200).json({ user });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); // Forward any errors to the error handling middleware
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Authentication successful, send your response here
      return res.status(200).json({ message: user.name + ' Logged In' });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  const { user } = req; // Retrieve user object from request

  req.logOut((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.status(200).json({ msg: user.name + ' Logging you out' });
  });
};
