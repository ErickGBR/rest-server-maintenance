const jwt = require("jsonwebtoken");
const Users = require("../models/user");

const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.uid = payload.uid;
    const user = await Users.findOne({ _id: payload.uid });
    req.user = user;

    //user exist
    if(!user){
        return res.status(401).json({
            msg: "User not found"
        })

    }

    //verify user state is active
    if(!user.status){
      return res.status(401).json({
        msg: "User not active",
      });
    }
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
