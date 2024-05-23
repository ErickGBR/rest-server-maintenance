const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Products } = require("../models");

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
  let model;
  const { id, collection } = req.params;

  switch (collection) {
    case "users":
      model = await User.findById(id)
      if (!model) {
        return res.status(400).send({
          msg: `Not exist user with id ${id}`
        })
      }
      break;

    case "products":
      model = await Products.findById(id)
      if (!model) {
        return res.status(400).send({
          msg: `Not exist products with id ${id}`
        })
      }
      break;

    default:
      return res.status(500).send({
        msg: "not validated"
      })
  }


  //clean previus images
  if (model.img) {
    const pathImage = path.join(__dirname, "../uploads", collections, model.img)
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  model.img = await uploadFile(req.files, undefined, collections)
  await model.save()

  res.json(model)

}

const showImage = async (req, res = response) => {

  let model;
  const { id, collection } = req.params;

  console.log(id, collection)
  switch (collection) {
    case "users":
      model = await User.findById(id)
      if (!model) {
        return res.status(400).send({
          msg: `Not exist user with id ${id}`
        })
      }
      break;

    case "products":
      model = await Products.findById(id)
      if (!model) {
        return res.status(400).send({
          msg: `Not exist products with id ${id}`
        })
      }
      break;

    default:
      return res.status(500).send({
        msg: "not validated"
      })
  }


  //clean previus images
  if (model.img) {
    const pathImage = path.join(__dirname, "../uploads", collections, model.img)
    if (fs.existsSync(pathImage)) {
      res.sendFile(pathImage);
    }
  }else{
    const pathImage = path.join(__dirname, "../assets/no-image.jpg")
    res.sendFile(pathImage);
  }


}
module.exports = {
  uploadFiles,
  updateImage,
  showImage
};
