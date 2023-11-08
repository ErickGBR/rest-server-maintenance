const { response } = require("express");

const userGet = (req, res = response) => {
  res.json({
    msg: "GET API - controller",
  });
};

const userPost = (req, res = response) => {
  const { name, age } = req.body;
  res.json({
    msg: "POST API - controller",
    name,
    age,
  });
};

const userPut = (req, res = response) => {
  const id = req.params.id;
  const { name, age } = req.body;
  res.json({
    msg: "PUT API - controller",
    id,
    name,
    age,
  });
};

const userPatch = (req, res = response) => {
  const id = req.params.id;
  const body = req.body;
  res.json({
    msg: "PATCH API - controller",
    id,
    body,
  });
};

const userDelete = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "DELETE API - controller",
    id,
  });
};
module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
};
