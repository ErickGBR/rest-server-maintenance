const { response } = require("express");

const uploadFile = async (req, res = response) => {
  // create a new product
  try {
    console.log(" ----> ", req.files);
    return res.status(201).json({ msg: "" });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  uploadFile
};
