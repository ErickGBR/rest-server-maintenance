const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields } = require("../middlewares");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsById,
} = require("../controllers/products.controller");

const router = Router();

// get product - public
router.get("/", [validateJWT], getProducts);

// get product by id - public
router.get(
  "/:id",
  [validateJWT, check("id").custom(getProductsById)],
  getProductById
);

// create product - private with all roles
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    validateFields,
  ],
  createProduct
);

//put product - private with all roles
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    validateFields,
  ],
  updateProduct
);

//delete product - private with all roles
router.delete("/:id", [validateJWT], deleteProduct);

module.exports = router;
