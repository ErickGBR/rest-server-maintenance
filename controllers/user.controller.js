const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Users = require("../models/user");
//const emailExist = require("../helpers/db-validators");

const userGet = async (req, res = response) => {
  try {
    let { limit = 5, page = 0 } = req.query;
    limit = parseInt(limit)
    page = parseInt(page)
    const query = {status: true}
    /* 
    const user = await Users.find(query)
    .limit(limit)
    .skip(page);
    const total = await Users.countDocuments(query);
    */
    const [total, user] = await Promise.all([
      Users.countDocuments(query), 
      Users.find(query)
    .limit(limit)
    .skip(page)
    ])

    res.status(200).json({
      status: true,
      user,
      total
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
      msg: "Add user API - controller success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "POST API - controller fail",
      error,
    });
  }
};

const userPut = async (req, res = response) => {
  const id = req.params.id;
  const { google, password, email, ...data } = req.body;
  try {
    if (password) {
      const salt = bcryptjs.genSaltSync();
      data.password = await bcryptjs.hashSync(password, salt);
    }

    const user = await Users.findByIdAndUpdate(id, data);

    res.status(200).json({
      status: true,
      msg: "PUT API - controller",
      data: user,
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

const userDelete = async (req, res = response) => {
  const id = req.params.id;
  try {

    //delete user
    //const user = await Users.findByIdAndDelete(id);
    const user = await Users.findByIdAndUpdate(id, { status: false });
    res.status(200).json({
      status: true,
      msg: "DELETE API - Success",
      data: user
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
