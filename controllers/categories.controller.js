const { response } = require("express");
const { Categories } = require("../models");
const createCategories = (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoriesDb = Categories.findOne({ name });
  if (categoriesDb) {
    return res.status(400).json({
      msg: `This category ${name} already exists`,
    });
  }

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Categories(data);
  category.save();

  return res.status(201).json(category);
};

module.exports = {
  createCategories,
};
