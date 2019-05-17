import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}));

// Register/login a user, using async handler
router.post('/', asyncHandler(async (req, res) => {
    if (!req.body.username || !req.body.password) {
      res.json({
        success: false,
        msg: 'Please pass username and password.',
      });
    }
    if (req.query.action === 'register') {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });
      // save the user
      await newUser.save();
      res.status(201).json({
        success: true,
        msg: 'Successful created new user.',
      });
    } else {
      const user = await User.findByUserName(req.body.username);
      if (!user) return res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(user.username, process.env.secret);
          // return the information including token as JSON
          res.status(200).json({
            success: true,
            token: 'BEARER ' + token,
          });
        } else {
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. Wrong password.',
          });
        }
      });
    };
  }));

export default router;