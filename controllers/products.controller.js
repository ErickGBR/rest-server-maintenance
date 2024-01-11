const { response } = require("express");
const { Products } = require("../models");
const { body } = require("express-validator");
const createProduct = async (req, res = response) => {
  // create a new product

  try {
    const name = req.body.name.toUpperCase();
    const productsDb = Products.findOne({ name });

    const { user, status, ...body } = req.body;
    if (productsDb) {
      return res.status(400).json({
        msg: `This product ${name} already exists`,
      });
    }

    const data = {
      ...body,
      name: body.name.toUpperCase(),
      user: req.user._id,
    };

    const product = new Products(data);
    await product.save();

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

// Get all products
const getProducts = async (req, res = response) => {
  try {
    let { limit = 10, page = 1 } = req.query;

    // Calculate the skip value
    const skip = (page - 1) * limit;

    // Fetch the products with pagination and populate the 'category' field
    const products = await Products.find()
      .limit(Number(limit))
      .skip(skip)
      .populate("category", "name");

    // Get the total count of products
    const total = await Products.countDocuments();

    return res.status(200).json({
      data: products,
      total,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

// Get a product by ID
const getProductById = (req, res = response) => {
  //get a product by ID

  try {
    const { id } = req.params;
    const product = Products.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

// Update a product
const updateProduct = (req, res = response) => {
  // update a product

  try {
    const { id } = req.params;
    const { ...data } = req.body;
    const product = Products.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

// Delete a product
const deleteProduct = (req, res = response) => {
  // delete a product

  try {
    const { id } = req.params;
    const product = Products.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const getProductsById = async (req, res = response) => {
  const existProduct = await Products.findById(req.params.id);
  if (!existProduct) {
    return res.status(400).json({
      msg: `Product ${req.params.id} not found`,
    });
  }
  return res.status(200).json(existProduct);
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsById,
};
