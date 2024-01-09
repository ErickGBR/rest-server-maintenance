const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields } = require("../middlewares");
const { createCategories } = require("../controllers/categories.controller");
const router = Router();

// get category - public
router.get("/", (req, res) => {
  console.log("Test ");
});

// get category by id - public
router.get("/:id", (req, res) => {});

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
router.put("/:id", (req, res) => {});

//delete category - private with all roles
router.delete("/:id", (req, res) => {});

module.exports = router;
