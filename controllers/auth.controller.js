const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Users = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const userAuth = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    //verify if the user exists
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User or password not found",
      });
    }

    //verify if the user is active
    if (!user.state) {
      return res.status(400).json({
        msg: "User not active",
      });
    }
    
    //verify password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "User or password not found",
      });
    }

    //generate el JWT
    const token = await generateJWT(user.id);
    return res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Login API - controller fail",
      error,
    });
  }
};

module.exports = {
  userAuth,
};
