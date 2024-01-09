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


const getCategories = async (req, res = response) => {
  let { limit = 5, page = 0 } = req.query;
  //create pagination and populate
  const [total, categories] = await Promise.all([
    Categories.countDocuments({ status: true }),
    Categories.find({ status: true })
      .limit(limit)
      .skip(page)
      .populate("user", "name"),
  ]);
  res.status(200).json({
    data: categories,
    total,
  });
};


const updateCategories = async (req, res = response) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Categories.findByIdAndUpdate(id, { name });
  res.status(200).json({
    category,
  });
};


const deleteCategories = async (req, res = response) => {
  const { id } = req.params;
  const category = await Categories.findByIdAndUpdate(id, { status: false });
  res.status(200).json({
    category,
  });
}


module.exports = {
  createCategories,
  getCategories,
  updateCategories,
  deleteCategories
};
