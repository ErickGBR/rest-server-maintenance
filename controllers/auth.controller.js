const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Users = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
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
    if (!user.status) {
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

const googleAuth = async (req, res = response) => {
  const { id_token } = req.body;
  const googleUser = await googleVerify(id_token);
  const { email, name, picture } = googleUser;
  let user = await Users.findOne({ email });

  if (!user) {
    const randomPassString = (Math.random() + 1).toString(36).substring(7);
    const salt = bcryptjs.genSaltSync();
    const password = bcryptjs.hashSync(randomPassString, salt);
    const data = {
      name,
      email,
      picture,
      password
    };

    user = new Users(data);
    await user.save();
    if (!user.status) {
      return res.status(400).json({
        msg: "Talk with an administrator, this user is disabled",
      });
    }

    //generate el JWT
    const token = await generateJWT(user.id);
    return res.json({
      user,
      token,
    });
  }
};

module.exports = {
  userAuth,
  googleAuth,
};
