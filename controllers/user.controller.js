const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Users = require("../models/user");
const emailExist = require("../helpers/db-validators");

const userGet = (req, res = response) => {
  try {
    res.status(200).json({
      status: true,
      msg: "GET API - controller",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "GET API - controller",
      error,
    });
  }
};

const userPost = async (req, res = response) => {
  const { name, email, password, rol } = req.body;

  try {
    const user = new Users({ name, email, password, rol });
    const salt = bcryptjs.genSaltSync();
    user.password = await bcryptjs.hashSync(password, salt);
    await user.save();

    res.status(200).json({
      status: true,
      msg: "POST API - controller",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "POST API - controller",
      error,
    });
  }
};

const userPut = (req, res = response) => {
  const id = req.params.id;
  const { name, age } = req.body;
  try {
    res.status(200).json({
      status: true,
      msg: "PUT API - controller",
      data: {
        id,
        name,
        age,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "PUT API - controller",
      error,
    });
  }
};

const userPatch = (req, res = response) => {
  const id = req.params.id;
  const body = req.body;
  try {
    res.status(200).json({
      status: true,
      msg: "PATCH API - controller",
      data: {
        id,
        body,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "PATCH API - controller",
      error,
    });
  }
};

const userDelete = (req, res = response) => {
  const id = req.params.id;
  try {
    res.status(200).json({
      status: true,
      msg: "DELETE API - controller",
      data: {
        id,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "DELETE API - controller",
      error,
    });
  }
};
module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
};
