const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields } = require("../middlewares");
const {
  createCategories,
  getCategories,
  getCategoriesById,
  updateCategories,
  deleteCategories,
  existCategoryById
} = require("../controllers/categories.controller");
const router = Router();

// get category - public
router.get("/", [validateJWT], getCategories);

// get category by id - public
router.get("/:id", [
    validateJWT,
    check("id").custom(existCategoryById),
], getCategoriesById);

// create category - private with all roles
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ],
  createCategories
);

//put category - private with all roles
router.put("/:id",
  [
    validateJWT,
    check("id").custom(existCategoryById),
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ],
  updateCategories
);

//delete category - private with all roles
router.delete("/:id", [validateJWT], deleteCategories);

module.exports = router;
