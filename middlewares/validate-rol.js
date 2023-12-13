const { response } = require("express");

const adminRol = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Need validate JWT",
    });
  }
  const { rol, name } = req.user;
  if (rol !== "admin") {
    return res.status(401).json({
      msg: `${name} is not an admin`,
    });
  }
};

const takeARol = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Need validate JWT",
      });
    }
    if (!roles.includes(req.user.rol)) {
      return req.status(401).json({
        msg: `${req.user.rol} is not allowed`,
      });
    }
    next();
  };
};

module.exports = {
  adminRol,
  takeARol,
};
