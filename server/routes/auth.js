const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router = express.Router();

// register user
router.post("/", async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = User({
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
  });
  try {
    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
  } catch (err) {
    return next(err);
  }
});

// login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    const comparedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (user.email === req.body.email.toLowerCase() && comparedPassword) {
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
        expiresIn: "10s",
      });
      const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);
      res.status(200).json({
        message: "User logged in successfully",
        user,
        token,
        refreshToken,
      });
    } else {
      res.status(403).json("Incorrect email or password");
    }
  } catch (err) {
    return next(err);
  }
});

// refresh access token
router.post("/refresh", async (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    res.status(403).json("Invalid refresh token");
  }
  try {
    const verifiedToken = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const newAccessToken = await jwt.sign(
      { user: verifiedToken.user },
      process.env.TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    const newRefreshToken = await jwt.sign(
      { user: verifiedToken.user },
      process.env.REFRESH_TOKEN_SECRET
    );
    res
      .status(201)
      .json({ token: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
