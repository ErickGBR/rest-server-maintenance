const jwt = require("jsonwebtoken");
const validateJWT = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.uid = payload.uid;
    console.log(payload);
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
