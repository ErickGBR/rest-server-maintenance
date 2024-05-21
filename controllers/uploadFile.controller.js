const { response } = require("express");
const { uploadFile } = require("../helpers");

const uploadFiles = async (req, res = response) => {
  // create a new product
  try {

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const pathComplete = await uploadFile(req.files, undefined, "imgs")
    return res.status(200).send({ pathComplete })

  } catch (error) {
    console.log(error)

    return res.status(500).json({ msg: "Something went wrong" });

  }
};

const updateImage = async (req, res = response) => {
  try {

  } catch (error) {

  }
}

module.exports = {
  uploadFiles,
  updateImage
};
