const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product, Role } = require("../models");

const allowCollections = ["categories", "products", "users", "roles"];

const searchUsers = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const uses = User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });

  return res.json({
    status: true,
    results: uses,
  });
};

const searchCategories = async (term = "", res = response) => {
  const mongoIdVerify = ObjectId.isValid(term);
  if (mongoIdVerify) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }
};

const searchProducts = async (term = "", res = response) => {
  const mongoIdVerify = ObjectId.isValid(term);
  if (mongoIdVerify) {
    const product = await Product.findById(term);
    return res.json({
      results: product ? [product] : [],
    });
  }
};

const searchRoles = async (term = "", res = response) => {
  const mongoIdVerify = ObjectId.isValid(term);
  if (mongoIdVerify) {
    const role = await Role.findById(term);
    return res.json({
      results: role ? [role] : [],
    });
  }
};

const search = async (req, res = response) => {
  try {
    const { collection, term } = req.params;

    if (!allowCollections.includes(collection)) {
      return res.status(400).json({
        status: false,
        msg: "Collection not allowed" + allowCollections,
      });
    }

    switch (collection) {
      case "users":
        await searchUsers(term, res);
        break;

      case "roles":
        await searchRoles(term, res);
        break;

      case "products":
        await searchProducts(term, res);
        break;

      case "categories":
        await searchCategories(term, res);
        break;

      default:
        res.status(500).json({
          status: false,
          msg: "Error with the collection",
        });
    }

    res.status(200).json({
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Error with the collection",
      error,
    });
  }
};

module.exports = {
  search,
};
